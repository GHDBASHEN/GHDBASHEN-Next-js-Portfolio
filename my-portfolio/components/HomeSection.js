import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
// IMPORT THE HOOK
import { useTheme } from '../context/ThemeContext';

export default function HomeSection() {
  const { isDarkMode } = useTheme(); // USE THE HOOK
  
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionRef = useRef(null);

  const getAnimationClasses = (delay) => {
    return `transform transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) ${
      inView 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-10 scale-90'
    }`;
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* --- VIDEO SWAPPING LOGIC --- */}
      {/* We use two video tags and toggle opacity for a smooth cross-fade effect */}
      
      {/* DARK MODE VIDEO (walk.mp4) */}
      <video 
        autoPlay loop muted playsInline 
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/walk.mp4" type="video/mp4" />
      </video>

      {/* LIGHT MODE VIDEO (e.g., light.mp4 - make sure you add this file!) */}
      <video 
        autoPlay loop muted playsInline 
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* REPLACE 'light.mp4' WITH YOUR LIGHT MODE VIDEO FILENAME */}
        <source src="/light.mp4" type="video/mp4" /> 
      </video>


      {/* Overlay: Darker in Dark Mode, Lighter in Light Mode */}
      <div className={`absolute top-0 left-0 w-full h-full z-0 transition-colors duration-1000 ${isDarkMode ? 'bg-black/60' : 'bg-white/30'}`}></div>
      
      {/* Content */}
      <div ref={inViewRef} className="container mx-auto px-6 z-10 relative flex flex-col items-center justify-center text-center h-full">
        <p className={`text-2xl md:text-3xl font-medium mb-4 tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} ${getAnimationClasses()}`} style={{ transitionDelay: '200ms' }}>
          Hi, I&apos;m Ashen
        </p>

        <h1 
          className={`text-6xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r mb-6 tracking-tighter drop-shadow-lg ${isDarkMode ? 'from-white via-gray-200 to-gray-400' : 'from-gray-900 via-gray-700 to-gray-500'} ${getAnimationClasses()}`} 
          style={{ transitionDelay: '400ms' }}
        >
          DEVELOPER
        </h1>

        <p className={`text-lg md:text-2xl mb-10 max-w-2xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} ${getAnimationClasses()}`} style={{ transitionDelay: '600ms' }}>
          I&apos;m an enthusiastic software engineering student passionate about building modern web solutions.
        </p>

        <div className={getAnimationClasses()} style={{ transitionDelay: '800ms' }}>
          <a href="https://www.linkedin.com/in/basith-ashen-a9b38a379/" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:bg-red-700 hover:scale-105">
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
}