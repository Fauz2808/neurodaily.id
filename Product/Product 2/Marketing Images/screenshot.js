const puppeteer = require('/Users/ahmadfauzanazhim/Neuro Daily/_Tools/node_modules/puppeteer-core');
const path = require('path');

const BASE_DIR = __dirname;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const files = [
  { html: 'marketing_01_hook.html', png: 'marketing_01_hook.png' },
  { html: 'marketing_02_protocols.html', png: 'marketing_02_protocols.png' },
  { html: 'marketing_03_format.html', png: 'marketing_03_format.png' },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const { html, png } of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });

    const url = 'file://' + path.join(BASE_DIR, html);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

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
