'use client'

import { useState } from 'react'
import { User, Ruler, Weight, Target, Activity, Loader2 } from 'lucide-react'
import { DietInput } from '@/lib/gemini'

interface FormRekomendasiProps {
  onSubmit: (data: DietInput) => void
  loading: boolean
}

export default function FormRekomendasi({ onSubmit, loading }: FormRekomendasiProps) {
  const [formData, setFormData] = useState<DietInput>({
    age: 25,
    height: 170,
    weight: 70,
    goal: 'maintain',
    gender: 'male',
    activityLevel: 'moderate'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof DietInput, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Dapatkan Rekomendasi Diet AI
        </h2>
        <p className="text-gray-600">
          Masukkan data diri Anda untuk mendapatkan rekomendasi diet yang dipersonalisasi
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Umur (tahun)
            </label>
            <input
              type="number"
              min="15"
              max="100"
              value={formData.age}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kelamin
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value as 'male' | 'female')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            >
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Ruler className="inline h-4 w-4 mr-1" />
              Tinggi Badan (cm)
            </label>
            <input
              type="number"
              min="100"
              max="250"
              value={formData.height}
              onChange={(e) => handleChange('height', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Weight className="inline h-4 w-4 mr-1" />
              Berat Badan (kg)
            </label>
            <input
              type="number"
              min="30"
              max="300"
              value={formData.weight}
              onChange={(e) => handleChange('weight', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Target className="inline h-4 w-4 mr-1" />
            Tujuan Diet
          </label>
          <select
            value={formData.goal}
            onChange={(e) => handleChange('goal', e.target.value as 'lose' | 'gain' | 'maintain')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          >
            <option value="lose">Menurunkan Berat Badan</option>
            <option value="gain">Menaikkan Berat Badan</option>
            <option value="maintain">Mempertahankan Berat Badan</option>
          </select>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Activity className="inline h-4 w-4 mr-1" />
            Tingkat Aktivitas
          </label>
          <select
            value={formData.activityLevel}
            onChange={(e) => handleChange("activityLevel", e.target.value as "sedentary" | "light" | "moderate" | "active" | "very-active")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          >
            <option value="sedentary">Tidak Aktif (duduk sepanjang hari)</option>
            <option value="light">Aktivitas Ringan (olahraga 1-3 hari/minggu)</option>
            <option value="moderate">Aktivitas Sedang (olahraga 3-5 hari/minggu)</option>
            <option value="active">Aktif (olahraga 6-7 hari/minggu)</option>
            <option value="very-active">Sangat Aktif (olahraga 2x/hari atau kerja fisik)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Menganalisis...</span>
            </>
          ) : (
            <span>Dapatkan Rekomendasi AI</span>
          )}
        </button>
      </form>
    </div>
  )
}

