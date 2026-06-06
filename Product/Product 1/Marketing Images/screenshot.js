const puppeteer = require('/Users/ahmadfauzanazhim/.npm/_npx/7d92d9a2d2ccc630/node_modules/puppeteer');
const path = require('path');

const BASE_DIR = '/Users/ahmadfauzanazhim/Neuro Daily/Product/Product 1/Marketing Images';

const files = [
  { html: 'marketing_02_problem.html', png: 'marketing_02_problem.png' },
  { html: 'marketing_03_contents.html', png: 'marketing_03_contents.png' },
  { html: 'marketing_04_proof.html', png: 'marketing_04_proof.png' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const { html, png } of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });

    const url = 'file://' + path.join(BASE_DIR, html);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait a moment for fonts to settle
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 800)));

    const outputPath = path.join(BASE_DIR, png);
    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1080, height: 1080 },
    });

    console.log('Saved:', outputPath);
    await page.close();
  }

  await browser.close();
  console.log('Done.');
})();
