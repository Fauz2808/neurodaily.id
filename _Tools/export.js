const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE       = path.resolve(__dirname, '..');
const LOGO_DIR   = path.join(BASE, 'Logo');
const OUT_PNG    = path.join(LOGO_DIR, 'Exports', 'PNG');
const OUT_SVG    = path.join(LOGO_DIR, 'Exports', 'SVG');
const CHROME     = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(OUT_PNG, { recursive: true });
fs.mkdirSync(OUT_SVG, { recursive: true });

// ── Brand palette ─────────────────────────────────────────────────────────────
const C = {
  forest:    '#0D2E28',
  teal:      '#1A6B5A',
  green:     '#5EC9A7',
  parchment: '#F5F3EE',
  amber:     '#C9A96E',
  black:     '#000000',
  white:     '#FFFFFF',
};

// CSS filter chains — applied to black-source PNG to recolor the mark
const F = {
  forest:    'brightness(0) saturate(100%) invert(13%) sepia(28%) saturate(900%) hue-rotate(115deg) brightness(95%) contrast(95%)',
  teal:      'brightness(0) saturate(100%) invert(33%) sepia(58%) saturate(420%) hue-rotate(115deg) brightness(85%) contrast(90%)',
  green:     'brightness(0) saturate(100%) invert(75%) sepia(35%) saturate(400%) hue-rotate(110deg) brightness(95%) contrast(85%)',
  parchment: 'brightness(0) saturate(100%) invert(96%) sepia(7%) saturate(180%) hue-rotate(20deg) brightness(99%) contrast(94%)',
  amber:     'brightness(0) saturate(100%) invert(72%) sepia(22%) saturate(540%) hue-rotate(2deg) brightness(92%) contrast(85%)',
  black:     'brightness(0)',
  white:     'brightness(0) invert(1)',
};

// ── Load source PNGs as base64 ────────────────────────────────────────────────
const b64Black = fs.readFileSync(path.join(LOGO_DIR, 'logo_Hipocampus(black_noBg)-01.png')).toString('base64');
const b64White = fs.readFileSync(path.join(LOGO_DIR, 'logo_Hipocampus(white_noBg).png')).toString('base64');

const markURI = (tone) =>
  `data:image/png;base64,${tone === 'white' ? b64White : b64Black}`;

// ── HTML fragment helpers ─────────────────────────────────────────────────────
const mark = (tone, sz) =>
  `<img src="${markURI(tone)}" style="width:${sz}px;height:${sz}px;display:block;object-fit:contain;flex-shrink:0;filter:${F[tone]}">`;

const wordmark = (fill, accent, italic, sz = 46) =>
  italic
    ? `<div style="font-family:'DM Serif Display',Georgia,serif;font-weight:400;font-size:${sz}px;line-height:1;letter-spacing:-.005em;color:${fill}">Neuro&nbsp;<em style="font-style:italic;color:${accent}">Daily</em></div>`
    : `<div style="font-family:'DM Serif Display',Georgia,serif;font-weight:400;font-size:${sz}px;line-height:1;color:${fill}">Neuro Daily</div>`;

const subline = (fill) =>
  `<div style="font-family:'DM Sans',Arial,sans-serif;font-weight:500;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${fill};margin-top:6px;opacity:.78">Brain Science&nbsp;·&nbsp;For Your Career</div>`;

const hLock = (mTone, mSz, fill, accent, italic, gap = 20) =>
  `<div style="display:flex;align-items:center;gap:${gap}px">${mark(mTone, mSz)}<div>${wordmark(fill, accent, italic)}${subline(fill)}</div></div>`;

const sLock = (mTone, mSz, fill, accent) =>
  `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center">${mark(mTone, mSz)}${wordmark(fill, accent, true, 42)}${subline(fill)}</div>`;

const avatar = (circleBg, mTone, mSz = 170, d = 260) =>
  `<div style="width:${d}px;height:${d}px;border-radius:50%;background:${circleBg};display:flex;align-items:center;justify-content:center">${mark(mTone, mSz)}</div>`;

