const puppeteer = require('/Users/ahmadfauzanazhim/.npm/_npx/7d92d9a2d2ccc630/node_modules/puppeteer');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Free Sample - Amygdala Hijack | Brain Kit for Work</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #1B3A2F;
    --bg-light: #22483A;
    --teal: #4ECDC4;
    --gold: #C9A84C;
    --white: #FFFFFF;
    --white-70: rgba(255,255,255,0.7);
    --white-40: rgba(255,255,255,0.4);
    --white-15: rgba(255,255,255,0.15);
    --white-08: rgba(255,255,255,0.08);
    --teal-20: rgba(78,205,196,0.2);
    --gold-20: rgba(201,168,76,0.2);
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--white);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 794px;
    min-height: 1123px;
    background: var(--bg);
    position: relative;
    overflow: hidden;
    page-break-after: always;
    page-break-inside: avoid;
    display: flex;
    flex-direction: column;
  }

  /* ============================================================
     PAGE 1 — COVER
  ============================================================ */
  .cover {
    background: var(--bg);
  }

  .cover .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 36px 48px 0;
    position: relative;
    z-index: 10;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-mark {
    width: 36px;
    height: 36px;
    background: var(--teal);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .logo-mark svg {
    width: 20px;
    height: 20px;
  }

  .logo-text {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.2em;
    color: var(--white);
  }

  .free-sample-badge {
    border: 1.5px solid var(--gold);
    border-radius: 20px;
    padding: 7px 18px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--gold);
    text-transform: uppercase;
    background: var(--gold-20);
  }

  .cover-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 48px 40px;
    position: relative;
    z-index: 10;
  }

  .chapter-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: var(--teal);
    text-transform: uppercase;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .chapter-label::before {
    content: '';
    display: block;
    width: 32px;
    height: 1.5px;
    background: var(--teal);
    flex-shrink: 0;
  }

  .cover-headline {
    margin-bottom: 32px;
    line-height: 1;
  }

  .cover-headline .line1 {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 110px;
    color: var(--white);
    display: block;
    letter-spacing: -2px;
  }

  .cover-headline .line2 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-style: italic;
    font-size: 110px;
    color: var(--teal);
    display: block;
    letter-spacing: -2px;
    line-height: 0.9;
  }

  .cover-subheadline {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.65;
    max-width: 420px;
    margin-bottom: 60px;
    border-left: 3px solid var(--teal);
    padding-left: 20px;
  }

  .cover-footer {
    padding: 28px 48px;
    border-top: 1px solid var(--white-15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
  }

  .cover-footer-text {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    color: var(--white-40);
    text-transform: uppercase;
  }

  .neural-bg {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.08;
    z-index: 1;
  }

  /* ============================================================
     SHARED PAGE ELEMENTS
  ============================================================ */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 48px;
    border-bottom: 1px solid var(--white-15);
  }

  .page-header .logo-text {
    font-size: 11px;
    letter-spacing: 0.2em;
  }

  .page-number {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 500;
    color: var(--white-40);
    letter-spacing: 0.1em;
  }

  .page-footer {
    padding: 20px 48px;
    border-top: 1px solid var(--white-15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .page-footer-text {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: var(--white-40);
    text-transform: uppercase;
  }

  .page-content {
    flex: 1;
    padding: 48px 48px 32px;
    display: flex;
    flex-direction: column;
  }

  .section-label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: var(--teal);
    text-transform: uppercase;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--white-15);
  }

  .section-headline {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 38px;
    color: var(--white);
    line-height: 1.2;
    margin-bottom: 28px;
    letter-spacing: -0.5px;
  }

  .body-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.85;
    margin-bottom: 20px;
  }

  /* ============================================================
     PAGE 2 — OPENING SCENARIO
  ============================================================ */
  .pull-quote {
    background: var(--white-08);
    border-left: 4px solid var(--teal);
    border-radius: 0 12px 12px 0;
    padding: 32px 36px;
    margin-bottom: 36px;
  }

  .pull-quote p {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-style: italic;
    font-size: 22px;
    line-height: 1.55;
    color: var(--white);
    letter-spacing: -0.2px;
  }

  .pull-quote .quote-mark {
    font-size: 60px;
    line-height: 0.5;
    color: var(--teal);
    font-family: 'Playfair Display', serif;
    display: block;
    margin-bottom: 12px;
    opacity: 0.6;
  }

  /* ============================================================
     PAGE 3 — THE SCIENCE
  ============================================================ */
  .highlight-box {
    border: 1.5px solid var(--gold);
    border-radius: 12px;
    padding: 28px 32px;
    background: var(--gold-20);
    margin: 28px 0;
  }

  .highlight-box p {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-style: italic;
    font-size: 16px;
    line-height: 1.6;
    color: var(--white);
  }

  .highlight-box .source-label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  /* ============================================================
     PAGE 4 — WHAT HAPPENS
  ============================================================ */
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 28px 0;
  }

  .timeline-item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 18px 24px;
    background: var(--white-08);
    border-radius: 10px;
    border: 1px solid var(--white-15);
  }

  .timeline-number {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: var(--teal);
    letter-spacing: 0.05em;
    flex-shrink: 0;
    width: 28px;
    padding-top: 1px;
  }

  .timeline-text {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.6;
  }

  .timeline-text strong {
    color: var(--white);
    font-weight: 600;
  }

  /* ============================================================
     PAGE 5 — THE HACKS
  ============================================================ */
  .hack-card {
    background: var(--white-08);
    border: 1px solid var(--white-15);
    border-radius: 12px;
    padding: 24px 28px;
    margin-bottom: 16px;
  }

  .hack-header {
    display: flex;
    align-items: baseline;
    gap: 14px;
    margin-bottom: 8px;
  }

  .hack-number {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: var(--gold);
    flex-shrink: 0;
  }

  .hack-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 17px;
    color: var(--white);
    line-height: 1.3;
  }

  .hack-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: var(--teal);
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .hack-body {
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.75;
    margin-bottom: 10px;
  }

  .hack-usage {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: var(--teal-20);
    border-radius: 6px;
    padding: 10px 14px;
  }

  .hack-usage-label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    color: var(--teal);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    flex-shrink: 0;
    padding-top: 1px;
  }

  .hack-usage-text {
    font-family: 'Inter', sans-serif;
    font-size: 11.5px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.55;
  }

  .page5-intro {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.7;
    margin-bottom: 24px;
    padding: 14px 20px;
    background: var(--white-08);
    border-radius: 8px;
    border-left: 3px solid var(--gold);
  }

  /* ============================================================
     PAGE 6 — CTA
  ============================================================ */
  .cta-page {
    background: #152E24;
  }

  .cta-page .page-content {
    align-items: center;
    text-align: center;
    padding: 56px 64px;
    justify-content: center;
    gap: 0;
  }

  .ends-here-label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 40px;
    padding: 8px 20px;
    border: 1px solid var(--gold);
    border-radius: 20px;
    display: inline-block;
    background: var(--gold-20);
  }

  .cta-headline {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 32px;
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 20px;
    letter-spacing: -0.3px;
    max-width: 560px;
  }

  .cta-headline em {
    color: var(--teal);
    font-style: italic;
  }

  .cta-body {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.8;
    max-width: 520px;
    margin-bottom: 40px;
  }

  .product-card {
    background: var(--white-08);
    border: 1.5px solid var(--gold);
    border-radius: 16px;
    padding: 28px 40px;
    margin-bottom: 32px;
    max-width: 400px;
    width: 100%;
  }

  .product-card-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 20px;
    color: var(--white);
    margin-bottom: 6px;
    letter-spacing: -0.2px;
  }

  .product-card-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: var(--white-70);
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .product-card-specs {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 20px;
  }

  .spec-item {
    text-align: center;
  }

  .spec-value {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 20px;
    color: var(--teal);
    display: block;
  }

  .spec-label {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 600;
    color: var(--white-40);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .price-tag {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 28px;
    color: var(--gold);
    margin-bottom: 4px;
  }

  .price-sub {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    color: var(--white-40);
  }

  .cta-button {
    background: var(--teal);
    color: #0f2a21;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.05em;
    padding: 18px 48px;
    border-radius: 10px;
    margin-bottom: 16px;
    display: inline-block;
    max-width: 400px;
    width: 100%;
  }

  .cta-url {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--teal);
    letter-spacing: 0.05em;
    margin-bottom: 40px;
    opacity: 0.8;
  }

  .cta-footer {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    color: var(--white-40);
    text-transform: uppercase;
    border-top: 1px solid var(--white-15);
    padding-top: 24px;
    width: 100%;
    text-align: center;
  }

  /* Gold accent border for CTA page */
  .cta-page::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--teal), var(--gold), var(--teal));
  }

  /* Divider */
  .divider {
    width: 48px;
    height: 2px;
    background: var(--teal);
    margin-bottom: 20px;
  }

  /* Small body variant */
  .body-text-sm {
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    color: var(--white-70);
    line-height: 1.8;
    margin-bottom: 16px;
  }

