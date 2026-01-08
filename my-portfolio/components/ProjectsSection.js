import ProjectCard from './ProjectCard';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

export default function ProjectsSection({ projects }) {
  const { isDarkMode } = useTheme();

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      
      {/* 1. Animated Gradient Background */}
      <AnimatedBackground />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}