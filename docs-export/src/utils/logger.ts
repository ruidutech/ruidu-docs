export const logger = {
  info: (msg: string) => console.log(`ℹ️  ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  warn: (msg: string) => console.warn(`⚠️  ${msg}`),
  error: (msg: string) => console.error(`❌ ${msg}`),
  debug: (msg: string) => {
    if (process.env.DEBUG) {
      console.log(`🔍 ${msg}`);
    }
  },
  section: (title: string) => {
    console.log('');
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  ${title}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  },
  step: (step: number, total: number, msg: string) => {
    console.log(`[${step}/${total}] ${msg}`);
  },
};
