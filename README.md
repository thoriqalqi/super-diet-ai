# Super Diet AI

Platform kecerdasan buatan terdepan untuk memberikan rekomendasi diet yang dipersonalisasi sesuai dengan kebutuhan dan tujuan kesehatan Anda.

## 🚀 Fitur Utama

### 1. Rekomendasi AI Diet (`/rekomendasi`)
- Form input: umur, tinggi badan, berat badan, dan tujuan diet
- Analisis menggunakan AI Gemini untuk rekomendasi yang akurat
- Hasil meliputi: asupan kalori harian, pembagian makronutrien, dan contoh makanan

### 2. Dashboard Hasil AI (`/dashboard`)
- Visualisasi data gizi dengan chart interaktif menggunakan Recharts
- Distribusi makronutrien (karbohidrat, protein, lemak)
- Kebutuhan kalori harian (BMR, TDEE, Target Kalori)
- Rekomendasi diet dan contoh menu makanan

### 3. Blog Diet (`/blog`)
- Integrasi dengan Sanity.io sebagai Headless CMS
- Halaman list artikel dengan search functionality
- Halaman detail artikel dengan slug dinamis
- Rich text rendering untuk konten artikel

## 🛠️ Teknologi yang Digunakan

- **Next.js 15** - Framework React dengan App Router
- **React 18** - Library UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Sanity.io** - Headless CMS untuk blog
- **Google Gemini AI** - AI untuk rekomendasi diet
- **Recharts** - Library untuk visualisasi data
- **Lucide React** - Icon library

## 📦 Instalasi

1. Clone repository:
```bash
git clone https://github.com/username/super-diet-ai.git
cd super-diet-ai
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
```

4. Isi file `.env.local` dengan konfigurasi berikut:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
GEMINI_API_KEY=your_gemini_api_key
```

5. Jalankan development server:
```bash
npm run dev
```

6. Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🏗️ Struktur Folder

```
/app/
  ├── page.tsx                 # Landing page
  ├── rekomendasi/page.tsx     # Form rekomendasi AI
  ├── dashboard/page.tsx       # Dashboard hasil AI
  ├── blog/page.tsx           # List artikel blog
  ├── blog/[slug]/page.tsx    # Detail artikel blog
  └── api/recommendation/route.ts # API endpoint
/components/
  ├── Navbar.tsx              # Navigation component
  ├── Footer.tsx              # Footer component
  ├── FormRekomendasi.tsx     # Form input rekomendasi
  ├── DashboardChart.tsx      # Chart visualization
  └── BlogCard.tsx            # Blog card component
/lib/
  ├── sanity.ts               # Sanity client setup
  └── gemini.ts               # Gemini AI service
/context/
  └── DietContext.tsx         # React context for state management
```

## 🎨 Desain

Website menggunakan desain modern dengan:
- **Warna dominan**: Putih, hijau mint (#10b981), biru muda (#06b6d4)
- **Aksen**: Neon lembut dengan gradien
- **Typography**: Inter font family
- **Layout**: Mobile-first responsive design
- **Animasi**: Smooth transitions dan hover effects

## 🔧 Konfigurasi

### Sanity.io Setup
1. Buat project baru di [Sanity.io](https://sanity.io)
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Setup schema untuk blog posts
4. Dapatkan Project ID, Dataset, dan API Token

### Gemini AI Setup
1. Daftar di [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Buat API key baru
3. Masukkan API key ke environment variables

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## 📱 Fitur Responsif

Website fully responsive dengan breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🧪 Testing

Untuk testing lokal:
```bash
npm run dev
```

Test semua fitur:
1. Form rekomendasi AI
2. Dashboard visualization
3. Blog navigation
4. Responsive design

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- Website: [Super Diet AI](https://super-diet-ai.vercel.app)
- Email: info@superdietai.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Sanity.io](https://sanity.io/) - Headless CMS
- [Google Gemini](https://ai.google.dev/) - AI API
- [Recharts](https://recharts.org/) - Chart library
- [Lucide](https://lucide.dev/) - Icon library

