import path from 'path';
import { logger } from '../utils/logger';
import type { BrowserManager } from './browser';

/**
 * Mermaid 代码块渲染器
 *
 * 在无头页面中加载本地 mermaid 脚本，将代码块渲染为 PNG，
 * 供 pandoc 转 docx 时作为普通图片嵌入（pandoc 不执行 mermaid）
 */
export class MermaidRenderer {
  private page: any = null;

  constructor(
    private browserManager: BrowserManager,
    private mermaidScript: string
  ) {}

  async init(): Promise<void> {
    if (this.page) {
      return;
    }
    this.page = await this.browserManager.newPage();
  }

  async close(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
  }

  /** 渲染 mermaid 代码为 PNG，返回图片绝对路径 */
  async renderToPng(code: string, outputPath: string): Promise<string> {
    if (!this.page) {
      throw new Error('MermaidRenderer 未初始化，请先调用 init()');
    }

    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    await this.page.setContent(
      `<!doctype html><html><head><style>
        body { margin: 0; background: #ffffff; }
        #container { display: inline-block; padding: 8px; background: #ffffff; }
      </style></head><body><div id="container"><pre class="mermaid">${escaped}</pre></div></body></html>`,
      { waitUntil: 'load' }
    );

    await this.page.addScriptTag({ path: this.mermaidScript });
    await this.page.evaluate(async () => {
      const mermaid = (window as any).mermaid;
      mermaid.initialize({ startOnLoad: false, theme: 'default' });
      await mermaid.run({ querySelector: '.mermaid' });
    });

    const element = await this.page.$('#container');
    if (!element) {
      throw new Error('mermaid 渲染容器未找到');
    }
    await element.screenshot({ path: outputPath });

    logger.info(`mermaid 图渲染: ${path.basename(outputPath)}`);
    return outputPath;
  }
}
