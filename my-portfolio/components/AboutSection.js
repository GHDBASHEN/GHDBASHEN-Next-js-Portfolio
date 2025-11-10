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

    // This handler updates the spotlight's position
    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
        sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    // This effect starts and stops the image flipping
    useEffect(() => {
        if (inView) {
            setIsFlipping(false);
            flipTimeoutRef.current = setTimeout(() => {
                setIsFlipping(false);
            }, 3000); // 3 seconds
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

                    {/* Left Column: Image */}
                    <div className={`flex justify-center transition-all duration-1000 ease-out ${inView ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
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

                    {/* Right Column: Text Content */}
                    <div className={`text-left transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <p className="text-cyan-400 font-semibold mb-2">MY INTRO</p>
                        <h2 className="text-4xl font-bold mb-4 text-white">
                            About Me
                        </h2>
                        <p className="text-gray-400 mb-6">
                            I am a highly motivated BICT(Hons)  undergraduate at the University of Ruhuna with a strong foundation in full-stack web development, object-oriented programming, and database management.
                            Passionate about building scalable and user-friendly applications, I enjoy solving real-world problems using modern technologies and continuously improving my skills in both front-end and back-end development.
                            I have hands-on experience with frameworks such as React, Express.js, and tools like MySQL, and I am constantly exploring new technologies to expand my knowledge.
                            My goal is to contribute to innovative projects, collaborate with teams, and grow into a well-rounded software engineer capable of making impactful contributions in the tech industry.
                        </p>

                        <div className="space-y-2 mb-8">
                            <p className="text-gray-300"><span className="font-bold w-20 inline-block text-gray-100">Name</span> : G.H.D.B. Ashen</p>
                            <p className="text-gray-300"><span className="font-bold w-20 inline-block text-gray-100">From</span> : Kalutara  </p>
                            <p className="text-gray-300"><span className="font-bold w-20 inline-block text-gray-100">Email</span> : ghdbashen@gmail.com</p>
                            <p className="text-gray-300"><span className="font-bold w-20 inline-block text-gray-100">CGPA</span> : 3.17</p>
                        </div>

                        <a
                            href="/Resume.pdf"
                            download="My-Resume.pdf"
                            className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors duration-300 shadow-lg"
                        >
                            Download CV
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}