</style>
</head>
<body>

<!-- ============================================================
     PAGE 1 — COVER
============================================================ -->
<div class="page cover">
  <!-- Neural network SVG background -->
  <svg class="neural-bg" width="520" height="700" viewBox="0 0 520 700" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Nodes -->
    <circle cx="260" cy="140" r="10" fill="#4ECDC4"/>
    <circle cx="160" cy="220" r="7" fill="#4ECDC4"/>
    <circle cx="360" cy="200" r="8" fill="#C9A84C"/>
    <circle cx="110" cy="340" r="6" fill="#4ECDC4"/>
    <circle cx="240" cy="310" r="9" fill="#4ECDC4"/>
    <circle cx="390" cy="320" r="7" fill="#C9A84C"/>
    <circle cx="300" cy="440" r="8" fill="#4ECDC4"/>
    <circle cx="170" cy="480" r="6" fill="#C9A84C"/>
    <circle cx="430" cy="450" r="7" fill="#4ECDC4"/>
    <circle cx="220" cy="580" r="7" fill="#4ECDC4"/>
    <circle cx="350" cy="560" r="6" fill="#C9A84C"/>
    <circle cx="140" cy="640" r="5" fill="#4ECDC4"/>
    <circle cx="420" cy="600" r="6" fill="#4ECDC4"/>
    <!-- Edges -->
    <line x1="260" y1="140" x2="160" y2="220" stroke="#4ECDC4" stroke-width="1"/>
    <line x1="260" y1="140" x2="360" y2="200" stroke="#4ECDC4" stroke-width="1"/>
    <line x1="160" y1="220" x2="110" y2="340" stroke="#4ECDC4" stroke-width="0.8"/>
    <line x1="160" y1="220" x2="240" y2="310" stroke="#4ECDC4" stroke-width="0.8"/>
    <line x1="360" y1="200" x2="240" y2="310" stroke="#4ECDC4" stroke-width="0.8"/>
    <line x1="360" y1="200" x2="390" y2="320" stroke="#4ECDC4" stroke-width="0.8"/>
    <line x1="110" y1="340" x2="170" y2="480" stroke="#4ECDC4" stroke-width="0.7"/>
    <line x1="240" y1="310" x2="300" y2="440" stroke="#4ECDC4" stroke-width="0.7"/>
    <line x1="390" y1="320" x2="430" y2="450" stroke="#4ECDC4" stroke-width="0.7"/>
    <line x1="300" y1="440" x2="220" y2="580" stroke="#4ECDC4" stroke-width="0.7"/>
    <line x1="300" y1="440" x2="350" y2="560" stroke="#4ECDC4" stroke-width="0.7"/>
    <line x1="430" y1="450" x2="420" y2="600" stroke="#4ECDC4" stroke-width="0.7"/>
    <line x1="220" y1="580" x2="140" y2="640" stroke="#4ECDC4" stroke-width="0.6"/>
    <line x1="350" y1="560" x2="420" y2="600" stroke="#4ECDC4" stroke-width="0.6"/>
  </svg>

  <div class="top-bar">
    <div class="logo">
      <img src="data:image/png;base64,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" style="width:40px;height:40px;border-radius:50%;flex-shrink:0;" />
      <span class="logo-text">NEURO DAILY</span>
    </div>
    <div class="free-sample-badge">✦ FREE SAMPLE</div>
  </div>

  <div class="cover-body">
    <div class="chapter-label">BAB 01 · BRAIN KIT FOR WORK</div>

    <div class="cover-headline">
      <span class="line1">Amygdala</span>
      <span class="line2">Hijack</span>
    </div>

    <div class="cover-subheadline">
      Kenapa kamu bisa blank saat presentasi — padahal sudah latihan matang
    </div>
  </div>

  <div class="cover-footer">
    <span class="cover-footer-text">NEURO DAILY · Brain Science for Your Career</span>
    <span class="cover-footer-text">Brain Kit for Work</span>
  </div>
