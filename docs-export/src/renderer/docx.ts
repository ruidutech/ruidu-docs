import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { BrowserManager } from './browser';
import { MermaidRenderer } from './mermaid';
import { ensureDir } from '../utils/path';
import { logger } from '../utils/logger';
import type { Config, Page } from '../config/types';

export class DocxExporter {
  private browserManager: BrowserManager;
  private mermaidRenderer: MermaidRenderer | null = null;
  private tempDir: string;

  constructor(
    private config: Config,
    private docsRoot: string,
    private mermaidScript: string
  ) {
    this.browserManager = new BrowserManager(config);
    this.tempDir = path.join(config.outputDir, '.temp-docx');
  }

  /** 懒初始化 mermaid 渲染（仅当页面含 mermaid 代码块时才启动浏览器） */
  private async ensureMermaidRenderer(): Promise<MermaidRenderer> {
    if (!this.mermaidRenderer) {
      const renderer = new MermaidRenderer(this.browserManager, this.mermaidScript);
      await this.browserManager.launch();
      await renderer.init();
      this.mermaidRenderer = renderer;
    }
    return this.mermaidRenderer;
  }

  async cleanup(): Promise<void> {
    if (this.mermaidRenderer) {
      await this.mermaidRenderer.close();
    }
    await this.browserManager.close();
    if (fs.existsSync(this.tempDir)) {
      fs.rmSync(this.tempDir, { recursive: true, force: true });
    }
  }

  /** sidebar link（如 /orbitcontrol/user-guide/sites）→ 仓库内 md 文件路径 */
  private resolveMarkdownFile(link: string): string {
    const clean = link.endsWith('/') ? `${link}index` : link;
    return path.join(this.docsRoot, `${clean}.md`);
  }

  /** 站内页面路径 → 文档内部锚点 id（/orbitcontrol/open-platform/ → p_orbitcontrol_open_platform）
   *  Word 书签名仅允许字母/数字/下划线，其余字符一律归一为下划线 */
  private pageAnchorId(pagePath: string): string {
    return 'p_' + pagePath.replace(/^\//, '').replace(/\/+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
  }

  /** 站内链接改写为锚点链接（合并为单文档后，localhost/相对路径跳转均无意义） */
  private rewriteInternalLinks(content: string, pagePath: string): string {
    return content.replace(
      /(?<!!)\[([^\]]*)\]\(((?:\.\.?\/|\/)[^)\s]+)(?:\s+"[^"]*")?\)/g,
      (_match, text: string, rawUrl: string) => {
        const noHash = rawUrl.split('#')[0].replace(/\.md$/, '');
        const abs = noHash.startsWith('/') ? noHash : this.resolveRelative(pagePath, noHash);
        return `[${text}](#${this.pageAnchorId(abs)})`;
      }
    );
  }

  /** 相对链接（./x、../y）按当前页面路径解析为站内绝对路径，规则与 VitePress 一致 */
  private resolveRelative(pagePath: string, link: string): string {
    const baseDir = pagePath.replace(/[^/]*$/, '');
    const resolved: string[] = [];
    for (const part of (baseDir + link).split('/')) {
      if (part === '' || part === '.') continue;
      if (part === '..') {
        resolved.pop();
        continue;
      }
      resolved.push(part);
    }
    return '/' + resolved.join('/');
  }

