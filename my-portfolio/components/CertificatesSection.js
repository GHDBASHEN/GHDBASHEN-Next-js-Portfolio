import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

const CertificateCard = ({ cert, index, isDarkMode, onImageClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`h-full transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Container: Stretched to full height with sci-fi grid overlay and border glowing on hover */}
      <div className={`group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
        isDarkMode 
          ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]' 
          : 'bg-white border-slate-200 hover:border-cyan-500/40 shadow-md'
      }`}>
        
        {/* Top Segment: Certificate Display Screen */}
        <div className="relative">
          {/* Main Display Window */}
          <div 
            className={`relative h-52 w-full overflow-hidden cursor-pointer border-b ${
              isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}
            onClick={() => onImageClick(cert.imageUrl)}
          >
            <Image
              src={cert.imageUrl}
              alt={cert.title}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-102"
            />
            
            {/* HUD Scanning Layer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Action Magnifier Icon */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="p-3 rounded-full bg-slate-900/90 border border-cyan-500/50 text-cyan-400 shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Core Text Info Area (Fixed Double Padding Issue here) */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-500 text-[10px] font-mono font-bold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                {cert.issuer}
              </span>
              <span className={`text-xs font-mono font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {cert.issueDate}
              </span>
            </div>

            <h3 className={`text-xl font-bold tracking-tight mb-3 group-hover:text-cyan-400 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {cert.title}
            </h3>

            {cert.description && (
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'}`}>
                {cert.description}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Segment: Interactive Link Action Dock */}
        <div className={`px-6 pb-6 pt-2 mt-auto border-t border-transparent flex items-center justify-between`}>
          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 font-bold uppercase tracking-wider">SECURE_VERIFIED</span>
          </div>

          {cert.certificateUrl && (
            <a 
              href={cert.certificateUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/80 px-3 py-1.5 rounded-md border border-cyan-500/20 transition-all duration-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
            >
              LAUNCH LINK
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
        </div>

        {/* Space Hull Corner Aesthetic Brackets */}
        <div className="absolute top-2 left-2 border-t border-l border-slate-800 w-2 h-2 opacity-40 group-hover:border-cyan-400 group-hover:opacity-100 transition-colors pointer-events-none" />
        <div className="absolute top-2 right-2 border-t border-r border-slate-800 w-2 h-2 opacity-40 group-hover:border-cyan-400 group-hover:opacity-100 transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

export default function CertificatesSection({ certificates }) {
  const { isDarkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="certificates" className="relative py-24 overflow-hidden">
      <AnimatedBackground />
      
      {/* Top Border Laser Line Accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />
      
      {/* Image Modal Architecture */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 md:p-10 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-slate-400 hover:text-cyan-400 transition-colors z-[110] bg-slate-900/80 p-2 rounded-full border border-slate-800"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center p-2 border border-slate-800/60 rounded-2xl bg-slate-900/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <Image 
              src={selectedImage} 
              alt="Full view terminal" 
              fill 
              className="object-contain p-2 rounded-xl"
              priority
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-mono tracking-[0.3em] text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20 mb-3">
            VERIFIED CREDENTIALS 🛰️
          </div>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${
            isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300' : 'text-slate-900'
          }`}>
            Certificates
          </h2>
        </div>
        
        {certificates && certificates.length > 0 ? (
          /* Enforced grid with items-stretch layout structure */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {certificates.map((cert, index) => (
              <CertificateCard 
                key={cert._id || index} 
                cert={cert} 
                index={index} 
                isDarkMode={isDarkMode} 
                onImageClick={setSelectedImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 max-w-md mx-auto">
            <p className="text-slate-500 font-mono text-sm italic">No verified database logs found.</p>
          </div>
        )}
      </div>
    </section>
  );
}