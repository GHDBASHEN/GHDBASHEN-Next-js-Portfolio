import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
       {/* Dark Mode Animation */}
       <div className={`absolute inset-0 w-full h-full animated-gradient-dark transition-opacity duration-1000 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
       
       {/* Light Mode Animation */}
       <div className={`absolute inset-0 w-full h-full animated-gradient-light transition-opacity duration-1000 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}