'use client'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DietRecommendation } from '@/lib/gemini'

interface DashboardChartProps {
  recommendation: DietRecommendation
}

export default function DashboardChart({ recommendation }: DashboardChartProps) {
  const macroData = [
    { name: 'Karbohidrat', value: recommendation.macros.carbs, color: '#10b981', grams: recommendation.macrosGrams.carbs },
    { name: 'Protein', value: recommendation.macros.protein, color: '#3b82f6', grams: recommendation.macrosGrams.protein },
    { name: 'Lemak', value: recommendation.macros.fat, color: '#f59e0b', grams: recommendation.macrosGrams.fat }
  ]

  const calorieData = [
    { name: 'BMR', value: recommendation.bmr, color: '#8b5cf6' },
    { name: 'TDEE', value: recommendation.tdee, color: '#06b6d4' },
    { name: 'Target Kalori', value: recommendation.dailyCalories, color: '#10b981' }
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="space-y-8">
      {/* Macro Distribution */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Distribusi Makronutrien
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% (${props.payload.grams}g)`, 
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {macroData.map((macro, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: macro.color }}
                  ></div>
                  <span className="font-medium text-gray-900">{macro.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">{macro.value}%</div>
                  <div className="text-sm text-gray-600">{macro.grams}g</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calorie Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Kebutuhan Kalori Harian
        </h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calorieData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kal`, 'Kalori']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {calorieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {calorieData.map((item, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{item.value.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Rekomendasi Diet
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-3">Tips Diet</h4>
            <ul className="space-y-2">
              {recommendation.recommendations.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-3">Contoh Menu</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-emerald-600">Sarapan</h5>
                <p className="text-sm text-gray-600">{recommendation.mealPlan.breakfast.join(', ')}</p>
              </div>
              <div>
                <h5 className="font-medium text-blue-600">Makan Siang</h5>
                <p className="text-sm text-gray-600">{recommendation.mealPlan.lunch.join(', ')}</p>
              </div>
              <div>
                <h5 className="font-medium text-amber-600">Makan Malam</h5>
                <p className="text-sm text-gray-600">{recommendation.mealPlan.dinner.join(', ')}</p>
              </div>
              <div>
                <h5 className="font-medium text-purple-600">Camilan</h5>
                <p className="text-sm text-gray-600">{recommendation.mealPlan.snacks.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

