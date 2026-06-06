const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CAROUSEL_BASE = path.resolve(__dirname, '..', 'Carousel');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const IG_W = 1080, VP_W = 440, DPR = IG_W / VP_W, SLIDES = 7;

const folder = '28 - Briefing Meleset';
const htmlFile = 'Neuro Daily Carousel - Briefing Meleset.html';

async function main() {
  const htmlPath = path.join(CAROUSEL_BASE, folder, htmlFile);
  const outDir   = path.join(CAROUSEL_BASE, folder, 'Exports');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 700, deviceScaleFactor: DPR });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  await page.addStyleTag({ content: `
    body, html { background: transparent !important; }
    .stage    { width: ${VP_W}px !important; height: 550px !important; }
    .viewport { border-radius: 0 !important; box-shadow: none !important; height: 100% !important; overflow: hidden !important; }
    .track    { transition: none !important; }
    .controls, .dots, .topbar, .caption-panel { display: none !important; }
  ` });

  for (let i = 0; i < SLIDES; i++) {
    await page.evaluate((idx) => {
      document.getElementById('track').style.transform = `translateX(-${idx * 440}px)`;
    }, i);
    const el = await page.$('.viewport');
    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await el.screenshot({ path: path.join(outDir, filename) });
    console.log(`  ✓ ${filename}`);
  }

  await browser.close();
  console.log('\n✅ Export selesai — carousel 28.');
}

main().catch(err => { console.error(err); process.exit(1); });
