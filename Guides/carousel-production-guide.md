# Neuro Daily — Carousel Production Guide
*Panduan teknis untuk memproduksi konten carousel HTML · Versi 2.0*  
*Terakhir diperbarui: 11 Mei 2026*

---

## 1. Ringkasan Workflow

```
Brief konten → Tulis slide copy → Build HTML → Preview → Revisi layout → Export PNG → Simpan ke Carousel/
```

Setiap carousel adalah satu file HTML self-contained yang berisi semua slide. Export ke PNG dilakukan via Puppeteer + Chrome headless.

---

## 2. Folder & File Naming Convention

```
Neuro Daily/
└── Carousel/
    └── [nomor] - [Judul Singkat]/
        ├── Neuro Daily Carousel - [Judul Singkat].html
        └── Exports/
            ├── slide-01.png
            ├── slide-02.png
            └── ...
```

**Aturan penamaan:**
- Nomor urut 2 digit (01, 02, ... 31, 32, ...)
- Judul singkat dalam format Title Case
- File HTML: `Neuro Daily Carousel - [Judul Singkat].html`
- Export PNG: `slide-01.png` s/d `slide-07.png` (atau sesuai jumlah slide)

**Contoh aktual:**
```
Carousel/31 - Tidur Ideal/
├── Neuro Daily Carousel - Tidur Ideal.html
└── Exports/
    ├── slide-01.png ... slide-07.png
```

---

## 3. Design System

### 3.1 Color Palette

```css
:root {
  --forest:    #0D2E28;   /* bg slide gelap */
  --teal:      #1A6B5A;   /* bg slide teal */
  --green:     #5EC9A7;   /* accent hijau */
  --parchment: #F5F3EE;   /* bg slide terang, teks utama di gelap */
  --amber:     #C9A96E;   /* italic/emphasis, ghost element */
  --red:       #D96A6A;   /* negatif, bahaya, strikethrough */
}
```

**Background per slide** — variasikan antara tiga jenis:
- `bg-dark` → `--forest` (slide nomor ganjil umumnya)
- `bg-light` → `--parchment` (slide nomor genap umumnya)
- `bg-teal` → `--teal` (slide konsep teknis / definisi)

### 3.2 Typography

| Peran | Font | Weight | Usage |
|-------|------|--------|-------|
| Heading utama (H1/H2) | DM Serif Display | Regular + Italic | Judul utama setiap slide |
| Body text | DM Sans | Light (300) | Deskripsi, body copy |
| Sub-heading | DM Sans | Medium (500) | Label card, sub-judul |
| Labels & metadata | JetBrains Mono | Regular | Eyebrow, footer, ticks, kode |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 3.3 Canvas & Viewport

- **Canvas size:** 1080 × 1350 px (rasio 4:5 — format Instagram/TikTok portrait)
- **Preview size:** `min(540px, 94vw)` wide dengan `aspect-ratio: 4/5`
- **Scale method:** `.cvs { transform: scale(viewport_width / 1080) }`
- **Export output:** 1080 × 1350 px (via deviceScaleFactor: 2 pada viewport 540px)

---

## 4. HTML Architecture

### 4.1 Struktur Dasar

```html
<body>
  <!-- Topbar (hanya preview, disembunyikan saat export) -->
  <div class="topbar">
    <span>Neuro Daily · [Judul]</span>
    <span class="pill">[ Vol. [X] · [Tema] ]</span>
  </div>

  <!-- Stage: wrapper carousel -->
  <div class="stage">
    <div class="viewport">
      <div class="track" id="track">
        <!-- Slide 1...N -->
        <section class="slide">
          <div class="cvs bg-[dark|light|teal] s[1-N]">
            <div class="head">...</div>
            <div class="body">...</div>
            <div class="foot">...</div>
          </div>
        </section>
      </div>
    </div>
    <div class="dots" id="dots"></div>
  </div>

  <!-- Caption panel (hanya preview) -->
  <div class="caption-panel">...</div>

  <!-- Navigation controls (disembunyikan saat export) -->
  <div class="controls">
    <button id="prev">‹</button>
    <span class="counter" id="counter">1 / N</span>
    <button id="next">›</button>
  </div>

  <script>/* carousel navigation JS */</script>
</body>
```

