import { client, blogPostsQuery, BlogPost } from '@/lib/sanity'
import BlogCard from '@/components/BlogCard'
import { Search } from 'lucide-react'

export default async function BlogPage() {
  let posts: BlogPost[] = []
  
  try {
    posts = await client.fetch(blogPostsQuery)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Diet & Kesehatan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan artikel-artikel terbaru tentang diet, nutrisi, dan tips kesehatan 
            yang telah dikurasi oleh para ahli
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari artikel diet, nutrisi, atau tips kesehatan..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Blog Posts */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Artikel Sedang Disiapkan
              </h3>
              <p className="text-gray-600 mb-8">
                Tim kami sedang menyiapkan artikel-artikel berkualitas tinggi tentang diet dan kesehatan. 
                Sementara itu, Anda bisa mencoba fitur rekomendasi AI kami.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Contoh Artikel yang Akan Datang:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 10 Tips Diet Sehat untuk Pemula</li>
                    <li>• Cara Menghitung Kebutuhan Kalori Harian</li>
                    <li>• Makanan Super untuk Menurunkan Berat Badan</li>
                    <li>• Panduan Lengkap Diet Mediterania</li>
                    <li>• Olahraga Terbaik untuk Membakar Lemak</li>
                  </ul>
                </div>
                <a 
                  href="/rekomendasi"
                  className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Coba Rekomendasi AI
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Kategori Artikel
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Diet Sehat', color: 'bg-emerald-100 text-emerald-700' },
              { name: 'Nutrisi', color: 'bg-blue-100 text-blue-700' },
              { name: 'Olahraga', color: 'bg-purple-100 text-purple-700' },
              { name: 'Tips Kesehatan', color: 'bg-amber-100 text-amber-700' },
              { name: 'Resep Sehat', color: 'bg-green-100 text-green-700' },
              { name: 'Gaya Hidup', color: 'bg-pink-100 text-pink-700' },
              { name: 'Suplemen', color: 'bg-indigo-100 text-indigo-700' },
              { name: 'Kesehatan Mental', color: 'bg-rose-100 text-rose-700' }
            ].map((category, index) => (
              <div 
                key={index}
                className={`${category.color} px-4 py-3 rounded-lg text-center font-medium cursor-pointer hover:opacity-80 transition-opacity`}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

