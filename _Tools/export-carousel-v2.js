const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML   = 'file:///Users/ahmadfauzanazhim/Neuro%20Daily/Carousel/31%20-%20Tidur%20Ideal/Neuro%20Daily%20Carousel%20-%20Tidur%20Ideal.html';
const OUT    = '/Users/ahmadfauzanazhim/Neuro Daily/Carousel/31 - Tidur Ideal/Exports';
const SLIDES = 7;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 2× device scale → 1080×1350 physical pixels output
  await page.setViewport({ width: 540, height: 675, deviceScaleFactor: 2 });

  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for Google Fonts to render
  await new Promise(r => setTimeout(r, 3000));

  // Hide navigation controls and dots before screenshotting
  await page.evaluate(() => {
    const els = document.querySelectorAll('.controls, .dots, .topbar, .caption-panel');
    els.forEach(el => el.style.display = 'none');
  });

  for (let i = 0; i < SLIDES; i++) {
    // Navigate to slide i using the carousel's built-in go() function
    await page.evaluate((idx) => { go(idx); }, i);
    await new Promise(r => setTimeout(r, 600));

    const viewport = await page.$('.viewport');
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT, `slide-${num}.png`);

    await viewport.screenshot({ path: outPath, type: 'png' });
    console.log(`✓ slide-${num}.png`);
  }

  await browser.close();
  console.log('Done — all slides exported.');
})();
