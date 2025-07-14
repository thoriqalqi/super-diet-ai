'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Brain } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-emerald-600" />
              <span className="font-bold text-xl text-gray-900">Super Diet AI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Beranda
            </Link>
            <Link href="/rekomendasi" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Rekomendasi AI
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link 
              href="/rekomendasi" 
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Mulai Sekarang
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:text-emerald-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={toggleMenu}
              >
                Beranda
              </Link>
              <Link 
                href="/rekomendasi" 
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={toggleMenu}
              >
                Rekomendasi AI
              </Link>
              <Link 
                href="/dashboard" 
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link 
                href="/rekomendasi" 
                className="block px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors mx-3 text-center"
                onClick={toggleMenu}
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

