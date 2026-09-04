import { logger } from '../utils/logger';
import type { Config } from '../config/types';
import type { BrowserManager } from './browser';

export class PageRenderer {
  constructor(
    private browserManager: BrowserManager,
    private config: Pick<Config, 'chrome' | 'pageWaitTime' | 'navigationTimeout' | 'pdf'>
  ) {}

  private async preparePage(page: any): Promise<void> {
    await page.evaluate(() => {
      const selectorsToRemove = [
        '.VPNavBar',
        '.VPLocalNav',
        '.VPSidebar',
        '.VPDocAside',
        '.VPDocFooter',
      ];

      selectorsToRemove.forEach((selector: string) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el: HTMLElement) => el.remove());
      });

      const tables = document.querySelectorAll('table');
      tables.forEach((table: HTMLElement) => {
        (table as any).style.fontSize = '12px';
        (table as any).style.breakInside = 'avoid';
      });

      const codeBlocks = document.querySelectorAll('pre');
      codeBlocks.forEach((block: HTMLElement) => {
        (block as any).style.fontSize = '12px';
        (block as any).style.overflow = 'visible';
        (block as any).style.whiteSpace = 'pre-wrap';
      });

      const mermaidCharts = document.querySelectorAll('.mermaid');
      mermaidCharts.forEach((chart: HTMLElement) => {
        (chart as any).style.maxWidth = '100%';
        (chart as any).style.height = 'auto';
      });
    });
  }

  async navigateAndWait(page: any, url: string): Promise<void> {
    logger.debug(`正在访问: ${url}`);

    await page.setViewport({ width: 1200, height: 800 });

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: this.config.navigationTimeout,
    });

    await new Promise(resolve => setTimeout(resolve, this.config.pageWaitTime));

    try {
      await page.waitForFunction(
        () => {
          const mermaidCharts = document.querySelectorAll('.mermaid');
          if (mermaidCharts.length === 0) return true;
          return Array.from(mermaidCharts).every((chart: any) => chart.querySelector('svg'));
        },
        { timeout: 10000 }
      );
    } catch {
      logger.warn('Mermaid 图表渲染超时，继续生成 PDF');
    }
  }

  async generatePDFBuffer(pagePath: string): Promise<Buffer> {
    const page = await this.browserManager.newPage();

    try {
      const baseUrl = this.config.baseUrl as string;
      const url = baseUrl.replace(/\/$/, '') + pagePath;
      await this.navigateAndWait(page, url);
      await this.preparePage(page);

      logger.debug(`正在生成 PDF: ${pagePath}`);

      const pdfBuffer = await page.pdf(this.config.pdf as any);

      logger.success(`PDF 生成完成: ${pagePath}`);
      return pdfBuffer;
    } catch (error) {
      logger.error(`生成 PDF 失败 (${pagePath}): ${(error as Error).message}`);
      throw error;
    } finally {
      await page.close();
    }
  }
}
