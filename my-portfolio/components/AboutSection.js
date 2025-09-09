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
      setIsFlipping(true);

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
            <div>
              <a 
                href="/Resume.pdf"
                download="My-Resume.pdf"
                className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Download My Resume
              </a>
            </div>
          </div>

          {/* Right Column: Image with Flipping Animation and Gradient Effect */}
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