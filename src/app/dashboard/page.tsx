'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardChart from '@/components/DashboardChart'
import { useDiet } from '@/context/DietContext'
import { ArrowLeft, RefreshCw } from 'lucide-react'

export default function DashboardPage() {
  const { recommendation } = useDiet()
  const router = useRouter()

  useEffect(() => {
    if (!recommendation) {
      router.push('/rekomendasi')
    }
  }, [recommendation, router])

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tidak ada data rekomendasi
          </h1>
          <p className="text-gray-600 mb-6">
            Silakan buat rekomendasi diet terlebih dahulu
          </p>
          <Link 
            href="/rekomendasi"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Buat Rekomendasi
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Dashboard Diet Anda
            </h1>
            <p className="text-xl text-gray-600">
              Hasil rekomendasi diet yang dipersonalisasi untuk Anda
            </p>
          </div>
          
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link 
              href="/rekomendasi"
              className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali</span>
            </Link>
            <Link 
              href="/rekomendasi"
              className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Buat Ulang</span>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {recommendation.dailyCalories.toLocaleString()}
            </div>
            <div className="text-gray-600">Kalori/Hari</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {recommendation.macrosGrams.protein}g
            </div>
            <div className="text-gray-600">Protein</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {recommendation.macrosGrams.carbs}g
            </div>
            <div className="text-gray-600">Karbohidrat</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {recommendation.macrosGrams.fat}g
            </div>
            <div className="text-gray-600">Lemak</div>
          </div>
        </div>

        {/* Charts and Recommendations */}
        <DashboardChart recommendation={recommendation} />

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Langkah Selanjutnya
            </h3>
            <p className="text-gray-600 mb-6">
              Mulai terapkan rekomendasi diet ini dalam kehidupan sehari-hari Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Baca Artikel Diet
              </Link>
              <Link 
                href="/rekomendasi"
                className="bg-white text-emerald-600 border-2 border-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Buat Rekomendasi Baru
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

