#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { loadConfig, getDefaultConfigPath } from './config/loader';
import { PDFExporter } from './renderer/pdf';
import { DocxExporter } from './renderer/docx';
import { resolveExportPath } from './discovery/resolver';
import { logger } from './utils/logger';
import { ensureDir, getSafeFileName } from './utils/path';

const VERSION = '1.1.0';

const program = new Command();

program
  .name('orbit-docs-export')
  .description('VitePress docs export tool (PDF / Word) with merge support')
  .version(VERSION);

program
  .argument('[path]', '导出路径，格式：<模块> 或 <模块> > <分组> 或 <模块> > <分组> > <页面>')
  .option('--format <format>', '输出格式: pdf | docx', 'pdf')
  .option('--config-file <path>', '指定配置文件路径')
  .option('--reference-doc <path>', 'docx 样式模板路径（覆盖配置）')
  .option('--output <dir>', '指定输出目录')
  .option('--debug', '启用调试模式');

program.parse(process.argv);

const options = program.opts();
const exportPath = program.args[0];

function generateOutputFilename(
  exportPath: string,
  isSingle: boolean,
  ext: string,
  referenceDoc: string | undefined
): string {
  const suffix = ext === 'docx' ? templateSuffix(referenceDoc) : '';
  if (isSingle) {
    return `${getSafeFileName(exportPath)}${suffix}.${ext}`;
  }
  return `${getSafeFileName(exportPath)}${suffix}-merged.${ext}`;
}

/** 从 reference-doc 文件名提取方案后缀（orbit-reference-zh.docx → -zh，默认模板无后缀） */
function templateSuffix(referenceDoc: string | undefined): string {
  const m = (referenceDoc || '').match(/orbit-reference-(.+)\.docx$/);
  return m ? `-${m[1]}` : '';
}

async function main(): Promise<void> {
  if (options.debug) {
    process.env.DEBUG = '1';
  }

  logger.section('Orbit Docs Export');

  const format = options.format === 'docx' ? 'docx' : 'pdf';
  if (format === 'docx') {
    logger.info('输出格式: Word (docx)');
  }

  if (!exportPath) {
    logger.error('请指定导出路径');
    console.log('\n使用方法:');
    console.log('  pnpm run export <模块>');
    console.log('  pnpm run export <模块> > <分组>');
    console.log('  pnpm run export <模块> > <分组> > <页面>');
    console.log('\n示例:');
    console.log('  pnpm run export orbitcontrol');
    console.log('  pnpm run export "orbitcontrol > 使用手册"');
    console.log('  pnpm run export "orbitcontrol > 使用手册 > 站点管理"');
    process.exit(1);
  }

  const configPath = options.configFile || getDefaultConfigPath();
  logger.info(`加载配置: ${configPath}`);
  
  const config = loadConfig(configPath);

  if (options.output) {
    config.outputDir = options.output;
  }
  if (options.referenceDoc) {
    config.docx = { ...config.docx, referenceDoc: options.referenceDoc };
  }

  ensureDir(config.outputDir);
  logger.info(`输出目录: ${config.outputDir}`);

  const sidebarDir = path.resolve(__dirname, '../../.vitepress/sidebar');
  const docsRoot = path.resolve(sidebarDir, '../..');

  let resolved;
  try {
    resolved = resolveExportPath(exportPath, sidebarDir);
  } catch (error) {
    logger.error((error as Error).message);
    process.exit(1);
  }

  logger.info(`模块: ${resolved.module}`);
  if (resolved.subPath) {
    logger.info(`子路径: ${resolved.subPath}`);
  }
  logger.info(`页面数量: ${resolved.pages.length}`);

  if (resolved.pages.length === 0) {
    logger.warn('没有找到任何页面');
    process.exit(1);
  }

  try {
    logger.section('开始导出');

    const filename = generateOutputFilename(
      exportPath,
      resolved.pages.length === 1,
      format,
      config.docx?.referenceDoc
    );

    let result: { success: boolean; path?: string; error?: string };

    if (format === 'docx') {
      // docx 走 markdown 源文件 + pandoc，mermaid 渲染按需启动浏览器
      const mermaidScript = path.resolve(__dirname, '../node_modules/mermaid/dist/mermaid.min.js');
      const exporter = new DocxExporter(config, docsRoot, mermaidScript);
      try {
        result = await exporter.exportPages(resolved.pages, filename, exportPath);
      } finally {
        await exporter.cleanup();
      }
    } else {
      const exporter = new PDFExporter(config);
      try {
        await exporter.init();
        result =
          resolved.pages.length === 1
            ? await exporter.exportSinglePage(resolved.pages[0], filename)
            : await exporter.exportModule(resolved.pages, filename);
      } finally {
        await exporter.cleanup();
      }
    }

    logger.section('导出完成');

    if (result.success) {
      logger.success(`文件已保存: ${result.path}`);
    } else {
      logger.error(`导出失败: ${result.error}`);
      process.exit(1);
    }

  } catch (error) {
    logger.error(`发生错误: ${(error as Error).message}`);
    if (options.debug) {
      console.error(error);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  logger.error(`未处理的错误: ${(error as Error).message}`);
  console.error(error);
  process.exit(1);
});
