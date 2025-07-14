'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormRekomendasi from '@/components/FormRekomendasi'
import { generateDietRecommendation, DietInput } from '@/lib/gemini'
import { useDiet } from '@/context/DietContext'

export default function RekomendasiPage() {
  const [loading, setLoading] = useState(false)
  const { setRecommendation } = useDiet()
  const router = useRouter()

  const handleSubmit = async (data: DietInput) => {
    setLoading(true)
    try {
      const recommendation = await generateDietRecommendation(data)
      setRecommendation(recommendation)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error generating recommendation:', error)
      alert('Terjadi kesalahan saat menghasilkan rekomendasi. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rekomendasi Diet AI
          </h1>
          <p className="text-xl text-gray-600">
            Masukkan data pribadi Anda untuk mendapatkan rekomendasi diet yang dipersonalisasi
          </p>
        </div>

        <FormRekomendasi onSubmit={handleSubmit} loading={loading} />

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Bagaimana Cara Kerjanya?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Input Data</h3>
              <p className="text-gray-600">
                Masukkan informasi pribadi seperti umur, tinggi, berat badan, dan tujuan diet
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Analisis AI</h3>
              <p className="text-gray-600">
                AI menganalisis data Anda dan menghitung kebutuhan kalori serta makronutrien
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Rekomendasi</h3>
              <p className="text-gray-600">
                Dapatkan rekomendasi diet lengkap dengan menu makanan dan tips kesehatan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

