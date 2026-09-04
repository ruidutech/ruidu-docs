import puppeteer from 'puppeteer';
import { logger } from '../utils/logger';
import type { Config } from '../config/types';

export class BrowserManager {
  private browser: any = null;

  constructor(private config: Pick<Config, 'chrome'>) {}

  async launch(): Promise<void> {
    if (this.browser) {
      return;
    }

    logger.info('正在启动浏览器...');

    try {
      this.browser = await puppeteer.launch({
        headless: this.config.chrome.headless as any,
        executablePath: this.config.chrome.executablePath,
        args: this.config.chrome.args,
      });

      logger.success('浏览器启动成功');
    } catch (error) {
      logger.error(`浏览器启动失败: ${(error as Error).message}`);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      logger.info('浏览器已关闭');
    }
  }

  getBrowser(): any {
    if (!this.browser) {
      throw new Error('浏览器未启动，请先调用 launch()');
    }
    return this.browser;
  }

  async newPage(): Promise<any> {
    const browser = this.getBrowser();
    return await browser.newPage();
  }
}