// ── Variant definitions ───────────────────────────────────────────────────────
const variants = [
  // A — Primary lockups
  { id: 'A-01-horizontal-light',  label: 'Horizontal · Light',      w: 620, h: 340, bg: C.parchment,  inner: hLock('forest',    120, C.forest,    C.teal,      true)       },
  { id: 'A-02-horizontal-dark',   label: 'Horizontal · Dark',       w: 620, h: 340, bg: C.forest,     inner: hLock('green',     120, C.parchment, C.green,     true)       },
  { id: 'A-03-stacked-light',     label: 'Stacked · Light',         w: 420, h: 460, bg: C.parchment,  inner: sLock('forest',    140, C.forest,    C.teal)                  },
  { id: 'A-04-stacked-dark',      label: 'Stacked · Dark',          w: 420, h: 460, bg: C.forest,     inner: sLock('green',     140, C.parchment, C.green)                 },
  // B — Color variations
  { id: 'B-01-on-teal',           label: 'On Teal',                 w: 520, h: 340, bg: C.teal,       inner: hLock('parchment', 110, C.parchment, C.amber,     true,  18)  },
  { id: 'B-02-on-amber',          label: 'On Amber',                w: 520, h: 340, bg: C.amber,      inner: hLock('forest',    110, C.forest,    C.teal,      true,  18)  },
  { id: 'B-03-mono-light',        label: 'Mono · Light',            w: 420, h: 340, bg: C.parchment,  inner: hLock('black',     100, C.forest,    C.forest,    false, 16)  },
  { id: 'B-04-mono-dark',         label: 'Mono · Dark',             w: 420, h: 340, bg: C.black,      inner: hLock('white',     100, C.white,     C.white,     false, 16)  },
  // C — Avatars (circular, for IG profile)
  { id: 'C-01-avatar-forest',     label: 'Avatar · Forest',         w: 420, h: 420, bg: C.parchment,  inner: avatar(C.forest, 'green')                                    },
  { id: 'C-02-avatar-teal',       label: 'Avatar · Teal',           w: 420, h: 420, bg: C.parchment,  inner: avatar(C.teal,   'parchment')                                },
  // D — Mark only (isolated, for use as standalone icon)
  { id: 'D-01-mark-forest',       label: 'Mark · Forest',           w: 300, h: 300, bg: 'transparent', inner: mark('forest',    280), transparent: true },
  { id: 'D-02-mark-green',        label: 'Mark · Green',            w: 300, h: 300, bg: 'transparent', inner: mark('green',     280), transparent: true },
  { id: 'D-03-mark-parchment',    label: 'Mark · Parchment',        w: 300, h: 300, bg: C.forest,     inner: mark('parchment', 280)                     },
  { id: 'D-04-mark-amber',        label: 'Mark · Amber',            w: 300, h: 300, bg: 'transparent', inner: mark('amber',     280), transparent: true },
  { id: 'D-05-mark-white',        label: 'Mark · White',            w: 300, h: 300, bg: C.forest,     inner: mark('white',     280)                     },
];

// ── Build full HTML page (all variants on one page for Puppeteer) ─────────────
function buildHTML() {
  const gfonts = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;700&display=swap';
  const cards = variants.map(v =>
    `<div id="${v.id}" style="width:${v.w}px;height:${v.h}px;background:${v.bg};display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">${v.inner}</div>`
  ).join('\n');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${gfonts}" rel="stylesheet">
<style>* { box-sizing:border-box; margin:0; padding:0; } body { background:#1a1a1a; }</style>
</head>
<body>
<div style="display:flex;flex-wrap:wrap;gap:24px;padding:24px">
${cards}
</div>
</body>
</html>`;
}

// ── Build SVG (foreignObject — works in browsers + Figma) ────────────────────
function buildSVG(v) {
  const gfonts = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&amp;family=DM+Sans:wght@300;400;500;700&amp;display=swap';
  const bg = v.bg !== 'transparent'
    ? `<rect width="${v.w}" height="${v.h}" fill="${v.bg}"/>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${v.w}" height="${v.h}" viewBox="0 0 ${v.w} ${v.h}">
  <defs>
    <style>@import url('${gfonts}');</style>
  </defs>
  ${bg}
  <foreignObject width="${v.w}" height="${v.h}">
    <div xmlns="http://www.w3.org/1999/xhtml"
         style="width:${v.w}px;height:${v.h}px;display:flex;align-items:center;justify-content:center">
      ${v.inner}
    </div>
  </foreignObject>
</svg>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // 1. Write SVG files (no browser needed)
  console.log('Generating SVG files...');
  for (const v of variants) {
    const out = path.join(OUT_SVG, `${v.id}.svg`);
    fs.writeFileSync(out, buildSVG(v), 'utf8');
    console.log(`  ✓ ${v.id}.svg`);
  }

  // 2. Screenshot PNG files via Puppeteer + Chrome
  console.log('\nRendering PNG files via Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(buildHTML(), { waitUntil: 'load', timeout: 60000 });
    // Wait for web fonts to finish loading
    await page.evaluate(() => document.fonts.ready);

    for (const v of variants) {
      const el = await page.$(`#${v.id}`);
      if (!el) { console.warn(`  ✗ Element not found: ${v.id}`); continue; }
      await el.screenshot({
        path: path.join(OUT_PNG, `${v.id}.png`),
        omitBackground: !!v.transparent,
      });
      console.log(`  ✓ ${v.id}.png`);
    }
  } finally {
    await browser.close();
  }

  console.log(`\nDone! ${variants.length} variants exported.`);
  console.log(`→ PNG: ${OUT_PNG}`);
  console.log(`→ SVG: ${OUT_SVG}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