</div>


<!-- ============================================================
     PAGE 2 — OPENING SCENARIO
============================================================ -->
<div class="page">
  <div class="page-header">
    <div class="logo">
      <div class="logo-mark" style="width:28px;height:28px;">
        <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;">
          <circle cx="12" cy="12" r="3" fill="#1B3A2F"/>
          <circle cx="6" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="6" cy="16" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="16" r="2" fill="#1B3A2F"/>
          <line x1="12" y1="12" x2="6" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="6" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
        </svg>
      </div>
      <span class="logo-text">NEURO DAILY</span>
    </div>
    <span class="page-number">02 / 06</span>
  </div>

  <div class="page-content">
    <div class="section-label">THE SCENARIO</div>

    <div class="pull-quote">
      <span class="quote-mark">"</span>
      <p>Kamu sudah latihan 3 kali. Slide sudah hafal. Tapi begitu semua mata tertuju ke kamu — otakmu kosong.</p>
    </div>

    <div class="body-text">
      Ini bukan soal persiapan yang kurang. Ini bukan soal mental lemah. Yang terjadi adalah sesuatu yang jauh lebih mendasar — dan hampir tidak bisa kamu kontrol secara sadar. Setidaknya, sebelum kamu tahu cara kerjanya.
    </div>

    <div class="body-text">
      Amygdala hijack adalah momen ketika bagian primitif otakmu mengambil alih kendali dari bagian yang berpikir rasional — dalam hitungan milidetik. Dan di tempat kerja, ini terjadi lebih sering dari yang kamu sadari.
    </div>

    <div style="flex:1;"></div>

    <div style="display:flex; gap:20px; margin-top: 20px;">
      <div style="flex:1; background: rgba(78,205,196,0.1); border-radius:10px; padding: 20px 22px; border:1px solid rgba(78,205,196,0.25);">
        <div style="font-family:'Inter',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; color:#4ECDC4; text-transform:uppercase; margin-bottom:8px;">Dalam bab ini</div>
        <div style="font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.7); line-height:1.7;">Mekanisme neurologis di balik blank saat presentasi, serta 3 strategi berbasis riset untuk memutus siklus amygdala hijack sebelum merusak performamu.</div>
      </div>
      <div style="flex:1; background: rgba(201,168,76,0.1); border-radius:10px; padding: 20px 22px; border:1px solid rgba(201,168,76,0.25);">
        <div style="font-family:'Inter',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; color:#C9A84C; text-transform:uppercase; margin-bottom:8px;">Berdasarkan riset</div>
        <div style="font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.7); line-height:1.7;">Daniel Goleman, Stanford Neuroscience Lab, UCLA (Lieberman et al., 2007), dan penelitian neurosains tentang respons stres di lingkungan kerja.</div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span class="page-footer-text">NEURO DAILY · Brain Science for Your Career</span>
    <span class="page-footer-text">Free Sample</span>
  </div>
