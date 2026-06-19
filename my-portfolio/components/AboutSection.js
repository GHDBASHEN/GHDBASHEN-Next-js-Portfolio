import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext'; 
import AnimatedBackground from './AnimatedBackground'; 

export default function AboutSection() {
    const { isDarkMode } = useTheme(); 
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
        const x = (e.clientX - left - width / 2) / 15; 
        const y = (e.clientY - top - height / 2) / 15;
        setMouseCoords({ x, y });
    };

    const handleMouseLeave = () => {
        setMouseCoords({ x: 0, y: 0 });
    };

    return (
        <section
            id="about"
            className={`relative min-h-screen flex items-center overflow-hidden transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-slate-950 text-white' 
                    : 'bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50 text-slate-900'
            }`}
        >
            {/* Background elements */}
            <AnimatedBackground />

            {/* FIXED HUD BLUEPRINT GRID OVERLAY: 
              Added a top mask boundary (from transparent at 0px to full black at 120px) 
              to completely clean up and shield your fixed header from background grid overlap.
            */}
            <div 
                className={`absolute inset-0 bg-[size:4rem_4rem] pointer-events-none transition-all duration-500`}
                style={{
                    backgroundImage: isDarkMode
                        ? `linear-gradient(to right, #0891b212 1px, transparent 1px), linear-gradient(to bottom, #0891b212 1px, transparent 1px)`
                        : `linear-gradient(to right, #0284c718 1px, transparent 1px), linear-gradient(to bottom, #0284c718 1px, transparent 1px)`,
                    maskImage: `linear-gradient(to bottom, transparent 0px, black 120px), radial-gradient(ellipse 60% 50% at 50% 50%, black 70%, transparent 100%)`,
                    WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, black 120px), radial-gradient(ellipse 60% 50% at 50% 50%, black 70%, transparent 100%)`,
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in'
                }}
            />

            <div ref={inViewRef} className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Interactive Floating Astronaut Image */}
                    <div
                        className={`flex justify-center transition-all duration-1000 ease-out ${
                            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
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
                            className={`relative group rounded-3xl p-2 transition-all duration-500 ${
                                isDarkMode 
                                    ? 'bg-gradient-to-br from-cyan-500 via-purple-500 to-emerald-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]' 
                                    : 'bg-gradient-to-br from-sky-400 via-sky-300 to-amber-400 shadow-[0_10px_30px_rgba(2,132,199,0.15)] hover:shadow-[0_15px_40px_rgba(2,132,199,0.3)]'
                            }`}
                        >
                            {/* Inner Glass Box */}
                            <div className={`relative rounded-2xl overflow-hidden p-4 ${
                                isDarkMode ? 'bg-slate-900/90' : 'bg-white/80 backdrop-blur-md'
                            }`}>
                                <div className="relative rounded-xl overflow-hidden aspect-[4/5] w-[340px] sm:w-[380px] md:w-[420px] max-w-full bg-slate-100">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Astronaut Bio Image"
                                        fill
                                        sizes="(max-width: 768px) 340px, 420px"
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105 filter contrast-105"
                                        priority
                                    />

                                    {/* Sci-fi Overlay scanning lines */}
                                    <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-transparent animate-pulse ${
                                        isDarkMode ? 'via-cyan-500/10' : 'via-sky-400/20'
                                    }`} />
                                    <div className={`absolute top-2 left-2 border-t-2 border-l-2 w-4 h-4 ${isDarkMode ? 'border-cyan-400' : 'border-sky-500'}`} />
                                    <div className={`absolute top-2 right-2 border-t-2 border-r-2 w-4 h-4 ${isDarkMode ? 'border-cyan-400' : 'border-sky-500'}`} />
                                    <div className={`absolute bottom-2 left-2 border-b-2 border-l-2 w-4 h-4 ${isDarkMode ? 'border-cyan-400' : 'border-sky-500'}`} />
                                    <div className={`absolute bottom-2 right-2 border-b-2 border-r-2 w-4 h-4 ${isDarkMode ? 'border-cyan-400' : 'border-sky-500'}`} />
                                </div>
                            </div>

                            {/* Floating decorative UI Badge */}
                            <div className={`absolute -bottom-4 right-4 border text-xs px-3 py-1.5 rounded-md font-mono shadow-lg backdrop-blur-md transition-all ${
                                isDarkMode 
                                    ? 'bg-slate-900 border-cyan-500/50 text-cyan-400' 
                                    : 'bg-white border-sky-300 text-sky-600 font-bold'
                            }`}>
                                SYS: ACTIVE 🛰️
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Mission Control Text Content */}
                    <div className={`text-left transition-all duration-1000 ease-out delay-200 ${
                        inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}>
                        
                        {/* Upper Pilot System Tag */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-widest uppercase mb-4 transition-all ${
                            isDarkMode 
                                ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                                : 'border-sky-300 bg-sky-400/10 text-sky-700 font-bold shadow-sm'
                        }`}>
                            <span className={`w-2 h-2 rounded-full animate-ping ${isDarkMode ? 'bg-cyan-400' : 'bg-sky-500'}`} />
                            Mission Commander Log
                        </div>

                        <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${
                            isDarkMode 
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300' 
                                : 'text-slate-900'
                        }`}>
                            About Me
                        </h2>

                        <p className={`mb-8 leading-relaxed text-base font-medium ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                            I am a highly motivated BICT(Hons) undergraduate at the University of Ruhuna with a strong foundation in full-stack web development, object-oriented programming, and database management.
                            <br /><br />
                            Passionate about navigating complex codebases and discovering flawless engineering architectures, I build scalable systems utilizing modern tech stacks. Just like space exploration, I enjoy venturing into unknown technical landscapes to conquer challenging digital issues.
                        </p>

                        {/* Interactive HUD Data Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8 font-mono">
                            {[
                                { label: 'NAME', value: 'G.H.D.B. Ashen' },
                                { label: 'BASE ORIGIN', value: 'Kalutara, LK' },
                                { label: 'COMMS LINK', value: 'ghdbashen@gmail.com' },
                                { label: 'ORBITAL CGPA', value: '3.16 / 4.00' }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                                        isDarkMode
                                            ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-950 shadow-inner'
                                            : 'bg-white/80 border-sky-200 hover:border-sky-400 hover:bg-sky-50/50 shadow-sm'
                                    }`}
                                >
                                    <span className={`block text-[10px] tracking-wider mb-1 font-bold ${
                                        isDarkMode ? 'text-cyan-500' : 'text-sky-600'
                                    }`}>
                                        {item.label}
                                    </span>
                                    <span className={`text-sm font-semibold truncate block ${
                                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
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
                            className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-bold font-mono rounded-lg group transition-all duration-300 ${
                                isDarkMode
                                    ? 'text-white bg-gradient-to-br from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] focus:ring-4 focus:ring-cyan-800'
                                    : 'text-slate-900 bg-gradient-to-br from-sky-400 to-sky-600 shadow-[0_4px_15px_rgba(2,132,199,0.15)] hover:shadow-[0_6px_25px_rgba(2,132,199,0.35)]'
                            }`}
                        >
                            <span className={`relative px-8 py-3.5 transition-all duration-300 rounded-md group-hover:bg-opacity-0 ${
                                isDarkMode 
                                    ? 'bg-slate-950 text-white' 
                                    : 'bg-white text-sky-700 group-hover:text-white'
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