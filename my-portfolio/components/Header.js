import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
// IMPORT THE HOOK
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme(); // USE THE HOOK
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isButtonOnLeft, setIsButtonOnLeft] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const gameTimerRef = useRef(null);
  const tooltipTimerRef = useRef(null);
  const timersStartedRef = useRef(false);

  useEffect(() => {
    const loggedInStatus = Cookies.get('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
    return () => {
      clearTimeout(gameTimerRef.current);
      clearTimeout(tooltipTimerRef.current);
    };
  }, [router.asPath]);

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout');
    if (response.ok) {
      setIsLoggedIn(false);
      setIsOpen(false);
      router.push('/admin/login');
    }
  };

  const handleButtonHover = () => {
    if (!timersStartedRef.current) {
      timersStartedRef.current = true;
      setShowTooltip(true);
      tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 3000);
      gameTimerRef.current = setTimeout(() => {
        setIsGameActive(false);
        setIsButtonOnLeft(false);
      }, 10000);
    }
    if (isGameActive) {
      setIsButtonOnLeft((prevState) => !prevState);
    }
  };

  const EvasiveButtonWithTooltip = () => {
    const tooltipPositionClasses = isButtonOnLeft ? 'left-full ml-3' : 'right-full mr-3';
    return (
      <div className="relative flex items-center">
        {showTooltip && (
          <div className={`absolute whitespace-nowrap bg-gray-700 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 ${tooltipPositionClasses}`}>
            Catch me if you can!
          </div>
        )}
        <Link
          href="/admin/login"
          onMouseEnter={handleButtonHover}
          className="bg-cyan-600 text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-cyan-700 transition-colors"
        >
          Admin Login
        </Link>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300">
      
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex container mx-auto px-6 py-4 justify-between items-center">
        
        {/* Left Side */}
        <div className="flex-1 flex justify-start">
          {!isLoggedIn && isButtonOnLeft && isGameActive && <EvasiveButtonWithTooltip />}
        </div>

        {/* Centered Navigation */}
        <nav className="flex-none flex justify-center bg-black/30 backdrop-blur-md rounded-full px-6 py-2 border border-white/10">
            <ul className="flex items-center space-x-6 text-sm font-medium">
              <li><a href="#home" className="text-gray-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-200 hover:text-white transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-200 hover:text-white transition-colors">Services</a></li>
              <li><a href="#projects" className="text-gray-200 hover:text-white transition-colors">Projects</a></li>
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

          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-red-700 transition-colors">Logout</button>
          ) : (
            (!isButtonOnLeft || !isGameActive) && <EvasiveButtonWithTooltip />
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
          <a href="#home" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Home</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">About</a>
          <a href="#services" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Services</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg">Projects</a>
          <div className="border-t border-gray-700 pt-4 mt-2">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg">Logout</button>
            ) : (
              <Link href="/admin/login" onClick={() => setIsOpen(false)} className="block w-full bg-cyan-600 text-white font-bold py-3 rounded-lg">Admin Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}