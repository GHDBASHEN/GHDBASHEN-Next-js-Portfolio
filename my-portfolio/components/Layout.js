import Header from './Header';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen relative w-full transition-colors duration-700 ease-in-out overflow-x-hidden ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50 text-slate-900'
    }`}>
      
      {/* --- THE HEADER VISIBILITY SHIELD ---
        This creates a fixed container exactly matching your navigation bar height.
        The combination of backdrop-blur and a clean gradient mask ensures that 
        ANY background grid or star particle from any section vanishes completely 
        the second it scrolls into the header zone.
      */}
      <div 
        className="fixed top-0 left-0 right-0 h-20 z-50 pointer-events-none transition-all"
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        }}
      />

      {/* --- GLOBAL APP BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {isDarkMode ? (
          /* Dark Mode Blueprint Grid */
          <div 
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #06b6d4 1px, transparent 1px),
                linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
              `,
              backgroundSize: '4rem 4rem',
            }}
          />
        ) : (
          /* Light Mode Daylight Flight Grid */
          <div 
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0284c7 1px, transparent 1px),
                linear-gradient(to bottom, #0284c7 1px, transparent 1px)
              `,
              backgroundSize: '4rem 4rem',
            }}
          />
        )}
      </div>

      {/* --- ACTUAL HEADER NAVIGATION --- */}
      <Header />
      
      {/* --- MAIN PORTFOLIO SECTIONS --- */}
      <main className="relative z-10 w-full">
        {children}
      </main>

    </div>
  );
}