### 4.2 Anatomi Satu Slide

```
┌─────────────────────────────────────────────────┐
│  HEAD (78px) — header bar dengan border-bottom   │
│  ◆ [BREADCRUMB LABEL]        EDISI · MEI 2026   │
├─────────────────────────────────────────────────┤
│  BODY (78px–1286px) — konten utama               │
│  padding: 52px 72px                              │
│                                                  │
│  · eyebrow (JetBrains Mono, 17px uppercase)      │
│  · rule (opsional, 48px × 3px colored bar)       │
│  · H1/H2 (DM Serif Display, 66–92px)             │
│  · visual element (SVG, bars, cards, dll)        │
│  · supporting copy                               │
│                                                  │
├─────────────────────────────────────────────────┤
│  FOOT (64px) — footer bar dengan border-top      │
│  neurodaily.id     01 / 07       [logo SVG]     │
└─────────────────────────────────────────────────┘
```

### 4.3 CSS Classes Penting

```css
/* Wrapper canvas per slide */
.cvs { width: 1080px; height: 1350px; transform-origin: top left; position: absolute; }

/* Body area */
.body { position: absolute; top: 78px; bottom: 64px; left: 0; right: 0;
        padding: 52px 72px; display: flex; flex-direction: column; }

/* Eyebrow */
.eyebrow { font-family: 'JetBrains Mono'; font-size: 17px; letter-spacing: .18em;
           text-transform: uppercase; }
/* Rule line (3px colored bar di bawah eyebrow) */
.rule { width: 48px; height: 3px; border-radius: 2px; margin-top: 18px; }
```

---

## 5. Layout Principles (v2 Standard)

Ini adalah aturan spacing yang sudah divalidasi melalui revisi Figma. **Gunakan nilai ini sebagai default.**

### 5.1 Heading Font Sizes per Slide Type

| Slide | Font Size | margin-top | max-width |
|-------|-----------|------------|-----------|
| Hook (S1) | 92px | 56px | 800px |
| Data/Chart (S2, S3) | 66–68px | 40–50px | 900px |
| Definisi/Teal (S4) | 64px | 50px | 900px |
| Comparison (S5) | 66px | 44px | 900px |
| Formula/Konsep (S6) | 70px | 44px | 900px |
| CTA (S7) | 70px | 44px | 900px |

### 5.2 Gap antara Heading dan Visual Element

| Jenis elemen | Gap (margin-top) |
|-------------|------------------|
| Age bars / chart sederhana | 80–88px |
| Calendar / dual column | 56–64px |
| Term card | 40px |
| Formula blocks | 64px |
| Scenario cards | 64px |
| Discussion items | 44px |

### 5.3 Prinsip Whitespace

- **Content tidak harus mengisi full height.** Slide boleh punya banyak ruang kosong di bawah.
- **Gunakan `margin-top: auto` hanya untuk elemen yang memang harus push ke bawah** (source note, brand signoff).
- **Jangan gunakan `flex: 1` pada grid visual** — biarkan tinggi natural.
- **Eyebrow lebih dekat ke header** (padding body: 52px, bukan 64px).

### 5.4 Slide 1 (Hook) — Special Rules

- Ghost element (angka besar, opacity ~0.09) di posisi `right: -60px; top: -60px`
- Scale/chart visual selalu di `position: absolute; bottom: 100px`
- Heading 3 baris: line 1 regular, line 2+ italic amber dengan `<br>` eksplisit
- Lead text langsung setelah heading dengan `margin-top: 36px`

### 5.5 Slide 7 (CTA) — Special Rules

- Tidak ada brand signoff (`.signoff { display: none }`)
- Tidak ada dekorasi Z (`.zzz` dihapus atau disembunyikan)
- Konten berakhir di shift-note, whitespace besar di bawah

---

## 6. Visual Elements Library

### 6.1 Zone Scale (untuk data range)

SVG `viewBox="0 0 936 190"` dengan:
- Track background: `fill="rgba(245,243,238,.04)" stroke="rgba(245,243,238,.09)"`
- Zona merah (deficit): fill merah, opacity .16
- Zona optimal: fill hijau, opacity .18 + stroke hijau border
- Label atas zona: JetBrains Mono 13px
- Label dalam zona: DM Serif Display italic untuk "Optimal"

