const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CAROUSEL_BASE = path.resolve(__dirname, '..', 'Carousel');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const IG_W = 1080, VP_W = 440, DPR = IG_W / VP_W, SLIDES = 7;

const CAROUSELS = [
  { folder: '14 - Peak Performance Time',   html: 'Neuro Daily Carousel - Peak Performance Time.html' },
  { folder: '15 - Reset Otak Post-Meeting', html: 'Neuro Daily Carousel - Reset Otak Post-Meeting.html' },
  { folder: '16 - Musik dan Fokus',          html: 'Neuro Daily Carousel - Musik dan Fokus.html' },
  { folder: '17 - WFH Lebih Menguras',       html: 'Neuro Daily Carousel - WFH Lebih Menguras.html' },
];

async function exportCarousel(browser, folder, htmlFile) {
  const htmlPath = path.join(CAROUSEL_BASE, folder, htmlFile);
  const outDir   = path.join(CAROUSEL_BASE, folder, 'Exports');
  fs.mkdirSync(outDir, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 700, deviceScaleFactor: DPR });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: `
    body, html { background: transparent !important; }
    .stage    { width: ${VP_W}px !important; }
    .viewport { border-radius: 0 !important; box-shadow: none !important; }
    .track    { transition: none !important; }
    .controls, .dots, .topbar, .caption-panel { display: none !important; }
  ` });
  for (let i = 0; i < SLIDES; i++) {
    await page.evaluate((idx) => {
      document.getElementById('track').style.transform = `translateX(-${idx * 100}%)`;
    }, i);
    const el = await page.$('.viewport');
    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await el.screenshot({ path: path.join(outDir, filename) });
    process.stdout.write(`  ✓ ${filename}\n`);
  }
  await page.close();
}

async function main() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  for (const { folder, html } of CAROUSELS) {
    console.log(`\n▶ ${folder}`);
    await exportCarousel(browser, folder, html);
  }
  await browser.close();
  console.log('\n✅ Export selesai — carousel 14–17.');
}

main().catch(err => { console.error(err); process.exit(1); });
