# Video Clipper — Roadmap

## Ide
Pipeline otomatis potong long video jadi short clips (TikTok/Reels).
Built lokal di M1, pakai Whisper + Claude API + FFmpeg.

---

## Phase 1 — Pipeline Lokal ✅ (sekarang)
- [x] Build pipeline: Whisper → Claude scoring → FFmpeg 9:16
- [ ] Test dengan video Ryu Hassan
- [ ] Evaluate kualitas klip yang dihasilkan
- [ ] Fine-tune prompt Claude supaya pilihan momen makin viral

## Phase 2 — Testing di Neuro Daily
- [ ] Proses 5-10 video konten Neuro Daily
- [ ] Upload klip hasil pipeline ke TikTok & Reels
- [ ] Track engagement (views, likes, shares) vs konten manual
- [ ] Iterasi prompt & settings berdasarkan hasil

## Phase 3 — Web Version (MVP)
- [ ] Frontend: Next.js di Vercel (upload, progress, download)
- [ ] Backend: FastAPI di Railway (processing)
- [ ] Storage: Cloudflare R2 (simpan video)
- [ ] Ganti Whisper lokal → AssemblyAI API
- [ ] Beta test ke 3-5 kreator Indonesia

## Phase 4 — Produk & Monetisasi
- [ ] Landing page + pricing
- [ ] Sistem pembayaran (Stripe / Midtrans)
- [ ] Onboarding kreator Indonesia
- [ ] Target: ~50 user paying $10-20/bulan

## Pricing Plan
| Tier | Harga | Limit | Target User |
|---|---|---|---|
| Free | $0 | 3 klip/bulan | Coba-coba |
| Starter | $9/bulan | 60 menit video/bulan | Kreator pemula |
| Pro | $19/bulan | 300 menit video/bulan | Kreator aktif |
| Unlimited | $39/bulan | Unlimited | Agency / tim |

**Cost per user:** Claude API ~$0.05/video → sangat profitable di semua tier
**Benchmark:** OpusClip $19-49/bulan, Munch $49/bulan, Vizard $24/bulan
**Diferensiasi:** Lebih murah + fokus bahasa Indonesia

---

## Stack
| Komponen | Tool |
|---|---|
| Transkripsi | MLX Whisper (lokal) → AssemblyAI (web) |
| AI Scoring | Claude API (Anthropic) |
| Video Processing | FFmpeg + VideoToolbox |
| Frontend | Next.js + Vercel |
| Backend | FastAPI + Railway |
| Storage | Cloudflare R2 |

## Catatan
- Neuro Daily = akun testing sekaligus social proof
- Kompetitor: OpusClip ($20-50/bulan), belum ada yang fokus kreator Indonesia
- Key differentiator: bisa bahasa Indonesia, murah, lokal