</div>


<!-- ============================================================
     PAGE 3 — THE SCIENCE
============================================================ -->
<div class="page">
  <div class="page-header">
    <div class="logo">
      <div class="logo-mark" style="width:28px;height:28px;">
        <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;">
          <circle cx="12" cy="12" r="3" fill="#1B3A2F"/>
          <circle cx="6" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="6" cy="16" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="16" r="2" fill="#1B3A2F"/>
          <line x1="12" y1="12" x2="6" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="6" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
        </svg>
      </div>
      <span class="logo-text">NEURO DAILY</span>
    </div>
    <span class="page-number">03 / 06</span>
  </div>

  <div class="page-content">
    <div class="section-label">THE NEUROSCIENCE</div>

    <div class="section-headline">Amygdala: Alarm<br>Darurat Otakmu</div>

    <div class="body-text-sm">
      Di dalam otakmu ada dua struktur kecil berbentuk almond yang disebut amygdala. Tugasnya satu: mendeteksi ancaman dan membunyikan alarm darurat.
    </div>

    <div class="body-text-sm">
      Selama ribuan tahun evolusi, alarm ini bekerja sempurna. Saat leluhur kita bertemu predator, amygdala langsung mengaktifkan respons <em style="color:#4ECDC4; font-style:normal; font-weight:600;">fight-flight-freeze</em> — tubuh siap bertarung atau kabur dalam milidetik.
    </div>

    <div class="body-text-sm">
      Masalahnya: otak kamu tidak bisa membedakan antara ancaman fisik (harimau) dan ancaman sosial (judgement dari audiens). Keduanya memicu respons yang sama persis.
    </div>

    <div class="highlight-box">
      <div class="source-label">Key Insight</div>
      <p>"Saat kamu presentasi di depan atasan, otak kamu secara harfiah memprosesnya seperti menghadapi predator. Bukan metafora — ini secara neurologis identik."</p>
    </div>

    <div class="body-text-sm">
      Inilah yang disebut <strong style="color:#fff;">Amygdala Hijack</strong> — istilah yang diciptakan psikolog Daniel Goleman. Ketika amygdala mengambil alih, prefrontal cortex (bagian otak yang bertanggung jawab untuk berpikir jernih, mengingat, dan berbicara dengan lancar) kehilangan akses ke sumber daya kognitif.
    </div>

    <div style="display:flex; gap:16px; margin-top: 8px;">
      <div style="flex:1; text-align:center; background:rgba(78,205,196,0.1); border-radius:10px; padding:16px; border:1px solid rgba(78,205,196,0.2);">
        <div style="font-family:'Playfair Display',serif; font-weight:700; font-size:22px; color:#4ECDC4;">Amygdala</div>
        <div style="font-family:'Inter',sans-serif; font-size:10px; color:rgba(255,255,255,0.5); margin-top:4px; letter-spacing:0.1em; text-transform:uppercase;">Deteksi Ancaman</div>
        <div style="font-family:'Inter',sans-serif; font-size:11px; color:rgba(255,255,255,0.6); margin-top:8px; line-height:1.5;">Primitif · Cepat · Otomatis</div>
      </div>
      <div style="display:flex; align-items:center; color:rgba(255,255,255,0.3); font-size:20px;">→</div>
      <div style="flex:1; text-align:center; background:rgba(201,168,76,0.1); border-radius:10px; padding:16px; border:1px solid rgba(201,168,76,0.2);">
        <div style="font-family:'Playfair Display',serif; font-weight:700; font-size:22px; color:#C9A84C;">Hijack</div>
        <div style="font-family:'Inter',sans-serif; font-size:10px; color:rgba(255,255,255,0.5); margin-top:4px; letter-spacing:0.1em; text-transform:uppercase;">PFC Offline</div>
        <div style="font-family:'Inter',sans-serif; font-size:11px; color:rgba(255,255,255,0.6); margin-top:8px; line-height:1.5;">Blank · Panik · Lupa</div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span class="page-footer-text">NEURO DAILY · Brain Science for Your Career</span>
    <span class="page-footer-text">Free Sample</span>
  </div>
