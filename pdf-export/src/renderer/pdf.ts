import fs from 'fs';
import path from 'path';
import { BrowserManager } from './browser';
import { PageRenderer } from './page';
import { PDFMerger } from '../merger/pdf';
import { ensureDir, getSafeFileName } from '../utils/path';
import { logger } from '../utils/logger';
import type { Config } from '../config/types';
import type { Page } from '../config/types';

export class PDFExporter {
  private browserManager: BrowserManager;
  private pageRenderer: PageRenderer;

  constructor(private config: Config) {
    this.browserManager = new BrowserManager(config);
    this.pageRenderer = new PageRenderer(this.browserManager as any, config);
  }

  async init(): Promise<void> {
    await this.browserManager.launch();
    ensureDir(this.config.outputDir);
  }

  async cleanup(): Promise<void> {
    await this.browserManager.close();
  }

  async exportSinglePage(pageInfo: Page, filename: string): Promise<{ success: boolean; path?: string; error?: string }> {
    const outputPath = path.join(this.config.outputDir, filename);
    const pagePath = pageInfo.path.startsWith('/') ? pageInfo.path : `/${pageInfo.path}`;

    try {
      logger.info(`导出页面: ${pageInfo.title || pagePath}`);
      const pdf = await this.pageRenderer.generatePDFBuffer(pagePath);
      fs.writeFileSync(outputPath, pdf);
      return { success: true, path: outputPath };
    } catch (error) {
      logger.error(`导出失败: ${(error as Error).message}`);
      return { success: false, error: (error as Error).message };
    }
  }

  async exportModule(pages: Page[], outputFilename: string): Promise<{ success: boolean; path?: string; error?: string }> {
    const pdfBuffers: Buffer[] = [];
    const titles: string[] = [];
    const tempDir = path.join(this.config.outputDir, '.temp');
    ensureDir(tempDir);

    logger.section(`导出模块: ${pages.length} 个页面`);

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const pagePath = page.path.startsWith('/') ? page.path : `/${page.path}`;

      logger.step(i + 1, pages.length, `生成: ${page.title || pagePath}`);

      try {
        const buffer = await this.pageRenderer.generatePDFBuffer(pagePath);
        pdfBuffers.push(buffer);
        titles.push(page.title || pagePath);
      } catch (error) {
        logger.error(`生成失败: ${(error as Error).message}`);
      }
    }

    if (pdfBuffers.length === 0) {
      fs.rmSync(tempDir, { recursive: true, force: true });
      return { success: false, error: '没有成功生成任何页面' };
    }

    const outputPath = path.join(this.config.outputDir, outputFilename);
    await PDFMerger.mergeBuffers(pdfBuffers, titles, outputPath);

    fs.rmSync(tempDir, { recursive: true, force: true });

    return { success: true, path: outputPath };
  }
}
