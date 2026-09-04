import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { logger } from '../utils/logger';

export class PDFMerger {
  static async mergeBuffers(pdfBuffers: Buffer[], titles: string[], outputPath: string): Promise<string> {
    logger.info(`正在合并 ${pdfBuffers.length} 个页面...`);

    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < pdfBuffers.length; i++) {
      try {
        const pdf = await PDFDocument.load(pdfBuffers[i]);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        logger.debug(`已添加: ${titles[i] || `页面 ${i + 1}`}`);
      } catch (error) {
        logger.error(`合并页面 ${i + 1} 失败: ${(error as Error).message}`);
      }
    }

    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, mergedPdfBytes);

    logger.success(`合并完成: ${outputPath}`);
    return outputPath;
  }
}
