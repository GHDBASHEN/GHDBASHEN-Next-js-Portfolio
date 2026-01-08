import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext'; // Import Theme Hook
import AnimatedBackground from './AnimatedBackground'; // Import Background

export default function AboutSection() {
    const { isDarkMode } = useTheme(); // Get theme state
    const { ref: inViewRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [isFlipping, setIsFlipping] = useState(false);
    const flipTimeoutRef = useRef(null);

    useEffect(() => {
        if (inView) {
            setIsFlipping(false);
            flipTimeoutRef.current = setTimeout(() => {
                setIsFlipping(false);
            }, 3000); 
        }
        return () => {
            clearTimeout(flipTimeoutRef.current);
        };
    }, [inView]);

    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* 1. REPLACE VIDEO WITH ANIMATED BACKGROUND */}
            <AnimatedBackground />

            <div ref={inViewRef} className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Image */}
                    <div className={`flex justify-center transition-all duration-1000 ease-out ${inView ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className={`relative rounded-full overflow-hidden ${isFlipping ? 'animate-flip-quick gradient-overlay' : ''}`}>
                            <Image
                                src="/profile.jpg" // Kept your .jpg change
                                alt="A picture of me"
                                width={350}
                                height={350}
                                className="rounded-full shadow-2xl object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className={`text-left transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <p className="text-cyan-500 font-semibold mb-2">MY INTRO</p>
                        <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            About Me
                        </h2>
                        <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            I am a highly motivated BICT(Hons) undergraduate at the University of Ruhuna with a strong foundation in full-stack web development, object-oriented programming, and database management.
                            Passionate about building scalable and user-friendly applications, I enjoy solving real-world problems using modern technologies and continuously improving my skills in both front-end and back-end development.
                            I have hands-on experience with frameworks such as React, Express.js, and tools like MySQL, and I am constantly exploring new technologies to expand my knowledge.
                            My goal is to contribute to innovative projects, collaborate with teams, and grow into a well-rounded software engineer capable of making impactful contributions in the tech industry.
                        </p>

                        <div className={`space-y-2 mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <p><span className={`font-bold w-20 inline-block ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Name</span> : G.H.D.B. Ashen</p>
                            <p><span className={`font-bold w-20 inline-block ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>From</span> : Kalutara  </p>
                            <p><span className={`font-bold w-20 inline-block ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Email</span> : ghdbashen@gmail.com</p>
                            <p><span className={`font-bold w-20 inline-block ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>CGPA</span> : 3.17</p>
                        </div>

                        <a
                            href="/Resume.pdf"
                            download="My-Resume.pdf"
                            className="inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/50"
                        >
                            Download CV
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}