</div>


<!-- ============================================================
     PAGE 4 — WHAT HAPPENS
============================================================ -->
<div class="page">
  <div class="page-header">
    <div class="logo">
      <div class="logo-mark" style="width:28px;height:28px;">
        <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;">
          <circle cx="12" cy="12" r="3" fill="#1B3A2F"/>
          <circle cx="6" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="6" cy="16" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="16" r="2" fill="#1B3A2F"/>
          <line x1="12" y1="12" x2="6" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="6" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
        </svg>
      </div>
      <span class="logo-text">NEURO DAILY</span>
    </div>
    <span class="page-number">04 / 06</span>
  </div>

  <div class="page-content">
    <div class="section-label">APA YANG TERJADI DI OTAKMU</div>

    <div class="section-headline">Cascade Reaksi dalam<br>200 Milidetik</div>

    <div class="timeline">
      <div class="timeline-item">
        <span class="timeline-number">01</span>
        <span class="timeline-text">Amygdala mendeteksi <strong>"ancaman"</strong> — mata audiens, ekspektasi tinggi, takut salah</span>
      </div>
      <div class="timeline-item">
        <span class="timeline-number">02</span>
        <span class="timeline-text">Sinyal bahaya dikirim ke <strong>hypothalamus</strong> dalam milidetik</span>
      </div>
      <div class="timeline-item">
        <span class="timeline-number">03</span>
        <span class="timeline-text"><strong>Kortisol dan adrenalin</strong> dilepaskan ke aliran darah — tubuh siap "fight or flight"</span>
      </div>
      <div class="timeline-item" style="border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.08);">
        <span class="timeline-number" style="color:#C9A84C;">04</span>
        <span class="timeline-text"><strong>Prefrontal cortex "offline"</strong> — working memory terganggu, akses ke ingatan terblokir</span>
      </div>
      <div class="timeline-item" style="border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.08);">
        <span class="timeline-number" style="color:#C9A84C;">05</span>
        <span class="timeline-text"><strong>Kamu blank.</strong> Jantung berdegup. Tangan berkeringat. Pikiran kosong.</span>
      </div>
      <div class="timeline-item" style="border-color: rgba(255,100,100,0.3); background: rgba(255,100,100,0.06);">
        <span class="timeline-number" style="color:#ff8080;">06</span>
        <span class="timeline-text">Semakin panik karena blank → amygdala makin aktif → <strong>lingkaran setan</strong></span>
      </div>
    </div>

    <div class="body-text-sm" style="margin-top:16px;">
      Seluruh proses ini terjadi sebelum kamu sempat "berpikir". Bukan karena kamu tidak kompeten — tapi karena sistemmu bekerja persis seperti yang dirancang evolusi.
    </div>

    <div class="body-text-sm">
      Yang membedakan profesional berpengalaman bukan bahwa mereka tidak mengalami amygdala hijack. Mereka tahu cara memutus siklus ini sebelum menjadi spiral.
    </div>
  </div>

  <div class="page-footer">
    <span class="page-footer-text">NEURO DAILY · Brain Science for Your Career</span>
    <span class="page-footer-text">Free Sample</span>
  </div>
