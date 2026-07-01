#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { loadConfig, getDefaultConfigPath } from './config/loader';
import { PDFExporter } from './renderer/pdf';
import { resolveExportPath } from './discovery/resolver';
import { logger } from './utils/logger';
import { ensureDir, getSafeFileName } from './utils/path';

const VERSION = '1.0.0';

const program = new Command();

program
  .name('orbit-pdf-export')
  .description('VitePress PDF export tool with merge support')
  .version(VERSION);

program
  .argument('[path]', '导出路径，格式：<模块> 或 <模块> > <分组> 或 <模块> > <分组> > <页面>')
  .option('--config-file <path>', '指定配置文件路径')
  .option('--output <dir>', '指定输出目录')
  .option('--debug', '启用调试模式');

program.parse(process.argv);

const options = program.opts();
const exportPath = program.args[0];

function generateOutputFilename(exportPath: string, isSingle: boolean): string {
  if (isSingle) {
    return `${getSafeFileName(exportPath)}.pdf`;
  }
  return `${getSafeFileName(exportPath)}-merged.pdf`;
}

async function main(): Promise<void> {
  if (options.debug) {
    process.env.DEBUG = '1';
  }

  logger.section('Orbit PDF Export');

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

  ensureDir(config.outputDir);
  logger.info(`输出目录: ${config.outputDir}`);

  const sidebarDir = path.resolve(__dirname, '../../.vitepress/sidebar');
  
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

  const exporter = new PDFExporter(config);

  try {
    await exporter.init();

    logger.section('开始导出');

    const filename = generateOutputFilename(exportPath, resolved.pages.length === 1);
    const result = resolved.pages.length === 1
      ? await exporter.exportSinglePage(resolved.pages[0], filename)
      : await exporter.exportModule(resolved.pages, filename);

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
  } finally {
    await exporter.cleanup();
  }
}

main().catch((error) => {
  logger.error(`未处理的错误: ${(error as Error).message}`);
  console.error(error);
  process.exit(1);
});
