export interface SidebarItem {
  text: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

export interface Page {
  path: string;
  title: string;
  group?: string;
}

export interface ModuleConfig {
  name: string;
  pages: Page[];
}

export interface Config {
  baseUrl: string;
  base: string;
  outputDir: string;
  defaultModule: string;
  modules: Record<string, ModuleConfig>;
  pdf: {
    format: string;
    margin: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    };
    printBackground: boolean;
    preferCSSPageSize: boolean;
    displayHeaderFooter: boolean;
    headerTemplate: string;
    footerTemplate: string;
  };
  chrome: {
    headless: string;
    executablePath: string;
    args?: string[];
  };
  pageWaitTime: number;
  navigationTimeout: number;
}
