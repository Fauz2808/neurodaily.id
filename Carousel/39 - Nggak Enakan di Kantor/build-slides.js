const puppeteer = require('/Users/ahmadfauzanazhim/Neuro Daily/_Tools/node_modules/puppeteer-core');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML   = 'file:///Users/ahmadfauzanazhim/Neuro%20Daily/Carousel/39%20-%20Nggak%20Enakan%20di%20Kantor/Neuro%20Daily%20Carousel%20-%20Nggak%20Enakan%20di%20Kantor.html';
const OUT    = '/Users/ahmadfauzanazhim/Neuro Daily/Carousel/39 - Nggak Enakan di Kantor/Exports';
const SLIDES = 7;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 540, height: 675, deviceScaleFactor: 2 });
  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  await page.evaluate(() => {
    document.querySelectorAll('.controls, .dots, .topbar, .caption-panel')
      .forEach(el => el.style.display = 'none');
  });

  for (let i = 0; i < SLIDES; i++) {
    await page.evaluate((idx) => { go(idx); }, i);
    await new Promise(r => setTimeout(r, 600));

    const viewport = await page.$('.viewport');
    const num = String(i + 1).padStart(2, '0');
    await viewport.screenshot({ path: path.join(OUT, `slide-${num}.png`), type: 'png' });
    console.log(`✓ slide-${num}.png`);
  }

  await browser.close();
  console.log('Done — all 7 slides exported.');
})();
