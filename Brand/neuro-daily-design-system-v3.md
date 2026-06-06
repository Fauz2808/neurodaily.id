# Neuro Daily — Design System v3
## Visual Language dari Carousel 38–39 (Mei 2026)

> **Gunakan dokumen ini sebagai referensi utama sebelum membuat desain apapun.**
> Brand lama (Playfair Display / Inter / #1B3A2F) sudah deprecated dan tidak boleh digunakan.

---

## 1. Prinsip Desain

Neuro Daily bukan brand motivasi. Ia adalah brand sains. Visual language-nya harus mencerminkan:

- **Presisi** — bukan dekorasi berlebihan
- **Kedalaman** — hierarki informasi yang jelas, tidak semua sama penting
- **Editorial** — terasa seperti jurnal ilmiah yang bisa dibaca manusia biasa
- **Restraint** — whitespace adalah bagian dari desain, bukan kekosongan

Setiap elemen yang ditambahkan harus punya alasan. Jika tidak perlu, jangan tambahkan.

---

## 2. Color Palette

```css
:root {
  --forest:    #0D2E28;   /* Background utama — dark slides */
  --teal:      #1A6B5A;   /* Background mid-tone — teal slides */
  --green:     #5EC9A7;   /* Accent primer: eyebrow, rule, highlight */
  --parchment: #F5F3EE;   /* Background light — light slides & teks on dark */
  --amber:     #C9A96E;   /* Italic emphasis, angka penting, CTA */
  --red:       #D96A6A;   /* Warning, negatif, stres, bahaya */
}
```

### Penggunaan per background:

| Background | Eyebrow & Rule | Italic `<em>` headline | Border cards |
|---|---|---|---|
| `.bg-dark` (#0D2E28) | `--green` | `--amber` | rgba(245,243,238, .12) |
| `.bg-light` (#F5F3EE) | `--teal` | `--teal` | rgba(13,46,40, .12) |
| `.bg-teal` (#1A6B5A) | `--amber` | `--amber` | rgba(245,243,238, .18) |

### Card accent colors (alpha values):

```
Green card:   bg rgba(94,201,167, .08)  + border rgba(94,201,167, .22)
Amber card:   bg rgba(201,169,110,.08)  + border rgba(201,169,110,.22)
Red card:     bg rgba(217,106,106,.06)  + border rgba(217,106,106,.20)
Neutral dark: bg rgba(245,243,238,.05)  + border rgba(245,243,238,.12)
White semi:   bg rgba(255,255,255,.50)  + border rgba(13,46,40,  .10)
```

---

## 3. Typography

### Font Stack

```
Google Fonts import:
family=DM+Serif+Display:ital@0;1
&family=DM+Sans:wght@300;400;500;600;700
&family=JetBrains+Mono:wght@400;500
```

### Tiga Peran Font:

| Font | Peran | Karakter |
|---|---|---|
| **DM Serif Display** | Headline, angka besar, display | Otoritatif, hangat, editorial |
| **DM Sans** | Body text, deskripsi, semua teks non-label | Bersih, mudah dibaca, modern |
| **JetBrains Mono** | Eyebrow, label, footer, kode, source | Presisi, ilmiah, technical |

### Type Scale (di canvas 1080×1350px):

```
H1 Hook:         DM Serif Display  92px   weight 400   line-height 1.02   letter-spacing -0.02em
H2 Content:      DM Serif Display  64–70px weight 400  line-height 1.06   letter-spacing -0.02em
Display number:  DM Serif Display  64–88px —            line-height 1.0    letter-spacing -0.03em
Lead text:       DM Sans           22px   weight 300   line-height 1.65   opacity 0.70–0.72
Body text:       DM Sans           17–19px weight 300  line-height 1.55–1.65
Card title:      DM Sans           16–18px weight 500  line-height 1.3
Card desc:       DM Sans           14–15px weight 300  line-height 1.55–1.60
Eyebrow:         JetBrains Mono    17–18px weight 400  letter-spacing 0.18em  UPPERCASE
Head/foot label: JetBrains Mono    18px   weight 400  letter-spacing 0.12em  UPPERCASE  opacity 0.55
Source/note:     JetBrains Mono    13–15px weight 400  letter-spacing 0.04–0.06em
```

### Rules italic emphasis:
- `<em>` di dalam headline **selalu** italic DM Serif Display
- Warna `<em>` mengikuti accent color background (amber on dark/teal, teal on light)
- Jangan gunakan bold untuk headline — DM Serif Display weight 400 sudah kuat tanpa bold

---

## 4. Canvas & Layout (Carousel)

### Spesifikasi canvas:
```
Width:   1080px
Height:  1350px
Ratio:   4:5 (Instagram/TikTok standard)
```

### Struktur slide (3 zona wajib):

```
┌──────────────────────────────────────────────────────────┐
│  HEAD — height: 78px, padding: 0 64px                    │
│  border-bottom: 1px solid rgba(...)                       │
│  font: JetBrains Mono 18px, UPPERCASE, letter-spacing .12em│
│  Left: ◆ Topic · Subtopic    Right: Edisi · Bulan Tahun  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  BODY — top: 78px, bottom: 64px                          │
│  padding: 52px 72px                                      │
│  display: flex, flex-direction: column                   │
│                                                          │
│  [eyebrow]                                               │
│  [rule]                                                  │
│  [headline]                                              │
│  [content area]                                          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  FOOT — height: 64px, padding: 0 64px                    │
│  border-top: 1px solid rgba(...)                         │
│  Left: neurodaily.id    Center: XX/07    Right: [brain]  │
└──────────────────────────────────────────────────────────┘
```

### Body padding rules:
- Horizontal: **72px** dari kiri dan kanan
- Vertical (top, bottom di dalam body): **52px**
- Jaga minimum 52px clearance dari elemen ke batas body

---

## 5. Sequence Slide (Template 7 Slide)

Urutan background baku yang memberi visual rhythm:

```
Slide 1 — bg-dark    Hook / pertanyaan / masalah relatable
Slide 2 — bg-light   Data ilmiah / riset / bukti
Slide 3 — bg-dark    Mekanisme / penjelasan mengapa
Slide 4 — bg-teal    Nama konsep / definisi / istilah
Slide 5 — bg-light   Skenario / perbandingan / dua kondisi
Slide 6 — bg-dark    Formula / solusi / teknik
Slide 7 — bg-light   CTA / diskusi / ajakan action
```

Aturan penting:
- Dua slide gelap tidak berturut-turut jika bisa dihindari
- Slide teal hanya sekali per carousel — pakai untuk "definisi kunci"
- Slide terakhir selalu light — lebih hangat untuk CTA

---

## 6. Elemen Eyebrow + Rule

```css
/* Eyebrow */
.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Rule — selalu tepat di bawah eyebrow */
.rule {
  width: 48px;
  height: 3px;
  border-radius: 2px;
  margin-top: 18px;
}
```

### Simbol prefix eyebrow yang digunakan:
```
⚡  → High-urgency, survival response
◆   → Call to action, closing
◇   → Riset / data ilmiah
↺   → Konteks / kenapa terjadi
○   → Definisi / nama konsep
↔   → Perbandingan / dua sisi
≡   → Formula / solusi / daftar
→   → Arah / implikasi
```

---

## 7. Ghost Character (Dekoratif)

Elemen tipografi besar yang transparan di belakang konten — memberi kedalaman tanpa distraksi.

```css
.ghost {
  position: absolute;
  font-family: 'DM Serif Display', serif;
  font-size: 680–1040px;    /* sangat besar */
  line-height: 0.78–0.9;
  color: rgba(201,169,110, 0.07–0.08);  /* amber sangat faint */
  pointer-events: none;
  user-select: none;
  right: -40 to -80px;      /* bleeding ke kanan */
  top: -80 to 20px;
}
```

Pakai untuk: angka bab, tanda tanya (?), angka chapter, karakter kunci topik.
Jangan pakai di setiap slide — cukup slide 1 (hook) dan slide yang butuh "ruang".

---

## 8. Komponen Kartu

### Data Card (light bg):
```css
.data-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 22px;
  border-radius: 12px;
  background: rgba(255,255,255, 0.55);
  border: 1px solid rgba(13,46,40, 0.10);
}
/* Number: DM Serif 36px, warna accent */
/* Title: DM Sans 16px weight 500 */
/* Text: DM Sans 15px weight 300, opacity 0.65 */
```

### Reason Card (dark bg):
```css
.reason-card {
  padding: 26px 28px;
  border-radius: 14px;
}
/* Label: JetBrains Mono 13px, letter-spacing .18em, UPPERCASE */
/* Text: DM Sans 18px weight 300, opacity .85 */
/* Warna: pilih dari green/amber/red sesuai sentiment */
```

### Scenario Card (perbandingan 2 kolom):
```css
.scenarios { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
.scenario {
  padding: 28px 26px 24px;
  border-radius: 16px;
  position: relative;  /* untuk badge absolute */
}
/* Badge: absolute, top: -13px, JetBrains Mono, background solid */
/* Number besar: DM Serif 74px */
/* bad → red (#D96A6A), good → teal (#1A6B5A) */
```

### Spec / Stats Grid (2×2):
```css
.specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.spec-card { padding: 24px 26px; border-radius: 14px; }
/* Angka: DM Serif 72px */
/* Label: JetBrains Mono 12px UPPERCASE opacity .60 */
/* Desc: DM Sans 15px weight 300 opacity .65 */
```

### Formula Block (vertikal):
```css
.f-block {
  padding: 26px 32px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 22px;
}
/* Icon container: 54×54px, border-radius 12px */
/* Value: DM Serif 34px */
/* Desc: DM Sans 16px weight 300 opacity .72 */
/* Operator (+/=): DM Serif 40px, opacity .25 */
```

### Proto Item (icon + teks, untuk list solusi):
```css
.proto-item {
  display: flex;
  align-items: flex-start;
  gap: 22px;
  padding: 20px 24px;
  border-radius: 14px;
  border: 1.5px solid rgba(13,46,40, 0.10);
  background: rgba(255,255,255, 0.50);
}
/* Icon: 52×52px, border-radius 12px */
/* Title: DM Sans 18px weight 500 */
/* Desc: DM Sans 14px weight 300 opacity .58 */
```

---

## 9. Hippo Mark (Brain Logo di Footer)

Logo otak SVG minimal yang selalu muncul di pojok kanan footer. Ini identitas visual unik Neuro Daily.

```html
<span class="hippo-mark">
  <svg viewBox="0 0 32 32" fill="none" stroke="[accent-color]" stroke-width="1.6">
    <path d="M5 19c0-7 4-11 11-11 5 0 8 3 8 7 0 3-2 5-5 5-3 0-4 1.4-4 3.5 0 2 1.4 3.5 3.5 3.5"/>
    <circle cx="20" cy="12" r="1.4" fill="[accent-color]"/>
  </svg>
</span>
```

Warna stroke dan fill mengikuti accent color background:
- `.bg-dark` → `#5EC9A7` (green)
- `.bg-light` → `#1A6B5A` (teal)
- `.bg-teal` → `#C9A96E` (amber)

---

## 10. Head Structure

```html
<div class="head">
  <span class="dotmark">Neuro Daily · Vol. XX · [Kategori]</span>
  <span>Edisi · [Bulan Tahun]</span>
</div>
```

Dotmark prefix (`◆`) di-generate via CSS:
```css
.dotmark::before {
  content: "◆ ";
  color: var(--green);    /* dark bg */
  /* var(--teal) di light bg */
  /* var(--amber) di teal bg */
}
```

---

## 11. Border Radius System

```
Slide viewport:     18px
Card besar:         16–18px
Card medium:        12–14px
Card kecil/icon:    10–12px
Icon container:     12px
Pill/badge:         99px (fully rounded)
Rule accent:        2px
```

---

## 12. Source / Citation Style

Selalu ada di bottom body, sebelum footer:

```css
.source {
  margin-top: auto;      /* push ke bawah */
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  letter-spacing: 0.04em;
  color: var(--forest);   /* atau parchment on dark */
  opacity: 0.50;
  line-height: 1.60;
  border-top: 1px solid rgba(13,46,40, 0.10);
  padding-top: 18px;
}
```

Format: `→ Author et al. (Tahun) · Institusi · Jurnal`

---

## 13. Slide 1 Hook — Template

Hook yang kuat: pertanyaan yang langsung menohok, bukan deskripsi.

```
Eyebrow:  [simbol] [Konsep Utama] · [Sub-konsep]
Rule
Ghost:    [karakter besar faint di belakang]
H1:       [Pertanyaan relatable]
          [Sub-kalimat yang lebih kecil / penjelas]
Lead:     [Penjelasan 1-2 kalimat mengapa ini bukan masalah karakter]
Visual:   [SVG diagram sederhana di bottom — max 3-4 elemen]
```

Aturan headline hook:
- Mulai dari situasi yang dialami reader, bukan dari sains
- Kalimat pertama: masalah nyata (`"Susah bilang tidak di kantor?"`)
- Italic emphasis: kata kunci emosional atau saintifik
- Sub-kalimat: reduksi blame (`"Bukan soal kepribadian."`)

---

## 14. CTA Slide — Template

```
Eyebrow: ◆ [Ajakan langsung]
Rule
H2: [Pertanyaan spesifik ke reader]
Sub: [1 kalimat mengapa mereka perlu menjawab]

Discussion items (2-3):
  [icon] [Ajakan simpan/share/praktikkan]
  [icon] [Ajakan tag atau komentar]

Shift note (dashed border, italic arrow):
  → [Kalimat penutup yang reframing — bukan motivasi kosong]
```

---

## 15. Caption / Copywriting Style

```
Format caption TikTok/Instagram:

[Headline bold yang sama dengan hook slide]
[2-3 paragraf penjelasan singkat]
[Ajakan engagement spesifik]

#hashtag1 #hashtag2 ... (7-10 hashtag)
```

Tone: ilmiah tapi conversational. Hindari:
- "Kamu pasti bisa!" (motivasi kosong)
- Clickbait yang tidak substantif
- Jargon tanpa penjelasan

Gunakan:
- Nama riset/peneliti spesifik
- Angka konkret
- "Bukan soal X. Ini Y." (reframe format)

---

## 16. Asset Files

```
Logo utama:
  /Brand/Logo/Exports/PNG/C-01-avatar-forest.png     ← dark bg
  /Brand/Logo/Exports/PNG/D-05-mark-white.png        ← mark only, dark bg
  /Brand/Logo/Exports/PNG/A-01-horizontal-light.png  ← wordmark horizontal

Template carousel terbaru:
  /Carousel/39 - Nggak Enakan di Kantor/Neuro Daily Carousel - Nggak Enakan di Kantor.html
  /Carousel/38 - Brain Kit For Work Launch/Neuro Daily Carousel - Brain Kit For Work Launch.html

Product design reference:
  /Product/Product 1/lynkid-product-cover.html
  /Product/Product 1/free-sample-amygdala-hijack.html
```

---

## 17. SVG Visualisasi — Standar Font & Kontras

Setiap slide hook (Slide 1) menggunakan SVG sebagai visualisasi pendukung. Aturan berikut wajib diikuti — **jangan gunakan nilai di bawah minimum ini.**

### Font Size dalam SVG (atribut `font-size=""`)

```
Label utama / heading:     font-size="26" minimum
Teks deskripsi:            font-size="22" minimum
Label sekunder / caption:  font-size="20" minimum
```

> ❌ Dilarang: `font-size="11"`, `"12"`, `"13"`, `"14"`, `"15"`, `"16"`, `"17"`
> ✅ Minimum: `font-size="20"` untuk teks apapun dalam SVG

### Opacity / Kontras dalam SVG

```
Teks primer (label, heading):   opacity / alpha minimum 0.85
Teks sekunder (deskripsi):      opacity / alpha minimum 0.65
Teks tersier (caption bawah):   opacity / alpha minimum 0.55
```

> ❌ Dilarang: `fill="rgba(..., .35)"`, `fill="rgba(..., .4)"`, `fill="rgba(..., .45)"`
> ✅ Minimum: alpha `0.55` untuk teks apapun yang ingin dibaca user

### Batas Elemen dalam Satu Baris SVG

Jika terlalu banyak elemen dalam satu baris (lebih dari 3 box horizontal):
- **Sederhanakan** — gabungkan menjadi lebih sedikit elemen yang lebih besar
- Jangan paksakan banyak label kecil dalam satu viewBox sempit
- Prinsip: **lebih sedikit, lebih besar, lebih terbaca**

### ViewBox yang Cukup

Sesuaikan `viewBox` height dengan ukuran font baru. Contoh:
```
Font kecil lama (12px): viewBox="0 0 936 120"
Font besar baru (22px): viewBox="0 0 936 180"  ← tambah height
```

---

## 18. Checklist Sebelum Export

Sebelum export slide ke PNG/PDF, cek:

- [ ] Canvas 1080×1350px (bukan ukuran lain)
- [ ] Font: DM Serif Display + DM Sans + JetBrains Mono (bukan Playfair/Inter)
- [ ] Background hanya: #0D2E28 / #F5F3EE / #1A6B5A
- [ ] Italic `<em>` berwarna amber (on dark/teal) atau teal (on light)
- [ ] Head dan foot ada di setiap slide
- [ ] Hippo mark ada di footer kanan
- [ ] Slide counter format `XX / 07` ada di footer tengah
- [ ] Nomor slide sesuai urutan
- [ ] Eyebrow + rule ada di body (kecuali slide yang memang tidak perlu)
- [ ] Source/citation ada di slide data ilmiah
- [ ] Ghost character tidak menutupi teks penting
- [ ] Padding body minimum 52px dari tepi zona body
- [ ] **SVG font-size minimum 20** — tidak ada `font-size` di bawah 20 dalam SVG
- [ ] **SVG opacity minimum 0.55** — tidak ada alpha di bawah 0.55 untuk teks SVG
- [ ] **SVG tidak cramped** — jika lebih dari 3 elemen horizontal, sederhanakan

---

*Neuro Daily Design System v3 — Updated Mei 2026*
*Berdasarkan Carousel 38–46 + Perbaikan Readability SVG*
