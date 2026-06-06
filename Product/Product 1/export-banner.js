const puppeteer = require('/Users/ahmadfauzanazhim/Neuro Daily/_Tools/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

const HTML    = path.resolve(__dirname, 'lynkid-banner.html');
const OUT_DIR = path.resolve(__dirname, 'Exports');
const OUT_PNG = path.join(OUT_DIR, 'Neuro Daily — Lynkid Banner.png');
const CHROME  = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 628, deviceScaleFactor: 2 });
  await page.goto(`file://${HTML}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);

  const banner = await page.$('#banner');
  await banner.screenshot({ path: OUT_PNG, type: 'png' });

  await browser.close();
  console.log(`✓ Banner exported → ${OUT_PNG}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
