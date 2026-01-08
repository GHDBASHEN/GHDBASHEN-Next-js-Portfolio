import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

const servicesData = [
  {
    icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-500 mb-4 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>),
    title: 'Full-Stack Web Development',
    description: 'Building complete web apps from database to UI using modern tech like Next.js, Node.js, and MongoDB.',
  },
  {
    icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-500 mb-4 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9.75 4.5l3-2.25-3-2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    title: 'Java Application Development',
    description: 'Developing robust, enterprise-level backend systems and applications using Java and the Spring Boot framework.',
  },
  {
    icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-500 mb-4 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>),
    title: 'AI Developments',
    description: 'Integrating machine learning models and AI-powered features into applications to create intelligent and automated solutions.',
  },
  {
    icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-500 mb-4 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>),
    title: 'Responsive UI/UX Design',
    description: 'Designing and implementing intuitive and beautiful user interfaces that provide a great experience on any device.',
  },
];

const ServiceCard = ({ service, index }) => {
  const { ref: scrollRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { isDarkMode } = useTheme();
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * -25;
    const rotateX = (y / rect.height - 0.5) * 25;
    setRotate({ x: rotateX, y: rotateY });
  };
  
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05)`,
    transition: 'transform 0.1s ease-out',
  };

  const resetStyle = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.5s ease-out',
  };

  return (
    <div ref={scrollRef} className={`transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={isHovered ? cardStyle : resetStyle}
        // Conditional Class: Dark Mode uses gray-800, Light Mode uses white/90 backdrop
        className={`text-center p-8 rounded-lg shadow-lg border backdrop-blur-sm ${
          isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}
      >
        {service.icon}
        <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{service.description}</p>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const { isDarkMode } = useTheme();

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      
      {/* 1. Animated Gradient Background */}
      <AnimatedBackground />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          What I Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}