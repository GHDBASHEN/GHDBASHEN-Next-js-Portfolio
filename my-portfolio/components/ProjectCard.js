import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

export default function ProjectCard({ project, index }) {
  const { isDarkMode } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`h-full flex flex-col transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* CARD BODY CONTAINER: Enforced flex direction and uniform sizing handles */}
      <div className={`group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
        isDarkMode 
          ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]' 
          : 'bg-white border-slate-200 hover:border-cyan-500/40 shadow-md'
      }`}>
        
        {/* Core Upper Card Section */}
        <div>
          {/* Main Visual Display Screen */}
          <div className="relative h-52 w-full overflow-hidden bg-slate-950/20 border-b border-slate-800/20">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              unoptimized={true}
            />
            {/* HUD Scanline Shimmer Screen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Text Content Block */}
          <div className="p-6">
            {/* System Process ID Tag */}
            <div className="flex items-center gap-1.5 mb-3 font-mono text-[10px] font-bold text-cyan-500/80 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              DEPLOYED_PAYLOAD_LOG::{index + 1}
            </div>

            <h3 className={`text-2xl font-black tracking-tight mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-100 group-hover:text-cyan-400' : 'text-slate-900'
            }`}>
              {project.name}
            </h3>

            <p className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'
            }`}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Lower Core Action Lock Room (Enforced Button Baseline) */}
        <div className="px-6 pb-6 pt-2">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 font-mono font-bold text-sm bg-cyan-950/40 hover:bg-cyan-600 text-cyan-400 hover:text-white py-3 px-4 rounded-xl border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] group/btn"
          >
            INITIALIZE DEPLOYMENT
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Hull Mechanical Hardware Brackets */}
        <div className="absolute top-2 left-2 border-t border-l border-slate-800 w-2 h-2 opacity-40 group-hover:border-cyan-400 group-hover:opacity-100 transition-colors pointer-events-none" />
        <div className="absolute top-2 right-2 border-t border-r border-slate-800 w-2 h-2 opacity-40 group-hover:border-cyan-400 group-hover:opacity-100 transition-colors pointer-events-none" />
      </div>
    </div>
  );
}