</div>


<!-- ============================================================
     PAGE 5 — THE HACKS
============================================================ -->
<div class="page">
  <div class="page-header">
    <div class="logo">
      <div class="logo-mark" style="width:28px;height:28px;">
        <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;">
          <circle cx="12" cy="12" r="3" fill="#1B3A2F"/>
          <circle cx="6" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="8" r="2" fill="#1B3A2F"/>
          <circle cx="6" cy="16" r="2" fill="#1B3A2F"/>
          <circle cx="18" cy="16" r="2" fill="#1B3A2F"/>
          <line x1="12" y1="12" x2="6" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="8" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="6" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="18" y2="16" stroke="#1B3A2F" stroke-width="1.5"/>
        </svg>
      </div>
      <span class="logo-text">NEURO DAILY</span>
    </div>
    <span class="page-number">05 / 06</span>
  </div>

  <div class="page-content" style="padding-top: 36px;">
    <div class="section-label">3 STRATEGI BERBASIS RISET</div>

    <div class="section-headline" style="font-size:30px; margin-bottom:12px;">Cara Memutus Amygdala Hijack</div>

    <div class="page5-intro">
      Ketiga strategi berikut bukan tips motivasi. Masing-masing memiliki mekanisme neurologis yang jelas mengapa cara ini bekerja.
    </div>

    <div class="hack-card">
      <div class="hack-header">
        <span class="hack-number">01</span>
        <span class="hack-title">"Physiological Sigh"</span>
      </div>
      <div class="hack-subtitle">Aktivasi Parasympathetic dalam 30 Detik</div>
      <div class="hack-body">
        Tarik napas dua kali melalui hidung (inhale pendek, lalu inhale lagi untuk memaksimalkan kapasitas paru), kemudian hembuskan perlahan melalui mulut selama 8 detik. Teknik ini — diteliti oleh <strong style="color:#fff;">Stanford Neuroscience Lab</strong> — terbukti mengaktifkan sistem parasympathetic lebih cepat dari teknik pernapasan lainnya. Amygdala tidak bisa tetap dalam mode alarm ketika sistem parasympathetic aktif.
      </div>
      <div class="hack-usage">
        <span class="hack-usage-label">Cara Pakai</span>
        <span class="hack-usage-text">Lakukan 2 kali sebelum masuk ruang presentasi, atau di tengah presentasi saat merasa panik.</span>
      </div>
    </div>

    <div class="hack-card">
      <div class="hack-header">
        <span class="hack-number">02</span>
        <span class="hack-title">"Affect Labeling"</span>
      </div>
      <div class="hack-subtitle">Namai Emosinya, Kurangi Intensitasnya</div>
      <div class="hack-body">
        Penelitian dari <strong style="color:#fff;">UCLA (Lieberman et al., 2007)</strong> menemukan bahwa sekadar memberi nama pada emosi yang dirasakan — secara verbal atau dalam pikiran — mengurangi aktivitas amygdala secara signifikan. Bukan menekan emosi, tapi mengakuinya: "Saya nervous" atau "Ini terasa mengancam." Ketika prefrontal cortex terlibat untuk memberi label, ia mengambil kembali sebagian kendali.
      </div>
      <div class="hack-usage">
        <span class="hack-usage-label">Cara Pakai</span>
        <span class="hack-usage-text">Di momen blank, bisikkan dalam pikiran: "Ini amygdala hijack. Saya nervous. Itu normal."</span>
      </div>
    </div>

    <div class="hack-card">
      <div class="hack-header">
        <span class="hack-number">03</span>
        <span class="hack-title">"Over-prepare the First 30 Seconds"</span>
      </div>
      <div class="hack-subtitle">Turunkan Threshold Ancaman di Momen Kritis</div>
      <div class="hack-body">
        Amygdala paling aktif di momen pertama exposure. Setelah 20–30 detik pertama, kadar kortisol mulai turun jika tidak ada "ancaman nyata." Artinya: hafal kalimat pembuka sampai bisa diucapkan dalam kondisi apapun. Bukan slide-nya — kalimat pertama yang keluar dari mulutmu.
      </div>
      <div class="hack-usage">
        <span class="hack-usage-label">Cara Pakai</span>
        <span class="hack-usage-text">Latih 10 kalimat pertama presentasi sampai otomatis. Sisanya bisa lebih fleksibel.</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span class="page-footer-text">NEURO DAILY · Brain Science for Your Career</span>
    <span class="page-footer-text">Free Sample</span>
  </div>
