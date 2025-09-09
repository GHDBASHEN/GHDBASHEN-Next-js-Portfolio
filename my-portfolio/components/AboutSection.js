import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useRef, useState, useEffect } from 'react';

export default function AboutSection() {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionRef = useRef(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipTimeoutRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    if (inView) {
      setIsFlipping(false);
      flipTimeoutRef.current = setTimeout(() => {
        setIsFlipping(false);
      }, 1000); // 3 seconds
    }
    return () => {
      clearTimeout(flipTimeoutRef.current);
    };
  }, [inView]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-900"
    >
      {/* Spotlight Effect Div */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl transition-all duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(14, 165, 233, 0.15), transparent 80%)`,
        }}
      />
      
      <div ref={inViewRef} className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className={`text-left transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-4xl font-bold mb-4 text-white">
              About Me
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              I'm a passionate developer with experience in building modern, responsive, and scalable web applications. I love tackling challenges and continuously learning new technologies to bring ideas to life.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="/Resume.pdf"
                download="My-Resume.pdf"
                className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Download My Resume
              </a>
            </div>

            {/* --- NEW: Social Links Section --- */}
            <div className="flex items-center space-x-6 mt-8">
              {/* GitHub */}
              <a href="https://github.com/GHDBASHEN" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/basith-ashen-a9b38a379/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              {/* Add other social links as needed */}
            </div>

          </div>

          {/* Right Column: Image */}
          <div className={`flex justify-center transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className={`relative rounded-full overflow-hidden ${isFlipping ? 'animate-flip-quick gradient-overlay' : ''}`}>
                <Image
                src="/profile.png"
                alt="A picture of me"
                width={350}
                height={350}
                className="rounded-full shadow-2xl object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}