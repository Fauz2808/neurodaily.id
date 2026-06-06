const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const HTML    = path.resolve(__dirname, '..', 'Product', 'Product 1', 'brain-kit-for-work.html');
const OUT_DIR = path.resolve(__dirname, '..', 'Product', 'Product 1', 'Exports');
const OUT_PDF = path.join(OUT_DIR, 'Brain Kit for Work — Neuro Daily.pdf');
const CHROME  = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`file://${HTML}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: OUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`✓ PDF exported → ${OUT_PDF}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
