import { NextRequest, NextResponse } from 'next/server'
import { generateDietRecommendation, DietInput } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body: DietInput = await request.json()
    
    // Validate input
    if (!body.age || !body.height || !body.weight || !body.goal || !body.gender || !body.activityLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate ranges
    if (body.age < 15 || body.age > 100) {
      return NextResponse.json(
        { error: 'Age must be between 15 and 100' },
        { status: 400 }
      )
    }

    if (body.height < 100 || body.height > 250) {
      return NextResponse.json(
        { error: 'Height must be between 100 and 250 cm' },
        { status: 400 }
      )
    }

    if (body.weight < 30 || body.weight > 300) {
      return NextResponse.json(
        { error: 'Weight must be between 30 and 300 kg' },
        { status: 400 }
      )
    }

    const recommendation = await generateDietRecommendation(body)
    
    return NextResponse.json(recommendation)
  } catch (error) {
    console.error('Error generating recommendation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

