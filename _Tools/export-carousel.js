const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CAROUSEL_HTML = path.resolve(__dirname, '..', 'Carousel', '13 - Brain Kit for Work', 'Neuro Daily Carousel - Brain Kit for Work.html');
const OUT_DIR       = path.resolve(__dirname, '..', 'Carousel', '13 - Brain Kit for Work', 'Exports');
const CHROME        = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Instagram portrait 4:5 — 1080×1350px
const IG_W    = 1080;
const IG_H    = 1350;
const VP_W    = 440;   // matches .stage width
const VP_H    = 550;   // 440 × 5/4
const DPR     = IG_W / VP_W; // ≈ 2.454 — scales up to Instagram resolution
const SLIDES  = 7;

fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Wide enough so min(440px, 92vw) resolves to 440px, with high DPR for IG res
  await page.setViewport({ width: 600, height: 700, deviceScaleFactor: DPR });

  await page.goto(`file://${CAROUSEL_HTML}`, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  // Override styles for clean export: flat edges, no shadow, exact 440px width
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
    // Directly set track position — no animation needed
    await page.evaluate((idx) => {
      document.getElementById('track').style.transform = `translateX(-${idx * 100}%)`;
    }, i);

    const el = await page.$('.viewport');
    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await el.screenshot({ path: path.join(OUT_DIR, filename) });
    console.log(`✓ ${filename}  (${IG_W}×${IG_H}px)`);
  }

  await browser.close();
  console.log(`\nDone! ${SLIDES} slides saved to:\n→ ${OUT_DIR}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