Digunakan di: Hook slide (S1), slide perbandingan data

### 6.2 Horizontal Bar Chart (per kategori)

```html
<div class="age-section">  <!-- margin-top: 88px dari heading -->
  <div class="age-row">
    <div class="lbl">Label kategori</div>  <!-- width: 168px -->
    <div class="bar-track">               <!-- flex: 1 -->
      <div class="bar-opt" style="left: X%; width: Y%"></div>
    </div>
    <div class="bar-range">X–Y jam</div>  <!-- width: 68px -->
  </div>
  <div class="age-scale">
    <div class="spacer"></div>
    <div class="ticks">
      <span>4h</span> ... <span class="hi">7h</span> ...
    </div>
  </div>
</div>
```

**Kalkulasi posisi bar (scale 4h–12h = 8h total):**
- `left = (jam_mulai - 4) / 8 * 100 %`
- `width = durasi_jam / 8 * 100 %`

### 6.3 Dual Column Calendar (jadwal mingguan)

```html
<div class="cal-wrap">  <!-- display: grid, 2 kolom, margin-top: 60px -->
  <div class="cal-col bad">
    <div class="cal-head"><span class="stamp">Acak</span><span class="title">Jadwal Berubah</span></div>
    <div class="day-row">
      <span class="day-label">Sen</span>
      <div class="day-track"><div class="day-fill va" style="left:16.7%;width:66.7%"></div></div>
      <span class="day-time">23:00–07:00</span>
    </div>
    <!-- ...7 hari -->
  </div>
  <div class="cal-col good"><!-- sama, semua fill konsisten --></div>
</div>
<div class="legend">...</div>  <!-- margin-top: 28px, bukan auto -->
```

**Timeline: 21:00–09:00 = 12 jam**
- `left = (jam - 21 + 24) % 24 / 12 * 100 %` (untuk jam pasca tengah malam)
- `width = durasi_jam / 12 * 100 %`

**Fill colors:** `.va` = merah solid, `.vb` = merah medium, `.vc` = amber, `.cons` = hijau

### 6.4 Circadian Wave (SVG path approximation)

SVG `viewBox="0 0 936 210"` — 24 jam = 936px, 1 jam = 39px.

Key x-coordinates:
```
00:00=0, 02:00=78, 04:00=156, 06:00=234, 08:00=312,
10:00=390, 12:00=468, 14:00=546, 16:00=624, 18:00=702,
21:00=819, 22:00=858, 24:00=936
```

Wave path (alertness — tinggi = alert, rendah = mengantuk):
```svg
<path d="M0,118 C39,124 78,144 156,163 C195,170 215,162 234,138 
         C270,95 312,36 390,24 C429,18 468,26 507,42 
         C546,58 566,72 585,56 C622,32 660,24 702,36 
         C742,52 780,90 819,128 C850,155 897,150 936,140"
  stroke="rgba(94,201,167,.88)" stroke-width="3" fill="none"/>
```

Sleep zone shading: `x=0 width=156` (00:00–04:00) dan `x=858 width=78` (22:00–24:00)

Anotasi wajib: CORTISOL ↑ (x=312), MELATONIN ↑ (x=819)

### 6.5 Formula Blocks (stacked)

```html
<div class="formula">
  <div class="f-block a">  <!-- border hijau -->
    <div class="f-icon"><!-- SVG icon --></div>
    <div>
      <div class="f-val">≥ 7 jam</div>
      <div class="f-desc">Deskripsi singkat.</div>
    </div>
  </div>
  <div class="f-op">+</div>  <!-- opacity .25, font 40px -->
  <div class="f-block b">  <!-- border amber -->...</div>
  <div class="f-op" style="opacity:.2;font-size:38px;">━━━━━━</div>
  <div class="f-block result">  <!-- border hijau lebih solid -->...</div>
</div>
<div class="f-note">  <!-- JetBrains Mono, centered, margin-top: 28px -->
  Bukan pilih A <em>atau</em> B — <span class="punch">keduanya perlu.</span>
</div>
```

