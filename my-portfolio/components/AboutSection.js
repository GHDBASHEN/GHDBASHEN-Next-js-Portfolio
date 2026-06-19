import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Import Theme Hook
import AnimatedBackground from './AnimatedBackground'; // Import Background

export default function AboutSection() {
    const { isDarkMode } = useTheme(); // Get theme state
    const { ref: inViewRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Parallax mouse effect states for the "Floating Astronaut" image
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const imageContainerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imageContainerRef.current) return;
        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 15; // sensitivity adjustment
        const y = (e.clientY - top - height / 2) / 15;
        setMouseCoords({ x, y });
    };

    const handleMouseLeave = () => {
        setMouseCoords({ x: 0, y: 0 });
    };

    return (
        <section
            id="about"
            className={`relative min-h-screen flex items-center overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'
                }`}
        >
            {/* Background elements */}
            <AnimatedBackground />

            {/* Futuristic Grid Overlay Hint */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b210_1px,transparent_1px),linear-gradient(to_bottom,#0891b210_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div ref={inViewRef} className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Interactive Floating Astronaut Image */}
                    <div
                        className={`flex justify-center transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}
                    >
                        <div
                            ref={imageContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transform: `rotateY(${mouseCoords.x}deg) rotateX(${-mouseCoords.y}deg) translateY(${-mouseCoords.y * 0.5}px)`,
                                transition: mouseCoords.x === 0 ? 'transform 0.5s ease' : 'none',
                                transformStyle: 'preserve-3d'
                            }}
                            className="relative group rounded-3xl p-2 bg-gradient-to-br from-cyan-500 via-purple-500 to-emerald-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-shadow duration-500"
                        >
                            {/* Inner Glass Box - Increased padding slightly */}
                            <div className={`relative rounded-2xl overflow-hidden ${isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'} p-4`}>

                                {/* CHANGED: Swapped 'aspect-square' for a taller aspect ratio (aspect-[4/5]) and increased width limits */}
                                <div className="relative rounded-xl overflow-hidden aspect-[4/5] w-[340px] sm:w-[380px] md:w-[420px] max-w-full">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Astronaut Bio Image"
                                        fill
                                        sizes="(max-width: 768px) 340px, 420px"
                                        /* CHANGED: Added object-top to ensure your face/head isn't cut off at the top */
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105 filter contrast-105"
                                        priority
                                    />

                                    {/* Sci-fi Overlay scanning lines */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse pointer-events-none" />
                                    <div className="absolute top-2 left-2 border-t-2 border-l-2 border-cyan-400 w-4 h-4" />
                                    <div className="absolute top-2 right-2 border-t-2 border-r-2 border-cyan-400 w-4 h-4" />
                                    <div className="absolute bottom-2 left-2 border-b-2 border-l-2 border-cyan-400 w-4 h-4" />
                                    <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-cyan-400 w-4 h-4" />
                                </div>
                            </div>

                            {/* Floating decorative UI Badge */}
                            <div className="absolute -bottom-4 right-4 bg-slate-900 border border-cyan-500/50 text-cyan-400 text-xs px-3 py-1.5 rounded-md font-mono shadow-lg backdrop-blur-md">
                                SYS: ACTIVE 🛰️
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Mission Control Text Content */}
                    <div className={`text-left transition-all duration-1000 ease-out delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        }`}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            Mission Commander Log
                        </div>

                        <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300' : 'text-slate-900'
                            }`}>
                            About Me
                        </h2>

                        <p className={`mb-8 leading-relaxed text-base font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            I am a highly motivated BICT(Hons) undergraduate at the University of Ruhuna with a strong foundation in full-stack web development, object-oriented programming, and database management.
                            <br /><br />
                            Passionate about navigating complex codebases and discovering flawless engineering architectures, I build scalable systems utilizing modern tech stacks. Just like space exploration, I enjoy venturing into unknown technical landscapes to conquer challenging digital issues.
                        </p>

                        {/* Interactive HUD Data Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8 font-mono">
                            {[
                                { label: 'NAME', value: 'G.H.D.B. Ashen' },
                                { label: 'BASE ORIGIN', value: 'Kalutara, LK' },
                                { label: 'COMMS LINK', value: 'ghdbashen@gmail.com', isEmail: true },
                                { label: 'ORBITAL CGPA', value: '3.16 / 4.00' }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${isDarkMode
                                            ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-950 shadow-inner'
                                            : 'bg-white border-slate-200 hover:border-cyan-500/40 shadow-sm'
                                        }`}
                                >
                                    <span className="block text-[10px] text-cyan-500 tracking-wider mb-1 font-bold">{item.label}</span>
                                    <span className={`text-sm font-semibold truncate block ${isDarkMode ? 'text-slate-200' : 'text-slate-800'
                                        }`} title={item.value}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Eject/Launch Button */}
                        <a
                            href="/Basith Ashen CV.pdf"
                            download="Basith Ashen CV.pdf"
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-bold font-mono text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-purple-600 group-hover:from-cyan-500 group-hover:to-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-800 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300"
                        >
                            <span className={`relative px-8 py-3.5 transition-all duration-300 rounded-md group-hover:bg-opacity-0 ${isDarkMode ? 'bg-slate-950' : 'bg-white'
                                }`}>
                                🚀 GET MISSION BRIEF (CV)
                            </span>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}