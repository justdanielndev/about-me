'use client';

import { useState } from 'react';
import GlitchText from './GlitchText';

interface NavigationProps {
  mynamefortitle: string;
  basecolor: string;
  queryString: string;
  currentPage?: string;
}

export default function Navigation({ mynamefortitle, basecolor, queryString, currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: `/${queryString}`, label: 'Home', page: 'home' },
    { href: `/about${queryString}`, label: 'About', page: 'about' },
    { href: `/blog${queryString}`, label: 'Blog', page: 'blog' },
    { href: `/network${queryString}`, label: 'Network', page: 'network' },
    { href: `/void${queryString}`, label: '???', page: 'void' },
  ];

  return (
    <header className="px-8 py-6">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <GlitchText 
          text={`about://${mynamefortitle}`} 
          href={`/${queryString}`} 
          className="text-xl font-bold" 
        />

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <div className="relative w-6 h-6">
              <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rotate-45 transform -translate-y-1/2"></span>
              <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -rotate-45 transform -translate-y-1/2"></span>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          )}
        </button>

        <div className="hidden md:flex gap-8 text-sm">
          {navItems.map((item) => (
            <a
              key={item.page}
              href={item.href}
              className={`hover:${basecolor} transition-colors ${
                currentPage === item.page ? basecolor : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-8 py-6">
                <GlitchText 
                  text={`about://${mynamefortitle}`} 
                  href={`/${queryString}`} 
                  className="text-xl font-bold" 
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex justify-center items-center w-8 h-8"
                  aria-label="Close menu"
                >
                  <div className="relative w-6 h-6">
                    <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rotate-45 transform -translate-y-1/2"></span>
                    <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -rotate-45 transform -translate-y-1/2"></span>
                  </div>
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 space-y-8">
                {navItems.map((item) => (
                  <a
                    key={item.page}
                    href={item.href}
                    className={`text-2xl hover:${basecolor} transition-colors ${
                      currentPage === item.page ? basecolor : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}