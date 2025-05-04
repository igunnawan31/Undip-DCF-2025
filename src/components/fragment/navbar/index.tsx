import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useScrollDirection from '@/components/hooks/scrollDirect';
import { getSession, useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const { data: session } = useSession();
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dataSession, setDataSession] = useState<any>(null);
  const isHomePage = router.pathname === '/';

  const handleNavigation = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      router.push(`/#${id}`);
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

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    setShowDropdown(false);
  };

  console.log(session)
  

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-md'
      } ${
        scrollDirection === "down" && !scrolledToTop ? "opacity-90" : "opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group cursor-pointer"
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
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavigation('home')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Beranda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button 
              onClick={() => handleNavigation('about')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Tentang
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button 
              onClick={() => handleNavigation('timeline')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Jadwal
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button 
              onClick={() => handleNavigation('hadiah')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Hadiah
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavigation('registration')}
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Cara Daftar
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <Link 
              href="/contact" 
              className="relative text-gray-700 hover:text-[#008080] transition duration-300 group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b3b3] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#008080] to-[#00b3b3] flex items-center justify-center text-white font-semibold">
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                  </div>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                      href="/dashboard/olimpiade" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-gradient-to-r from-[#008080] to-[#00b3b3] text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-teal-100 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;