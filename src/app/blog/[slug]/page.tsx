import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, blogPostQuery, BlogPost, PortableTextBlock } from '@/lib/sanity'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await client.fetch(blogPostQuery, { slug: params.slug })

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: BlogPost | null = null
  
  try {
    post = await client.fetch(blogPostQuery, { slug: params.slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
  }

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderPortableText = (blocks: PortableTextBlock[]) => {
    return blocks.map((block: PortableTextBlock, index: number) => {
      if (block._type === 'block') {
        const style = block.style || 'normal'
        
        const childrenText = block.children?.map(child => child.text).join('') || ''

        switch (style) {
          case 'h1':
            return (
              <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
                {childrenText}
              </h1>
            )
          case 'h2':
            return (
              <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                {childrenText}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={index} className="text-xl font-bold text-gray-900 mb-3 mt-5">
                {childrenText}
              </h3>
            )
          default:
            return (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {childrenText}
              </p>
            )
        }
      }
      return null
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Blog</span>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Bagikan</span>
              </button>
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.mainImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.mainImage.asset.url || '/placeholder-image.jpg'}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {post.body ? (
            <div className="text-lg leading-relaxed">
              {renderPortableText(post.body)}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Konten Artikel Sedang Disiapkan
              </h3>
              <p className="text-gray-600 mb-6">
                Artikel ini sedang dalam proses penulisan oleh tim ahli kami. 
                Sementara itu, Anda bisa mencoba fitur rekomendasi AI untuk mendapatkan saran diet yang dipersonalisasi.
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Preview Konten:</h4>
                <div className="text-left space-y-3 text-gray-700">
                  <p>
                    Diet sehat adalah kunci utama untuk mencapai berat badan ideal dan menjaga kesehatan tubuh secara keseluruhan. 
                    Dalam artikel ini, kami akan membahas berbagai strategi diet yang telah terbukti efektif dan aman.
                  </p>
                  <p>
                    Setiap individu memiliki kebutuhan nutrisi yang berbeda-beda, tergantung pada faktor-faktor seperti usia, 
                    jenis kelamin, tingkat aktivitas, dan kondisi kesehatan. Oleh karena itu, penting untuk mendapatkan 
                    rekomendasi diet yang dipersonalisasi.
                  </p>
                  <p>
                    Dengan menggunakan teknologi AI, Super Diet AI dapat memberikan rekomendasi yang tepat sesuai dengan 
                    profil dan tujuan kesehatan Anda.
                  </p>
                </div>
              </div>
              
              <Link 
                href="/rekomendasi"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
              >
                Dapatkan Rekomendasi AI
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Artikel Terkait
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Tips Diet Sehat untuk Pemula",
                excerpt: "Panduan lengkap memulai diet sehat dengan langkah-langkah yang mudah diikuti",
                date: "2024-01-15"
              },
              {
                title: "Cara Menghitung Kebutuhan Kalori Harian",
                excerpt: "Pelajari cara menghitung kebutuhan kalori yang tepat untuk mencapai tujuan diet Anda",
                date: "2024-01-10"
              },
              {
                title: "Makanan Super untuk Menurunkan Berat Badan",
                excerpt: "Daftar makanan yang dapat membantu proses penurunan berat badan secara alami",
                date: "2024-01-05"
              }
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <span className="text-green-600 hover:text-green-700 cursor-pointer">
                    Baca →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


