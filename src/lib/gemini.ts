import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export interface DietInput {
  age: number
  height: number
  weight: number
  goal: 'lose' | 'gain' | 'maintain'
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
}

export interface DietRecommendation {
  dailyCalories: number
  macros: {
    carbs: number
    protein: number
    fat: number
  }
  macrosGrams: {
    carbs: number
    protein: number
    fat: number
  }
  bmr: number
  tdee: number
  recommendations: string[]
  mealPlan: {
    breakfast: string[]
    lunch: string[]
    dinner: string[]
    snacks: string[]
  }
}

export async function generateDietRecommendation(input: DietInput): Promise<DietRecommendation> {
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr: number
  if (input.gender === 'male') {
    bmr = 10 * input.weight + 6.25 * input.height - 5 * input.age + 5
  } else {
    bmr = 10 * input.weight + 6.25 * input.height - 5 * input.age - 161
  }

  // Calculate TDEE
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  }
  
  const tdee = bmr * activityMultipliers[input.activityLevel]

  // Adjust calories based on goal
  let dailyCalories: number
  switch (input.goal) {
    case 'lose':
      dailyCalories = tdee - 500 // 500 calorie deficit
      break
    case 'gain':
      dailyCalories = tdee + 300 // 300 calorie surplus
      break
    default:
      dailyCalories = tdee
  }

  // Calculate macros (40% carbs, 30% protein, 30% fat)
  const carbsCalories = dailyCalories * 0.4
  const proteinCalories = dailyCalories * 0.3
  const fatCalories = dailyCalories * 0.3

  const macrosGrams = {
    carbs: Math.round(carbsCalories / 4),
    protein: Math.round(proteinCalories / 4),
    fat: Math.round(fatCalories / 9)
  }

  const macros = {
    carbs: 40,
    protein: 30,
    fat: 30
  }

  // Generate AI recommendations using Gemini
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = `
    Berikan rekomendasi diet untuk seseorang dengan data berikut:
    - Umur: ${input.age} tahun
    - Tinggi: ${input.height} cm
    - Berat: ${input.weight} kg
    - Jenis kelamin: ${input.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
    - Tingkat aktivitas: ${input.activityLevel}
    - Tujuan: ${input.goal === 'lose' ? 'Menurunkan berat badan' : input.goal === 'gain' ? 'Menaikkan berat badan' : 'Mempertahankan berat badan'}
    - Kalori harian yang dibutuhkan: ${Math.round(dailyCalories)} kalori
    - Kebutuhan makronutrien: ${macrosGrams.carbs}g karbohidrat, ${macrosGrams.protein}g protein, ${macrosGrams.fat}g lemak

    Berikan:
    1. 5 tips diet umum dalam format array string
    2. Contoh menu makanan untuk sarapan, makan siang, makan malam, dan camilan (masing-masing 3-4 item) dalam bahasa Indonesia

    Format response dalam JSON:
    {
      "tips": ["tip1", "tip2", "tip3", "tip4", "tip5"],
      "mealPlan": {
        "breakfast": ["item1", "item2", "item3"],
        "lunch": ["item1", "item2", "item3"],
        "dinner": ["item1", "item2", "item3"],
        "snacks": ["item1", "item2", "item3"]
      }
    }
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const aiResponse = JSON.parse(jsonMatch[0])
      
      return {
        dailyCalories: Math.round(dailyCalories),
        macros,
        macrosGrams,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        recommendations: aiResponse.tips || [
          'Minum air putih minimal 8 gelas per hari',
          'Konsumsi makanan tinggi serat',
          'Hindari makanan olahan berlebihan',
          'Makan dalam porsi kecil tapi sering',
          'Kombinasikan dengan olahraga teratur'
        ],
        mealPlan: aiResponse.mealPlan || {
          breakfast: ['Oatmeal dengan buah', 'Telur rebus', 'Yogurt Greek'],
          lunch: ['Nasi merah', 'Ayam panggang', 'Sayur bayam'],
          dinner: ['Ikan bakar', 'Kentang rebus', 'Salad sayuran'],
          snacks: ['Buah apel', 'Kacang almond', 'Smoothie protein']
        }
      }
    }
  } catch (error) {
    console.error('Error generating AI recommendation:', error)
  }

  // Fallback response if AI fails
  return {
    dailyCalories: Math.round(dailyCalories),
    macros,
    macrosGrams,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    recommendations: [
      'Minum air putih minimal 8 gelas per hari',
      'Konsumsi makanan tinggi serat seperti sayuran dan buah-buahan',
      'Hindari makanan olahan dan tinggi gula berlebihan',
      'Makan dalam porsi kecil tapi sering (5-6 kali sehari)',
      'Kombinasikan dengan olahraga teratur minimal 30 menit per hari'
    ],
    mealPlan: {
      breakfast: ['Oatmeal dengan potongan buah segar', 'Telur rebus dengan roti gandum', 'Yogurt Greek dengan granola'],
      lunch: ['Nasi merah dengan ayam panggang', 'Salad quinoa dengan sayuran', 'Sup sayuran dengan protein'],
      dinner: ['Ikan bakar dengan kentang rebus', 'Tahu tempe dengan sayur tumis', 'Salad sayuran dengan dressing rendah lemak'],
      snacks: ['Buah apel atau pisang', 'Kacang almond atau walnut', 'Smoothie protein dengan sayuran hijau']
    }
  }
}

