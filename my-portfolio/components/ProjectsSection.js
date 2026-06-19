import ProjectCard from './ProjectCard';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

export default function ProjectsSection({ projects }) {
  const { isDarkMode } = useTheme();

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      
      {/* Cosmic Navigation Tracker Layer */}
      <AnimatedBackground />

      {/* Cyber Laser Deck Rule Line Accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Module Sector Header Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block text-xs font-mono tracking-[0.3em] text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20 mb-3">
            SYSTEM ARCHITECTURE MATRIX 🛰️
          </div>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-center ${
            isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300' : 'text-slate-900'
          }`}>
            My Projects
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4 rounded-full" />
        </div>
        
        {/* Enforced grid mapping setup targeting items-stretch height syncing */}
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {projects.map((project, index) => (
              <ProjectCard key={project._id || index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 max-w-md mx-auto">
            <p className="text-slate-500 font-mono text-sm italic">No running data cores identified inside deployment log pools.</p>
          </div>
        )}

      </div>
    </section>
  );
}