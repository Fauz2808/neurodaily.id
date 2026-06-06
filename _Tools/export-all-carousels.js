const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CAROUSEL_BASE = path.resolve(__dirname, '..', 'Carousel');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const IG_W = 1080;
const VP_W = 440;
const VP_H = 550;
const DPR  = IG_W / VP_W; // 2.4545...
const SLIDES = 7;

const CAROUSELS = [
  { folder: '04 - Blank Saat Presentasi',        html: 'Neuro Daily Carousel - Blank Presentasi.html' },
  { folder: '05 - Susah Bilang Tidak',            html: 'Neuro Daily Carousel - Susah Bilang Tidak.html' },
  { folder: '06 - Kritik dari Atasan',            html: 'Neuro Daily Carousel - Kritik Atasan.html' },
  { folder: '07 - Lupa Nama Orang',               html: 'Neuro Daily Carousel - Lupa Nama Orang.html' },
  { folder: '08 - Deep Work 90 Menit',            html: 'Neuro Daily Carousel - Deep Work 90 Menit.html' },
  { folder: '09 - Otak Tidak Bisa Multitasking',  html: 'Neuro Daily Carousel - Otak Tidak Bisa Multitasking.html' },
  { folder: '10 - Public Speaking',               html: 'Neuro Daily Carousel - Public Speaking.html' },
  { folder: '11 - Mode Survival',                 html: 'Neuro Daily Carousel - Mode Survival.html' },
  { folder: '12 - Olahraga vs Kopi',             html: 'Neuro Daily Carousel - Olahraga vs Kopi.html' },
];

async function exportCarousel(browser, folder, htmlFile) {
  const htmlPath = path.join(CAROUSEL_BASE, folder, htmlFile);
  const outDir   = path.join(CAROUSEL_BASE, folder, 'Exports');
  fs.mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 700, deviceScaleFactor: DPR });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  await page.addStyleTag({
    content: `
      body, html { background: transparent !important; }
      .stage    { width: ${VP_W}px !important; }
      .viewport { border-radius: 0 !important; box-shadow: none !important; }
      .track    { transition: none !important; }
      .controls, .dots, .topbar, .caption-panel { display: none !important; }
    `,
  });

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
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const { folder, html } of CAROUSELS) {
    console.log(`\n▶ ${folder}`);
    await exportCarousel(browser, folder, html);
  }

  await browser.close();
  console.log(`\n✅ Semua carousel selesai di-export.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
