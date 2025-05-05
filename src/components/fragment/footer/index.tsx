import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Link } from 'lucide-react';

const Footer = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
      link: 'https://www.instagram.com/dcfundip?igsh=MnozMGF1bWl2Mjhl'
    },
    { 
      name: 'TikTok', 
      icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
      link: 'https://www.tiktok.com/@dcfundip2024?_t=ZS-8w3XKzXeTmz&_r=1'
    }
  ];

  const documents = [
    { name: 'Guidebook', link: 'https://drive.google.com/drive/folders/1eSH5kaGmADvJmhE6ZLx_k_CB2Wt8BVup?usp=sharing' },
    { name: 'Persyaratan', id: 'registration' }
  ];

  const contacts = [
    { name: 'Email', link: 'mailto:dcfundip2025@gmail.com', text: 'dcfundip2025@gmail.com' },
    { name: 'WhatsApp Olimpiade', link: 'https://wa.me/6285601792920', text: '+6285601792920 (Umi)' },
    { name: 'WhatsApp LKTI', link: 'https://wa.me/628989351872', text: '+628989351872 (Levina)' }
  ];

  const navItems = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang', id: 'about' },
    { name: 'Jadwal', id: 'timeline' },
    { name: 'Hadiah', id: 'hadiah' },
    { name: 'Cara Daftar', id: 'registration' }
  ];

  // Effect to handle scrolling when returning from another page
  useEffect(() => {
    if (!isHomePage && router.asPath.includes('#')) {
      const timer = setTimeout(() => {
        const id = router.asPath.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          scrollToElement(element);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [router.asPath, isHomePage]);

  // Helper function to scroll to element with offset
  const scrollToElement = (element: HTMLElement) => {
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Main function to handle scroll/navigation
  const handleScroll = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        scrollToElement(element);
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="relative bg-[#008080] text-white pt-16 pb-8 overflow-hidden">
      {/* Wave design */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-10 h-10 mr-3">
              <Image 
                src="/images/LogoMaskot.png" 
                alt="DCF Logo" 
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl text-white">DCF 2025</span>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name} 
                href={social.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#fdbe85] transition duration-300 flex items-center group"
                aria-label={social.name}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
                <span className="ml-2 hidden md:inline group-hover:underline">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-left">
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScroll(item.id)}
                    className="relative text-white/80 hover:text-[#fdbe85] transition duration-300 group text-left"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fdbe85] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
              <li>
                <Link 
                  href="/contact" 
                  className="relative text-white/80 hover:text-[#fdbe85] transition duration-300 group text-left"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fdbe85] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Dokumen</h3>
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li key={doc.name}>
                  {doc.link ? (
                    <a 
                      href={doc.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative text-white/80 hover:text-[#fdbe85] transition duration-300 group"
                    >
                      {doc.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fdbe85] transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <button
                      onClick={() => handleScroll(doc.id || '')}
                      className="relative text-white/80 hover:text-[#fdbe85] transition duration-300 group text-left"
                    >
                      {doc.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fdbe85] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2">
              {contacts.map((contact) => (
                <li key={contact.name}>
                  <a 
                    href={contact.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-white/80 hover:text-[#fdbe85] transition duration-300 group"
                  >
                    <span className="font-medium">{contact.name}:</span> {contact.text}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fdbe85] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <p className="text-white/80">&copy; 2025 Diponegoro Chemistry Fair. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;