### 6.6 Scenario Comparison Cards

```html
<div class="scenarios">  <!-- grid 2 col, gap 26px -->
  <div class="scenario bad">
    <span class="s-stamp">Skenario A</span>
    <div class="s-number">8h</div>
    <div class="s-label">Label singkat</div>
    <div class="s-desc">Deskripsi situasi.</div>
    <div class="s-result">→ Hasil/dampak.</div>
  </div>
  <div class="scenario good">
    <!-- sama, warna teal -->
  </div>
</div>
<div class="research-note">  <!-- margin-top: 28px -->
  <strong>Riset pendukung:</strong> ...
</div>
```

---

## 7. Slide Navigation JavaScript

Paste JavaScript ini di akhir `<body>`, tidak perlu dimodifikasi:

```javascript
const track=document.getElementById('track'),dotsEl=document.getElementById('dots'),
      counter=document.getElementById('counter'),prevBtn=document.getElementById('prev'),
      nextBtn=document.getElementById('next');
const total=track.children.length;let i=0;
function scaleCanvases(){
  document.querySelectorAll('.slide').forEach(s=>{
    const c=s.querySelector('.cvs');if(!c)return;
    c.style.transform=`scale(${s.clientWidth/1080})`;
  });
}
window.addEventListener('resize',scaleCanvases);scaleCanvases();
for(let k=0;k<total;k++){const b=document.createElement('button');
  b.className='dot'+(k===0?' active':'');b.addEventListener('click',()=>go(k));
  dotsEl.appendChild(b)}
const dots=[...dotsEl.children];
function go(n){i=Math.max(0,Math.min(total-1,n));
  track.style.transform=`translateX(-${i*100}%)`;
  dots.forEach((d,k)=>d.classList.toggle('active',k===i));
  counter.textContent=`${i+1} / ${total}`;
  prevBtn.disabled=i===0;nextBtn.disabled=i===total-1}
prevBtn.addEventListener('click',()=>go(i-1));
nextBtn.addEventListener('click',()=>go(i+1));
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1)});
let sx=0,dx=0,drag=false;const vp=document.querySelector('.viewport');
vp.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;drag=true;dx=0},{passive:true});
vp.addEventListener('touchmove',e=>{if(!drag)return;dx=e.touches[0].clientX-sx},{passive:true});
vp.addEventListener('touchend',()=>{if(!drag)return;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));drag=false});
go(0);
```

---

## 8. Export Workflow (Puppeteer)

### 8.1 Script Export (`/tmp/export-carousel.js`)

```javascript
const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML   = 'file:///Users/ahmadfauzanazhim/Neuro%20Daily/Carousel/[N]%20-%20[Judul]/Neuro%20Daily%20Carousel%20-%20[Judul].html';
const OUT    = '/Users/ahmadfauzanazhim/Neuro Daily/Carousel/[N] - [Judul]/Exports';
const SLIDES = 7; // sesuaikan jumlah slide

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  // 2× device scale → 1080×1350 px output
  await page.setViewport({ width: 540, height: 675, deviceScaleFactor: 2 });
  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000)); // tunggu fonts

  // Sembunyikan elemen chrome (nav, dots, topbar, caption)
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
})();
```

### 8.2 Cara Menjalankan

```bash
# Script canonical ada di _Tools/ — puppeteer-core sudah terinstall via node_modules di sana
# Edit HTML path dan OUT path di script sesuai nomor carousel, lalu:
node "_Tools/export-carousel-v2.js"

# Atau tetap bisa pakai dari /tmp (puppeteer-core terinstall di /tmp/node_modules):
node /tmp/export-carousel.js
```

**Dependency:** `puppeteer-core` tersedia di `_Tools/node_modules/` dan `/tmp/node_modules/`, Google Chrome di `/Applications/Google Chrome.app/`

### 8.3 Output Specs

| Parameter | Nilai |
|-----------|-------|
| Format | PNG |
| Resolusi | 1080 × 1350 px |
| Device scale | 2× (retina) |
| Ukuran file tipikal | 80–150 KB per slide |

---

## 9. Proses Produksi End-to-End

