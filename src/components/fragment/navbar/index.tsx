import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useScrollDirection from '@/components/hooks/scrollDirect';

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.pageYOffset < 50);
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-md'
      } ${
        // Hanya terapkan efek hide jika tidak di bagian atas halaman
        scrollDirection === "down" && !scrolledToTop ? "opacity-90" : "opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center group cursor-pointer"
            onClick={() => handleScroll('home')}
          >
            <div className="relative w-10 h-10 mr-3 transition-all duration-300 group-hover:rotate-12">
              <Image 
                src="/images/LogoMaskot.png" 
                alt="DCF Logo" 
                width={40}
                height={40}
                className="drop-shadow-md"
              />
            </div>
            <span className="font-bold text-xl text-[#008080] bg-clip-text bg-gradient-to-r from-[#008080] to-[#00b3b3]">
              DCF 2025
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleScroll('home')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Beranda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button 
              onClick={() => handleScroll('about')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Tentang
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button 
              onClick={() => handleScroll('timeline')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Jadwal
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <Link 
              href="/prizes" 
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Hadiah
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/registration" 
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Cara Daftar
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-[#008080]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-[#008080]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <Link 
              href="/login" 
              className="bg-gradient-to-r from-[#008080] to-[#00b3b3] text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-teal-100 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;