const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = '/Users/ahmadfauzanazhim/Neuro Daily/Carousel';
const SLIDES = 7;

const carousels = [
  { folder: '32 - Sleep Debt Recovery',      file: 'Neuro Daily Carousel - Sleep Debt Recovery.html' },
  { folder: '33 - AI Kemampuan Berpikir',     file: 'Neuro Daily Carousel - AI Kemampuan Berpikir.html' },
  { folder: '34 - Overthinking Sebelum Tidur',file: 'Neuro Daily Carousel - Overthinking Sebelum Tidur.html' },
  { folder: '35 - Social Comparison Kantor',  file: 'Neuro Daily Carousel - Social Comparison Kantor.html' },
  { folder: '36 - Gut Feeling Karir',         file: 'Neuro Daily Carousel - Gut Feeling Karir.html' },
  { folder: '37 - Minta Maaf ke Atasan',      file: 'Neuro Daily Carousel - Minta Maaf ke Atasan.html' },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const { folder, file } of carousels) {
    const htmlPath = `file://${BASE.replace(/ /g, '%20')}/${folder.replace(/ /g, '%20')}/${file.replace(/ /g, '%20')}`;
    const outDir  = path.join(BASE, folder, 'Exports');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n▶ ${folder}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 540, height: 675, deviceScaleFactor: 2 });
    await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 30000 });
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
      const outPath = path.join(outDir, `slide-${num}.png`);
      await viewport.screenshot({ path: outPath, type: 'png' });
      console.log(`  ✓ slide-${num}.png`);
    }
    await page.close();
  }

  await browser.close();
  console.log('\n✅ Export selesai — semua 6 carousel');
})();
