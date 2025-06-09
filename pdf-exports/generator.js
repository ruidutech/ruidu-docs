const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 默认配置
const DEFAULT_CONFIG = {
  format: 'A4',
  margin: {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm'
  },
  printBackground: true,
  preferCSSPageSize: false,
  displayHeaderFooter: true,
  headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">睿度文档</div>',
  footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; margin: 0 auto;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
};

class PDFGenerator {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'http://localhost:5173';
    this.outputDir = options.outputDir || './pdf-exports/output';
    this.config = { ...DEFAULT_CONFIG, ...options.pdfConfig };
    this.browser = null;
  }

  async init() {
    // 启动浏览器
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async generatePDF(pagePath, outputFileName) {
    if (!this.browser) {
      throw new Error('PDF Generator not initialized. Call init() first.');
    }

    const page = await this.browser.newPage();
    
    try {
      // 设置视口大小
      await page.setViewport({ width: 1200, height: 800 });
      
      // 构建完整URL
      const url = `${this.baseUrl}${pagePath}`;
      console.log(`正在访问: ${url}`);
      
      // 导航到页面
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      // 等待页面完全加载
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 执行一些优化操作
      await page.evaluate(() => {
        // 移除可能影响打印的元素
        const elementsToRemove = [
          '.VPNavBar',
          '.VPLocalNav',
          '.VPSidebar',
          '.VPDocAside',
          '.VPDocFooter'
        ];
        
        elementsToRemove.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.remove());
        });

        // 优化表格显示
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
          table.style.fontSize = '12px';
          table.style.pageBreakInside = 'avoid';
        });

        // 优化代码块显示
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach(block => {
          block.style.fontSize = '10px';
          block.style.overflow = 'visible';
          block.style.whiteSpace = 'pre-wrap';
        });
      });

      // 生成PDF
      const outputPath = path.join(this.outputDir, outputFileName);
      console.log(`正在生成PDF: ${outputPath}`);
      
      await page.pdf({
        path: outputPath,
        ...this.config
      });

      console.log(`✅ PDF已生成: ${outputPath}`);
      return outputPath;

    } catch (error) {
      console.error(`❌ 生成PDF失败 (${pagePath}):`, error.message);
      throw error;
    } finally {
      await page.close();
    }
  }

  async generateMultiplePages(pages) {
    const results = [];
    
    for (const pageInfo of pages) {
      try {
        const result = await this.generatePDF(pageInfo.path, pageInfo.filename);
        results.push({ ...pageInfo, success: true, outputPath: result });
      } catch (error) {
        results.push({ ...pageInfo, success: false, error: error.message });
      }
    }
    
    return results;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

// 命令行参数解析
function parseArguments() {
  const args = process.argv.slice(2);
  const config = {
    pages: [],
    baseUrl: 'http://localhost:5173',
    outputDir: './pdf-exports'
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--url':
        config.baseUrl = args[++i];
        break;
      case '--output':
        config.outputDir = args[++i];
        break;
      case '--page':
        const pagePath = args[++i];
        const filename = args[++i] || `page-${Date.now()}.pdf`;
        config.pages.push({ path: pagePath, filename });
        break;
      case '--config':
        const configFile = args[++i];
        if (fs.existsSync(configFile)) {
          const fileConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'));
          Object.assign(config, fileConfig);
        }
        break;
    }
  }

  return config;
}

// 主函数
async function main() {
  const config = parseArguments();
  
  if (config.pages.length === 0) {
    console.log('未找到导出页面，请检查配置文件。');
    process.exit(1);
  }

  const generator = new PDFGenerator({
    baseUrl: config.baseUrl,
    outputDir: config.outputDir
  });

  try {
    console.log('🚀 初始化PDF生成器...');
    await generator.init();
    
    console.log(`📄 开始生成 ${config.pages.length} 个PDF文件...`);
    const results = await generator.generateMultiplePages(config.pages);
    
    // 输出结果
    results.forEach(result => {
      if (result.success) {
        console.log(`✅ ${result.path} -> ${result.outputPath}`);
      } else {
        console.log(`❌ ${result.path} -> 失败: ${result.error}`);
      }
    });
    
    const successCount = results.filter(r => r.success).length;
    console.log(`\n🎉 完成! 成功生成 ${successCount}/${results.length} 个PDF文件`);
    
  } catch (error) {
    console.error('❌ 发生错误:', error.message);
    process.exit(1);
  } finally {
    await generator.close();
  }
}

// 如果直接运行此脚本，执行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { PDFGenerator }; 