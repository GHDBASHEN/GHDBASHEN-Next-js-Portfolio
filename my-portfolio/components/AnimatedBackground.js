import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
    const { isDarkMode } = useTheme();
    const canvasRef = useRef(null);

    useEffect(() => {
        // Only run the interactive canvas system if dark mode is active (for the space theme)
        if (!isDarkMode) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let particles = [];
        const mouse = { x: null, y: null, radius: 150 }; // Radius of mouse interactive influence

        // Handle resizing the space boundary
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Particle Structure Design
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x; // Lock original position for anti-gravity elasticity
                this.baseY = y;
                this.size = Math.random() * 2 + 0.5; // Star size variety
                this.density = (Math.random() * 30) + 10; // Floating weightiness
                this.alpha = Math.random() * 0.6 + 0.2; // Twinkle brightness
                this.colorVelocity = Math.random() * 0.02 + 0.005;
            }

            draw() {
                ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`; // Cyan space particles
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Twinkle effect (subtle pulsing glow)
                this.alpha += this.colorVelocity;
                if (this.alpha > 0.8 || this.alpha < 0.2) {
                    this.colorVelocity = -this.colorVelocity;
                }

                // Anti-gravity Physics Calculation (Mouse following / Repulsion)
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                // Max distance influence calculations
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;

                if (distance < mouse.radius) {
                    // Create an anti-gravity pull/push adjustment
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;
                    
                    // Pulling towards mouse smoothly
                    this.x += directionX * 0.1;
                    this.y += directionY * 0.1;
                } else {
                    // Smoothly drift back to baseline floating coordinates when mouse leaves
                    if (this.x !== this.baseX) {
                        let dxBase = this.x - this.baseX;
                        this.x -= dxBase / 20;
                    }
                    if (this.y !== this.baseY) {
                        let dyBase = this.y - this.baseY;
                        this.y -= dyBase / 20;
                    }
                }
            }
        }

        // Populate the star field based on screen density
        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 4000); 
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        // Smooth Animation Frame loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        // Track tracking mouse coordinate updates
        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        // Listeners initialization
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        
        resizeCanvas();
        animate();

        // Cleanup resources
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    if (!isDarkMode) {
        return (
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-cyan-50/40 to-blue-50 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px]" />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 bg-[#030712] pointer-events-none overflow-hidden z-0 select-none">
            
            {/* 1. HTML5 INTERACTIVE SPACE CANVAS CONTAINER */}
            <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />

            {/* 2. GLOWING SPACE NEBULAE CLOUDS */}
            <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-950/30 via-purple-900/15 to-transparent rounded-full blur-[140px]" />
            <div className="absolute -top-40 -right-20 w-[700px] h-[700px] bg-gradient-to-bl from-emerald-950/20 via-indigo-900/15 to-transparent rounded-full blur-[160px]" />

            {/* 3. HARDWARE TELEMETRY GRID */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d404_1px,transparent_1px),linear-gradient(to_bottom,#06b6d404_1px,transparent_1px)] bg-[size:6rem_6rem]" />
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-1/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />
        </div>
    );
}