import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useRef, useState } from 'react';

export default function HomeSection() {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null); // Ref for the image container
  const [rotate, setRotate] = useState({ x: 0, y: 0 }); // State for 3D rotation
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // This handler updates the main section's spotlight effect
  const handleSectionMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // This handler creates the 3D tilt effect on the image
  const handleImageMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateY = (x / rect.width - 0.5) * -20; // Tilt intensity
    const rotateX = (y / rect.height - 0.5) * 20; // Tilt intensity
    
    setRotate({ x: rotateX, y: rotateY });
  };
  
  // Resets the image tilt when the mouse leaves
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };
  
  // Style for the active 3D tilt
  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.05, 1.05, 1.05)`,
    transition: 'transform 0.1s ease-out',
  };

  // Style for when the mouse is not hovering
  const resetStyle = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s ease-out',
  };

  // Helper function for staggered text animations
  const getAnimationClasses = () => {
    return `transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`;
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Spotlight Effect Div */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(14, 165, 233, 0.15), transparent 80%)`,
        }}
      />
      
      <div ref={inViewRef} className="container mx-auto px-6 py-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Animated Text Content */}
          <div>
            <p className={`text-xl text-gray-500 mb-2 ${getAnimationClasses()}`} style={{ transitionDelay: '200ms' }}>
              Hi, I&apos;m Ashen
            </p>
            <h1 className={`text-7xl md:text-8xl font-extrabold text-gray-500 mb-4 tracking-tight ${getAnimationClasses()}`} style={{ transitionDelay: '400ms' }}>
              DEVELOPER
            </h1>
            <p className={`text-lg text-gray-600 mb-8 max-w-md ${getAnimationClasses()}`} style={{ transitionDelay: '600ms' }}>
              I&apos;m an enthusiastic software engineering student passionate about building modern web solutions.
            </p>
            <div className={getAnimationClasses()} style={{ transitionDelay: '800ms' }}>
              <a 
                href="https://www.linkedin.com/in/basith-ashen-a9b38a379/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white font-bold py-3 px-8 rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/50 text-lg"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* Right Column: Animated Image */}
          <div className="absolute bottom-0 right-0 h-full w-1/2 flex items-end justify-center pointer-events-none md:justify-end">
            <div 
              className={`relative w-[600px] h-[700px] transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} 
              style={{ transitionDelay: '500ms' }}
            >
              <div
                ref={imageContainerRef}
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setIsHovered(true)}
                style={isHovered ? tiltStyle : resetStyle}
                className="w-full h-full pointer-events-auto"
              >
                <Image
                  src="/GHDBASHEN.png"
                  alt="A picture of me"
                  fill
                  className="object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
