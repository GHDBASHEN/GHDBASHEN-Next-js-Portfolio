import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

const servicesData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mb-4 mx-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Full-Stack Web Development',
    description: 'Building complete web apps from database to UI using modern tech like Next.js, Node.js, and MongoDB.',
    tag: 'SYSTEM ARCHITECTURE'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mb-4 mx-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9.75 4.5l3-2.25-3-2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Java Application Development',
    description: 'Developing robust, enterprise-level backend systems and applications using Java and the Spring Boot framework.',
    tag: 'BACKEND CORE'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mb-4 mx-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
    ),
    title: 'AI Developments',
    description: 'Integrating machine learning models and AI-powered features into applications to create intelligent and automated solutions.',
    tag: 'COMPUTATIONAL MODELING'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mb-4 mx-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: 'Responsive UI/UX Design',
    description: 'Designing and implementing intuitive and beautiful user interfaces that provide a great experience on any device.',
    tag: 'INTERFACE TELEMETRY'
  },
];

const ServiceCard = ({ service, index }) => {
  const { ref: scrollRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { isDarkMode } = useTheme();
  const cardRef = useRef(null);
  
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // 3D Parallax Rotation Calculation
    const xRot = e.clientX - rect.left;
    const yRot = e.clientY - rect.top;
    const rotateY = (xRot / rect.width - 0.5) * -15; // Kept lower for sleek feel
    const rotateX = (yRot / rect.height - 0.5) * 15;
    setRotate({ x: rotateX, y: rotateY });

    // Interactive Neon Spotlight Tracking
    setSpotlightPos({ x: xRot, y: yRot });
  };
  
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const currentStyle = isHovered ? {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-8px)`,
    transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
  } : {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    transition: 'transform 0.5s ease-out, box-shadow 0.3s ease',
  };

  return (
    <div 
      ref={scrollRef} 
      className={`h-full transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`} 
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={currentStyle}
        className={`group relative flex flex-col justify-between h-full p-6 rounded-2xl border backdrop-blur-md overflow-hidden transition-shadow duration-300 ${
          isDarkMode 
            ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]' 
            : 'bg-white/80 border-slate-200 hover:border-cyan-500/40 shadow-md'
        }`}
      >
        {/* Interactive Mouse Spotlight Background Ring */}
        {isHovered && isDarkMode && (
          <div 
            className="absolute pointer-events-none rounded-full blur-[60px] w-56 h-56 bg-cyan-500/10 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{ left: `${spotlightPos.x}px`, top: `${spotlightPos.y}px` }}
          />
        )}

        {/* Outer Hull Corner Brackets */}
        <div className="absolute top-2 left-2 border-t border-l border-slate-700 w-2 h-2 opacity-40 group-hover:border-cyan-400 group-hover:opacity-100 transition-colors" />
        <div className="absolute top-2 right-2 border-t border-r border-slate-700 w-2 h-2 opacity-40 group-hover:border-cyan-400 group-hover:opacity-100 transition-colors" />

        {/* Content Body */}
        <div className="relative z-10 text-center">
          {/* Subtitle Telemetry Text */}
          <span className="block text-[9px] font-mono tracking-[0.2em] text-cyan-500/80 mb-4 font-bold">
            {service.tag}
          </span>
          
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          
          <h3 className={`text-xl font-bold tracking-tight mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-slate-100 group-hover:text-white' : 'text-slate-900'
          }`}>
            {service.title}
          </h3>
          
          <p className={`text-sm leading-relaxed ${
            isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'
          }`}>
            {service.description}
          </p>
        </div>

        {/* Base Interface Accent Bar */}
        <div className="relative z-10 w-12 h-[2px] mx-auto mt-6 bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:w-full transition-all duration-500 rounded-full" />
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const { isDarkMode } = useTheme();

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      
      {/* Background stars / canvas template layer */}
      <AnimatedBackground />

      {/* Futuristic Vector Background Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-mono tracking-[0.3em] text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20 mb-3">
            MODULE SERVICES 📡
          </div>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${
            isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300' : 'text-slate-900'
          }`}>
            What I Offer
          </h2>
        </div>

        {/* CHANGED: Fixed grid containing uniform tall boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}