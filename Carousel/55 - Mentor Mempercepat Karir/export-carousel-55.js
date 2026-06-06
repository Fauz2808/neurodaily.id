const puppeteer = require('/Users/ahmadfauzanazhim/Neuro Daily/_Tools/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');
const CAROUSEL_HTML = path.resolve(__dirname, 'Neuro Daily Carousel - Mentor Mempercepat Karir.html');
const OUT_DIR = path.resolve(__dirname, 'Exports');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const IG_W = 1080, VP_W = 440, DPR = IG_W / VP_W, SLIDES = 7;
fs.mkdirSync(OUT_DIR, { recursive: true });
async function main() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 700, deviceScaleFactor: DPR });
  await page.goto(`file://${CAROUSEL_HTML}`, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: `body,html{background:transparent!important}.stage{width:${VP_W}px!important}.viewport{border-radius:0!important;box-shadow:none!important}.track{transition:none!important}.controls,.dots,.topbar,.caption-panel{display:none!important}` });
  for (let i = 0; i < SLIDES; i++) {
    await page.evaluate((idx) => { document.getElementById('track').style.transform = `translateX(-${idx * 100}%)`; }, i);
    await (await page.$('.viewport')).screenshot({ path: path.join(OUT_DIR, `slide-${String(i+1).padStart(2,'0')}.png`) });
    console.log(`✓ slide-${String(i+1).padStart(2,'0')}.png`);
  }
  await browser.close();
  console.log(`Done! → ${OUT_DIR}`);
}
main().catch(e => { console.error(e); process.exit(1); });
