import path from "path";
import type { Config } from "./types";

export const defaultConfig: Config = {
  baseUrl: "http://localhost:5173/ruidu-docs",
  base: "/ruidu-docs/",
  outputDir: "./tmp",
  defaultModule: "orbitcontrol",
  modules: {},
  pdf: {
    format: "A4",
    margin: {
      top: "20mm",
      right: "20mm",
      bottom: "20mm",
      left: "20mm",
    },
    printBackground: true,
    preferCSSPageSize: false,
    displayHeaderFooter: true,
    headerTemplate:
      '<div style="font-size: 10px; text-align: center; width: 100%;"></div>',
    footerTemplate:
      '<div style="font-size: 10px; text-align: center; width: 100%; margin: 0 auto;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  },
  chrome: {
    headless: "new",
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  },
  pageWaitTime: 2000,
  navigationTimeout: 60000,
};
