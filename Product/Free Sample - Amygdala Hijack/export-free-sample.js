const puppeteer = require('/Users/ahmadfauzanazhim/Neuro Daily/_Tools/node_modules/puppeteer-core');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML   = 'file:///Users/ahmadfauzanazhim/Neuro%20Daily/Product/Product%201/free-sample-amygdala-hijack.html';
const OUT    = '/Users/ahmadfauzanazhim/Neuro Daily/Product/Product 1/Free Sample - Amygdala Hijack.pdf';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000)); // tunggu fonts

  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('Done — Free Sample - Amygdala Hijack.pdf');
})();
