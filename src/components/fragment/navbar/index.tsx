import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
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
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Beranda', path: '/' },
              { name: 'Tentang', path: '/about' },
              { name: 'Jadwal', path: '/schedule' },
              { name: 'Hadiah', path: '/prizes' },
              { name: 'Cara Daftar', path: '/registration' }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
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