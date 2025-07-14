'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { DietRecommendation } from '@/lib/gemini'

interface DietContextType {
  recommendation: DietRecommendation | null
  setRecommendation: (recommendation: DietRecommendation) => void
  clearRecommendation: () => void
}

const DietContext = createContext<DietContextType | undefined>(undefined)

export function DietProvider({ children }: { children: ReactNode }) {
  const [recommendation, setRecommendation] = useState<DietRecommendation | null>(null)

  const clearRecommendation = () => {
    setRecommendation(null)
  }

  return (
    <DietContext.Provider value={{ recommendation, setRecommendation, clearRecommendation }}>
      {children}
    </DietContext.Provider>
  )
}

export function useDiet() {
  const context = useContext(DietContext)
  if (context === undefined) {
    throw new Error('useDiet must be used within a DietProvider')
  }
  return context
}

