import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-out border border-gray-700 hover:border-cyan-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }} // Staggered delay
    >
      <div className="relative h-56 w-full">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover"
          unoptimized={true} // Keep this if you still have local firewall issues
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-white">{project.name}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-cyan-600 text-white font-bold py-2 px-4 rounded hover:bg-cyan-700 transition-colors duration-300"
        >
          View Project
        </a>
      </div>
    </div>
  );
}