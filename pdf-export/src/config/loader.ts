import fs from 'fs';
import path from 'path';
import { defaultConfig } from './default';
import type { Config } from './types';

export function loadConfig(configPath: string): Config {
  let userConfig: Partial<Config> = {};

  if (configPath && fs.existsSync(configPath)) {
    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      userConfig = JSON.parse(configContent);
    } catch (error) {
      console.warn(`警告: 无法读取配置文件 ${configPath}: ${(error as Error).message}`);
    }
  }

  return {
    baseUrl: userConfig.baseUrl || defaultConfig.baseUrl,
    base: userConfig.base || defaultConfig.base,
    outputDir: userConfig.outputDir || defaultConfig.outputDir,
    defaultModule: userConfig.defaultModule || defaultConfig.defaultModule,
    modules: userConfig.modules || defaultConfig.modules,
    pdf: { ...defaultConfig.pdf, ...userConfig.pdf },
    chrome: { ...defaultConfig.chrome, ...userConfig.chrome },
    pageWaitTime: userConfig.pageWaitTime || defaultConfig.pageWaitTime,
    navigationTimeout: userConfig.navigationTimeout || defaultConfig.navigationTimeout,
  };
}

export function getDefaultConfigPath(): string {
  return path.join(__dirname, '../../config.json');
}
