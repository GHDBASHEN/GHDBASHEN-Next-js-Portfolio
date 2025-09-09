import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import useMousePosition from '../hooks/useMousePosition'; // Import the new hook

export default function AboutSection() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get the live mouse position
  const { x, y } = useMousePosition();
  
  // Calculate movement based on mouse position relative to the center of the screen
  // We check for 'window' to prevent errors during server-side rendering
  const moveX1 = typeof window !== 'undefined' ? (x - window.innerWidth / 2) / 40 : 0;
  const moveY1 = typeof window !== 'undefined' ? (y - window.innerHeight / 2) / 40 : 0;
  
  const moveX2 = typeof window !== 'undefined' ? (x - window.innerWidth / 2) / 25 : 0;
  const moveY2 = typeof window !== 'undefined' ? (y - window.innerHeight / 2) / 25 : 0;


  return (
    <section id="about" className="min-h-screen flex items-center overflow-hidden"> {/* Added overflow-hidden */}
      <div ref={sectionRef} className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content with scroll and parallax animations */}
          <div className={`text-left transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 
              className="text-4xl font-bold mb-4 text-white transition-transform duration-200 ease-out"
              style={{ transform: `translate(${moveX1}px, ${moveY1}px)` }}
            >
              About Me
            </h2>
            <p 
              className="text-lg text-gray-400 mb-8 transition-transform duration-200 ease-out"
              style={{ transform: `translate(${moveX1 * 0.8}px, ${moveY1 * 0.8}px)`, transitionDelay: '50ms' }}
            >
              I'm a passionate developer with experience in building modern, responsive, and scalable web applications. I love tackling challenges and continuously learning new technologies to bring ideas to life.
            </p>
            <div 
              className="transition-transform duration-200 ease-out"
              style={{ transform: `translate(${moveX1 * 0.6}px, ${moveY1 * 0.6}px)`, transitionDelay: '100ms' }}
            >
              <a 
                href="/Resume.pdf"
                download="My-Resume.pdf"
                className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Download My Resume
              </a>
            </div>
          </div>

          {/* Right Column: Image with scroll, parallax, and hover animations */}
          <div className="flex justify-center">
            <div 
              className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ transform: `translate(${moveX2}px, ${moveY2}px)` }}
            >
              <Image
                src="/profile.png"
                alt="A picture of me"
                width={350}
                height={350}
                className="rounded-full shadow-2xl object-cover transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}