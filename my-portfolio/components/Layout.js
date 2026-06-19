import Header from './Header';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen relative w-full transition-colors duration-700 ease-in-out overflow-x-hidden ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-gradient-to-b from-sky-100 via-orange-50/60 to-amber-50 text-slate-900'
    }`}>
      
      {/* --- PREMIUM ATMOSPHERIC SUNRISE / DEEP SPACE BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {isDarkMode ? (
          /* Dark Mode: Aerospace HUD Blueprint Grid */
          <div 
            className="absolute inset-0 opacity-[0.15] mix-blend-screen"
            style={{
              backgroundImage: `
                linear-gradient(to right, #06b6d4 1px, transparent 1px),
                linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        ) : (
          /* Light Mode: Sunrise Aerospace Cloud & Navigation Matrix */
          <>
            {/* Soft Sun Glow Prism */}
            <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-300/40 to-orange-400/20 blur-[120px] mix-blend-multiply animate-pulse duration-[6000ms]" />
            <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-300/30 via-transparent to-amber-200/20 blur-[100px] mix-blend-multiply" />
            
            {/* Fine Morning Vector Sky Grid */}
            <div 
              className="absolute inset-0 opacity-[0.25]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #f59e0b 1px, transparent 1px),
                  linear-gradient(to bottom, #f59e0b 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
          </>
        )}
      </div>

      {/* --- HEADER CONTROL COMPONENT --- */}
      <Header />
      
      {/* --- MAIN CORE SECTION ROUTER --- */}
      <main className="relative z-10 w-full pt-20">
        {children}
      </main>

    </div>
  );
}