  /** 给页面第一个标题注入显式 id，pandoc 会生成同名 bookmark 供内部链接跳转 */
  private addPageAnchor(content: string, pagePath: string): string {
    const m = content.match(/^(#{1,6} [^\n]+)$/m);
    if (!m || /\{#[^}]+\}$/.test(m[1])) {
      return content;
    }
    return content.replace(m[0], `${m[1]} {#${this.pageAnchorId(pagePath)}}`);
  }

  /**
   * 预处理页面 markdown：
   * - 图片绝对路径（/images/...）改写为仓库 public/ 下的文件系统绝对路径
   * - VitePress 图片宽度 class（{.w-1/2}）改写为 pandoc width 属性（{width=50%}）
   * - mermaid 代码块渲染为 PNG 并替换为图片引用（渲染失败时保留代码块）
   */
  private async preprocess(markdown: string, fileLabel: string): Promise<string> {
    const publicDir = path.join(this.docsRoot, 'public');
    let content = markdown.replace(/\]\((\/images\/)/g, `](${publicDir}/images/`);

    // pandoc 不解析 class，docx 输出会丢弃；换成 width 百分比（相对页面文本宽度）
    content = content.replace(
      /(!\[[^\]]*\]\([^)]+\))\{\.w-(\d+)\/(\d+)\}/g,
      (_match, image: string, numerator: string, denominator: string) =>
        `${image}{width=${Math.round((Number(numerator) / Number(denominator)) * 100)}%}`
    );

    // split 捕获组：偶数索引为普通内容，奇数索引为 mermaid 代码
    const parts = content.split(/```mermaid\n([\s\S]*?)```/g);
    if (parts.length === 1) {
      return content;
    }

    const renderer = await this.ensureMermaidRenderer();
    const assetDir = path.join(this.tempDir, 'mermaid');
    ensureDir(assetDir);

    const rebuilt: string[] = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        rebuilt.push(parts[i]);
        continue;
      }
      const png = path.join(assetDir, `mermaid-${rebuilt.length}.png`);
      try {
        await renderer.renderToPng(parts[i], png);
        rebuilt.push(`![](${png})`);
      } catch (error) {
        logger.warn(`mermaid 渲染失败（${fileLabel}），保留代码块: ${(error as Error).message}`);
        rebuilt.push('```mermaid\n' + parts[i] + '```');
      }
    }
    return rebuilt.join('');
  }

  async exportPages(
    pages: Page[],
    outputFilename: string,
    documentTitle: string
  ): Promise<{ success: boolean; path?: string; error?: string }> {
    ensureDir(this.config.outputDir);
    ensureDir(this.tempDir);

    const sections: string[] = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      logger.step(i + 1, pages.length, `处理: ${page.title}`);

      const file = this.resolveMarkdownFile(page.path);
      if (!fs.existsSync(file)) {
        logger.warn(`未找到 markdown 文件，跳过: ${file}`);
        continue;
      }
      let content = fs.readFileSync(file, 'utf-8');
      content = this.rewriteInternalLinks(content, page.path);
      content = this.addPageAnchor(content, page.path);
      content = await this.preprocess(content, page.title);
      sections.push(content.trim());
    }

    if (sections.length === 0) {
      return { success: false, error: '没有成功处理任何页面' };
    }

    // 合并为单一 markdown；章节起新页由 reference-doc 的 Heading1 样式
    // pageBreakBefore 承担（不插显式分页符空段，避免章首多出空白行）
    const mergedFile = path.join(this.tempDir, 'merged.md');
    fs.writeFileSync(mergedFile, sections.join('\n\n'));

    const outputPath = path.join(this.config.outputDir, outputFilename);
    const cover = this.config.docx?.cover;
    const coverTitle = cover ? `${cover.title} ${cover.subtitle}` : documentTitle;
    const args = [
      mergedFile,
      '-o',
      outputPath,
      '-f',
      'markdown',
      '--toc',
      '--toc-depth=2',
      '--metadata',
      `title=${coverTitle}`,
      '--metadata',
      'toc-title=目录',
      '--resource-path',
      this.docsRoot,
    ];

    // 样式模板（品牌化字体/颜色/表格边框），缺失时回退 pandoc 默认样式
    if (this.config.docx?.referenceDoc) {
      const referenceDoc = path.resolve(__dirname, '../../', this.config.docx.referenceDoc);
      if (fs.existsSync(referenceDoc)) {
        args.push('--reference-doc', referenceDoc);
      } else {
        logger.warn(`reference-doc 不存在，使用 pandoc 默认样式: ${referenceDoc}`);
      }
    }

    const result = spawnSync('pandoc', args, { stdio: 'pipe', encoding: 'utf-8' });

    if (result.error) {
      return { success: false, error: `pandoc 调用失败: ${result.error.message}` };
    }
    if (result.status !== 0) {
      return { success: false, error: `pandoc 转换失败: ${result.stderr}` };
    }

    // 表格宽度/布局与列表编号是 pandoc 写在实例上的属性，reference-doc 覆盖不到，需后处理
    const tableAutofit = this.config.docx?.tableAutofit !== false;
    const postArgs = [
      path.resolve(__dirname, '../../scripts/postprocess-docx.py'),
      outputPath,
      ...(tableAutofit ? [] : ['--no-table-autofit']),
    ];
    if (cover) {
      const logo = path.resolve(__dirname, '../../', cover.logo);
      if (fs.existsSync(logo)) {
        const now = new Date();
        postArgs.push(
          '--cover-logo', logo,
          '--cover-brand', cover.brand,
          '--cover-title', coverTitle,
          '--cover-date', `${now.getFullYear()}年${now.getMonth() + 1}月`
        );
      } else {
        logger.warn(`封面 logo 不存在，使用 pandoc 默认标题页: ${logo}`);
      }
    }
    const postprocess = spawnSync('python3', postArgs, { stdio: 'pipe', encoding: 'utf-8' });
    if (postprocess.status !== 0) {
      logger.warn(`docx 后处理失败（不影响文档可用性）: ${postprocess.stderr || postprocess.error?.message}`);
    }

    // 图片已嵌入 docx，清理临时产物
    fs.rmSync(this.tempDir, { recursive: true, force: true });

    return { success: true, path: outputPath };
  }
}