</div>


<!-- ============================================================
     PAGE 6 — CTA
============================================================ -->
<div class="page cta-page" style="position:relative;">
  <div class="page-content" style="display:flex; flex-direction:column; align-items:center; text-align:center; padding:56px 64px; justify-content:center; gap:0; flex:1;">

    <div class="ends-here-label">✦ FREE SAMPLE ENDS HERE</div>

    <div class="cta-headline">
      Ini baru <em>1 dari 7</em> mekanisme otak yang mempengaruhi performa kerjamu.
    </div>

    <div class="cta-body">
      Di Brain Kit for Work, kamu akan menemukan 6 mekanisme lainnya — Multitasking Illusion, Meeting Fatigue, Dopamine & Prokrastinasi, Decision Fatigue, Deep Work, dan Cognitive Energy Management — masing-masing dengan penjelasan neurosains dan strategi konkret yang bisa langsung dipraktikkan.
    </div>

    <div class="product-card">
      <div class="product-card-title">BRAIN KIT FOR WORK</div>
      <div class="product-card-sub">Panduan Neurosains untuk Performa Kerja</div>
      <div class="product-card-specs">
        <div class="spec-item">
          <span class="spec-value">42</span>
          <span class="spec-label">Halaman</span>
        </div>
        <div style="width:1px; background:rgba(255,255,255,0.15);"></div>
        <div class="spec-item">
          <span class="spec-value">7</span>
          <span class="spec-label">Bab</span>
        </div>
        <div style="width:1px; background:rgba(255,255,255,0.15);"></div>
        <div class="spec-item">
          <span class="spec-value">∞</span>
          <span class="spec-label">Insight</span>
        </div>
      </div>
      <div class="price-tag">IDR 49.000</div>
      <div class="price-sub">Sekali bayar · Akses selamanya</div>
    </div>

    <div class="cta-button">Dapatkan Brain Kit for Work Lengkap →</div>

    <div class="cta-url">lynk.id/neurodaily/jjvy4o31zpvl</div>

    <div class="cta-footer">
      NEURO DAILY · Brain Science for Your Career · @neurodaily.id
    </div>
  </div>
</div>

</body>
</html>`;

(async () => {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123 });

  console.log('Setting content...');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('Waiting for fonts to load...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  const outputPath = '/Users/ahmadfauzanazhim/Neuro Daily/Product/Product 1/Free Sample - Amygdala Hijack.pdf';

  console.log('Generating PDF...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('PDF saved to:', outputPath);
})();
