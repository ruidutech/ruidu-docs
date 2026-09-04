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
  docx?: {
    /** pandoc --reference-doc 样式模板（相对 docs-export 目录），空字符串 表示禁用 */
    referenceDoc?: string;
    /** 表格宽度按内容自适应（Word「根据内容调整表格」），false 时占满文本宽度 */
    tableAutofit?: boolean;
    /** 品牌封面（替换 pandoc 默认 Title 页）：logo + 品牌名 / 标题 / 页底年月 */
    cover?: {
      brand: string;
      logo: string;
      title: string;
      subtitle: string;
    };
  };
  pageWaitTime: number;
  navigationTimeout: number;
}