### Step 1 — Siapkan Konten
Tulis copy per slide di Markdown (lihat `sosial media report/TikTok/konten_[topik].md`) dengan format:
```
SLIDE 1 (Hook): ...
SLIDE 2: ...
...
CAPTION TIKTOK: ...
CAPTION INSTAGRAM: ...
CAPTION THREADS: ...
```

### Step 2 — Build HTML
1. Tentukan nomor carousel berikutnya (cek `Carousel/` folder)
2. Copy template v2 atau buat fresh dari CSS base di guide ini
3. Pilih background sequence: dark → light → dark → teal → light → dark → light (tipikal 7 slide)
4. Isi konten per slide sesuai template yang relevan
5. Preview di browser, navigasi dengan arrow key

### Step 3 — Revisi Layout (jika perlu)
- Jika ada elemen yang terlalu rapat: naikkan margin-top sesuai tabel Section 5.2
- Jika heading terlalu kecil: ikuti font size di tabel Section 5.1
- Buat `v2` sebagai duplicate sebelum revisi besar (jangan overwrite v1)

### Step 4 — Export
1. Buat folder `Carousel/[N] - [Judul]/Exports/`
2. Copy HTML ke dalam folder carousel
3. Jalankan export script
4. Verifikasi 2–3 slide dari hasil PNG

### Step 5 — Simpan Konten Report
Update file evaluasi di `sosial media report/TikTok/` jika konten ini merupakan follow-up dari post yang sudah viral.

---

## 10. Referensi File

| File | Lokasi | Fungsi |
|------|--------|--------|
| Template terbaik (v2) | `Carousel/31 - Tidur Ideal/Neuro Daily Tidur Ideal v2.html` | Base untuk carousel baru |
| Export script canonical | `_Tools/export-carousel-v2.js` | Puppeteer export (template) |
| Brand guidelines | `Brand/neuro-daily-brand-guidelines-v2.1.md` | Warna, tone, persona |
| Content strategy | `Guides/content-strategy-v1.md` | Format konten, hook formula |
| Content bank | `Brand/neuro-daily-content-bank-v2.md` | Topik yang sudah ada |
| Content calendar | `neuro-daily-content-calendar.xlsx` | Jadwal posting |
| Contoh carousel terbaik | `Carousel/31 - Tidur Ideal/` | Reference output |

---

## 11. Hal yang Harus Dihindari

- **Jangan stretch konten ke full height** — whitespace di bawah itu oke dan bagus
- **Jangan pakai `flex: 1` pada visual element** — biarkan tinggi alami
- **Jangan gunakan `margin-top: auto` pada legend/supporting element** — push ke bawah akan terlihat terlalu jauh
- **Jangan campurkan terlalu banyak warna dalam satu slide** — maksimal 2 accent warna
- **Jangan buat heading satu baris panjang** — gunakan `<br>` eksplisit untuk kontrol line-break yang baik
- **Jangan lupa sembunyikan `.controls`, `.dots`, `.topbar`, `.caption-panel` saat export**

---

## 12. LARANGAN KERAS — Export Script

> ⚠️ **JANGAN pernah menulis export script baru dari nol untuk setiap carousel.**

Selalu salin dan edit `_Tools/export-carousel-v2.js`. Hanya boleh mengubah 3 variabel:
```
const HTML   = 'file:///...path ke carousel baru...'
const OUT    = '/...path Exports/ carousel baru...'
const SLIDES = 7  // sesuaikan jumlah slide
```

**Puppeteer require wajib:**
```javascript
const puppeteer = require('/Users/ahmadfauzanazhim/Neuro Daily/_Tools/node_modules/puppeteer-core');
```

**Empat aturan export yang TIDAK BOLEH diubah:**
1. `viewport: { width: 540, height: 675, deviceScaleFactor: 2 }` — BUKAN 1080×1350
2. Hide `.controls, .dots, .topbar, .caption-panel` sebelum screenshot
3. Navigate pakai `go(idx)` — BUKAN `click('#next')`
4. Screenshot target `.viewport` — BUKAN `.cvs` atau elemen lain

---

*Guide ini dibuat berdasarkan produksi `Carousel/31 - Tidur Ideal/` dan revisi Figma feedback.*
