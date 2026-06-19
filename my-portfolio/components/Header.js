import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-500">
      
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex container mx-auto px-6 py-5 justify-between items-center">
        
        {/* Left Side Space Anchor */}
        <div className="flex-1 flex justify-start">
          <Link 
            href="/#home" 
            className={`font-mono font-black text-sm tracking-widest uppercase transition-colors duration-300 ${
              isDarkMode ? 'text-cyan-400' : 'text-amber-600'
            }`}
          >
            {isDarkMode ? '⚡ ORBIT_OS' : '🌤️ DAWN_PILOT'}
          </Link>
        </div>

        {/* Centered Navigation Bubble */}
        <nav className={`flex-none flex justify-center backdrop-blur-xl rounded-full px-8 py-2.5 border transition-all duration-500 ${
          isDarkMode 
            ? 'bg-slate-950/40 border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)]' 
            : 'bg-white/40 border-amber-200/50 shadow-[0_4px_20px_rgba(245,158,11,0.08)]'
        }`}>
          <ul className="flex items-center space-x-8 text-xs font-mono font-bold uppercase tracking-wider">
            {[
              { label: 'Home', target: '/#home' },
              { label: 'About', target: '/#about' },
              { label: 'Services', target: '/#services' },
              { label: 'Certifications', target: '/#certificates' },
              { label: 'Awards', target: '/#awards' },
              { label: 'Projects', target: '/#projects' }
            ].map((link) => (
              <li key={link.target}>
                <Link 
                  href={link.target} 
                  className={`transition-all duration-300 relative group py-1 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-cyan-400' 
                      : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                  {/* Underline Indicator Shimmer */}
                  <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full rounded-full ${
                    isDarkMode ? 'bg-cyan-400' : 'bg-amber-500'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Control Center */}
        <div className="flex-1 flex justify-end items-center gap-4">
          
          {/* THEME TOGGLE RADIAL KEY */}
          <button 
            onClick={toggleTheme} 
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-sm ${
              isDarkMode 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-amber-400 hover:text-amber-300' 
                : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-200 text-amber-600'
            }`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              // Sun Icon (Switch to Sunrise Mode)
              <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon Icon (Switch to Deep Space Mode)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {isLoggedIn && (
            <button 
              onClick={handleLogout} 
              className="bg-rose-600 hover:bg-rose-700 text-white font-mono font-bold text-xs py-2 px-5 rounded-full shadow-md transition-colors tracking-wider"
            >
              TERMINATE
            </button>
          )}
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className={`md:hidden container mx-auto px-6 py-4 flex justify-between items-center border-b transition-all duration-500 ${
        isDarkMode 
          ? 'bg-slate-950/40 border-white/5 backdrop-blur-md' 
          : 'bg-white/40 border-amber-200/30 backdrop-blur-md'
      }`}>
        <Link 
          href="/" 
          className={`font-mono font-black text-base tracking-widest ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {isDarkMode ? 'PORTFOLIO//' : 'PORTFOLIO🌤️'}
        </Link>

        <div className="flex items-center gap-4">
          {/* Mobile Action Mode Core Switch */}
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-lg text-sm border ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-amber-500/10 border-amber-200'
            }`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button 
            className={`${isDarkMode ? 'text-white' : 'text-slate-800'} focus:outline-none`} 
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      <div className={`transition-all duration-300 ease-in-out md:hidden absolute w-full left-0 border-b backdrop-blur-2xl ${
        isOpen ? "translate-y-0 opacity-100 block" : "-translate-y-5 opacity-0 hidden"
      } ${
        isDarkMode 
          ? 'bg-slate-950/95 border-slate-800' 
          : 'bg-white/95 border-amber-200 shadow-xl'
      }`}>
        <div className="flex flex-col p-6 space-y-4 text-center font-mono font-bold text-sm tracking-wider uppercase">
          {[
            { label: 'Home', target: '/#home' },
            { label: 'About', target: '/#about' },
            { label: 'Services', target: '/#services' },
            { label: 'Certifications', target: '/#certificates' },
            { label: 'Awards', target: '/#awards' },
            { label: 'Projects', target: '/#projects' }
          ].map((link) => (
            <Link 
              key={link.target}
              href={link.target} 
              onClick={() => setIsOpen(false)} 
              className={`py-2 rounded-xl transition-all ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-cyan-400 hover:bg-white/5' 
                  : 'text-slate-700 hover:text-amber-600 hover:bg-amber-500/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {isLoggedIn && (
            <div className="border-t border-slate-800 pt-4 mt-2">
              <button 
                onClick={handleLogout} 
                className="w-full bg-rose-600 text-white font-mono font-bold py-3 rounded-xl shadow-lg"
              >
                TERMINATE SESSION
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}