const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML   = 'file:///Users/ahmadfauzanazhim/Neuro%20Daily/Carousel/38%20-%20Brain%20Kit%20For%20Work%20Launch/LinkedIn%20Cover%20-%20Brain%20Kit%20For%20Work.html';
const OUT    = '/Users/ahmadfauzanazhim/Neuro Daily/Carousel/38 - Brain Kit For Work Launch/Exports/LinkedIn Cover - Brain Kit For Work.png';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 4200, height: 700, deviceScaleFactor: 1 });

  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for Google Fonts to render
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2500));

  await page.screenshot({ path: OUT, type: 'png', clip: { x: 0, y: 0, width: 4200, height: 700 } });

  await browser.close();
  console.log('Done → ' + OUT);
})();
