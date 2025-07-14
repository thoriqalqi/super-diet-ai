import Link from 'next/link'
import { Brain, Zap, Target, BarChart3, Users, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Brain className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Super Diet <span className="text-emerald-600">AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Dapatkan rekomendasi diet yang dipersonalisasi dengan kekuatan 
              <span className="text-emerald-600 font-semibold"> Kecerdasan Buatan</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/rekomendasi"
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Mulai Rekomendasi AI
            </Link>
            <Link 
              href="/blog"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
            >
              Baca Artikel Diet
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                <Zap className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Analisis Cepat</h3>
              <p className="text-gray-600">Dapatkan hasil rekomendasi dalam hitungan detik</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                <Target className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Dipersonalisasi</h3>
              <p className="text-gray-600">Sesuai dengan tujuan dan kondisi tubuh Anda</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                <BarChart3 className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Dashboard Visual</h3>
              <p className="text-gray-600">Lihat progress dan data nutrisi secara visual</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Super Diet AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform terdepan yang menggabungkan teknologi AI dengan pengetahuan nutrisi untuk memberikan rekomendasi diet terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 rounded-2xl">
              <Brain className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teknologi AI Canggih</h3>
              <p className="text-gray-600">
                Menggunakan algoritma pembelajaran mesin untuk menganalisis data pribadi dan memberikan rekomendasi yang akurat
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rekomendasi Personal</h3>
              <p className="text-gray-600">
                Setiap rekomendasi disesuaikan dengan umur, berat badan, tinggi badan, dan tujuan diet Anda
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dashboard Interaktif</h3>
              <p className="text-gray-600">
                Visualisasi data nutrisi yang mudah dipahami dengan grafik dan chart yang menarik
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl">
              <Users className="h-12 w-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Komunitas Aktif</h3>
              <p className="text-gray-600">
                Bergabung dengan ribuan pengguna yang telah merasakan manfaat dari rekomendasi AI kami
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Aman</h3>
              <p className="text-gray-600">
                Keamanan dan privasi data Anda adalah prioritas utama kami dengan enkripsi tingkat enterprise
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl">
              <Zap className="h-12 w-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hasil Instan</h3>
              <p className="text-gray-600">
                Dapatkan rekomendasi diet komprehensif dalam hitungan detik tanpa perlu menunggu lama
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Diet Anda?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Dapatkan rekomendasi diet yang dipersonalisasi sekarang juga dan mulai hidup lebih sehat
          </p>
          <Link 
            href="/rekomendasi"
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            Mulai Sekarang - Gratis!
          </Link>
        </div>
      </section>
    </div>
  )
}

