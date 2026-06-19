import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

const AwardItem = ({ award, index, isDarkMode, onImageClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative pl-8 md:pl-12 transition-all duration-1000 ease-out ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* 1. THE ORBITAL TIMELINE NODE (Astronaut Navigation Indicator) */}
      <div className="absolute left-0 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
        {/* Pulsing Outer Radar Ring */}
        <div className="absolute w-6 h-6 rounded-full bg-amber-500/20 animate-ping opacity-75" />
        {/* Core Cockpit Indicator */}
        <div className="relative w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_10px_#f59e0b]">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        </div>
      </div>

      {/* 2. MAIN LOG CARD */}
      <div className={`group relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 hover:-translate-y-1 ${
        isDarkMode 
          ? 'bg-slate-900/40 border-slate-800 hover:border-amber-500/40 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.15)]' 
          : 'bg-white/70 border-slate-200 hover:border-amber-400 shadow-sm'
      }`}>
        
        {/* Hidden Neon Laser Side-Border Accent Effect */}
        <div className="absolute top-0 left-0 w-[3px] h-0 bg-gradient-to-b from-amber-400 via-orange-500 to-transparent group-hover:h-full transition-all duration-500 rounded-l-2xl" />

        {/* Space Hull Mechanical Corner Brackets */}
        <div className="absolute top-2 right-2 border-t border-r border-slate-800 w-2 h-2 opacity-40 group-hover:border-amber-400 group-hover:opacity-100 transition-colors pointer-events-none" />
        <div className="absolute bottom-2 left-2 border-b border-l border-slate-800 w-2 h-2 opacity-40 group-hover:border-amber-400 group-hover:opacity-100 transition-colors pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Circular Media Display Pod */}
          <div 
            className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-1 cursor-pointer group/award shadow-inner"
            onClick={() => onImageClick(award.imageUrl)}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-900/60">
              <Image
                src={award.imageUrl}
                alt={award.title}
                fill
                className="object-contain p-1 transition-transform duration-500 group-hover/award:scale-110 filter contrast-105"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/award:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-400 animate-pulse">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Achievement Telemetry Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
              <h3 className={`text-2xl font-black tracking-tight group-hover:text-amber-400 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {award.title}
              </h3>
              
              {/* Year Badge styled like a telemetry timestamp */}
              <span className="inline-block font-mono font-bold text-sm bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-md shadow-sm tracking-wider self-center md:self-start">
                TS::{award.year}
              </span>
            </div>

            {/* Supplying Institution/Organization Tag */}
            <p className="text-amber-500/90 font-mono font-bold tracking-[0.15em] mb-3 text-xs uppercase">
              // HOST_INSTITUTION: {award.organization}
            </p>

            {award.description && (
              <p className={`text-sm leading-relaxed tracking-normal font-medium ${
                isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'
              }`}>
                {award.description}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default function AwardsSection({ awards }) {
  const { isDarkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="awards" className="relative py-24 overflow-hidden">
      
      {/* 1. Deep Space Starfield Background Layer */}
      <AnimatedBackground />

      {/* Futuristic Laser Top Grid Separator */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent pointer-events-none" />

      {/* 2. Image Inspection Terminal Overlay (Modal) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 md:p-10 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-slate-400 hover:text-amber-400 transition-colors z-[110] bg-slate-900/80 p-2 rounded-full border border-slate-800"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center p-2 border border-slate-800/50 rounded-2xl bg-slate-900/30 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <Image 
              src={selectedImage} 
              alt="Log Verification Screen" 
              fill 
              className="object-contain p-2 rounded-xl"
              priority
            />
          </div>
        </div>
      )}

      {/* 3. Section Shell */}
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Module Header Title block */}
        <div className="flex flex-col items-center mb-20">
          <div className="inline-block text-xs font-mono tracking-[0.3em] text-amber-400 bg-amber-950/30 px-3 py-1 rounded-full border border-amber-500/20 mb-3 animate-pulse">
            MISSION_LOG: RECORD_ACHIEVEMENTS 🏆
          </div>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-center ${
            isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-300' : 'text-slate-900'
          }`}>
            Awards & Recognitions
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-4 rounded-full" />
        </div>
        
        {/* 4. Timeline Map Block */}
        {awards && awards.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            
            {/* Center Vector Trajectory Line (Vertical timeline track) */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-amber-500/40 via-orange-500/20 to-transparent pointer-events-none" />

            <div className="space-y-8">
              {awards.map((award, index) => (
                <AwardItem 
                  key={award._id || index} 
                  award={award} 
                  index={index} 
                  isDarkMode={isDarkMode} 
                  onImageClick={setSelectedImage}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 max-w-md mx-auto">
            <p className="text-slate-500 font-mono text-sm italic">No flight achievements recorded in database yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}