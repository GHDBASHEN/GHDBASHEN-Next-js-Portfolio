import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
// IMPORT THE HOOK
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme(); // USE THE HOOK
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = Cookies.get('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, [router.asPath]);

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout');
    if (response.ok) {
      setIsLoggedIn(false);
      setIsOpen(false);
      router.push('/admin/login');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300">
      
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex container mx-auto px-6 py-4 justify-between items-center">
        
        {/* Left Side */}
        <div className="flex-1 flex justify-start">
          {/* Admin login removed from here */}
        </div>

        {/* Centered Navigation */}
        <nav className="flex-none flex justify-center bg-black/30 backdrop-blur-md rounded-full px-8 py-2 border border-white/10">
            <ul className="flex items-center space-x-6 text-sm font-medium">
              <li><Link href="/#home" className="text-gray-200 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="text-gray-200 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/#services" className="text-gray-200 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/#certificates" className="text-gray-200 hover:text-white transition-colors">Certifications</Link></li>
              <li><Link href="/#awards" className="text-gray-200 hover:text-white transition-colors">Awards</Link></li>
              <li><Link href="/#projects" className="text-gray-200 hover:text-white transition-colors">Projects</Link></li>
            </ul>
        </nav>

        {/* Right Side (Buttons) */}
        <div className="flex-1 flex justify-end items-center gap-4">
           {/* THEME TOGGLE BUTTON */}
           <button 
             onClick={toggleTheme} 
             className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
             aria-label="Toggle Theme"
           >
             {isDarkMode ? (
               // Sun Icon (Light Mode)
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             ) : (
               // Moon Icon (Dark Mode)
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
             )}
           </button>

          {isLoggedIn && (
            <button onClick={handleLogout} className="bg-red-600 text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-red-700 transition-colors">Logout</button>
          )}
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden container mx-auto px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <Link href="/" className="text-white text-xl font-bold drop-shadow-md">
          My Portfolio
        </Link>

        <div className="flex items-center gap-4">
            {/* Mobile Theme Toggle */}
            <button onClick={toggleTheme} className="text-white">
               {isDarkMode ? '☀️' : '🌙'}
            </button>

            <button className="text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 absolute w-full`}>
        <div className="flex flex-col p-6 space-y-4 text-center">
          <Link href="/#home" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Home</Link>
          <Link href="/#about" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">About</Link>
          <Link href="/#services" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Services</Link>
          <Link href="/#certificates" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Certifications</Link>
          <Link href="/#awards" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Awards</Link>
          <Link href="/#projects" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Projects</Link>
          <div className="border-t border-gray-700 pt-4 mt-2">
            {isLoggedIn && (
              <button onClick={handleLogout} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg">Logout</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}