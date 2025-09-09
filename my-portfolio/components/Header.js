import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isButtonOnLeft, setIsButtonOnLeft] = useState(false);
    const [isGameActive, setIsGameActive] = useState(true); // New state to control the game
    const router = useRouter();
    const gameTimerRef = useRef(null); // Ref to hold the timer

    useEffect(() => {
        const loggedInStatus = Cookies.get('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');

        // Cleanup the timer if the component unmounts to prevent memory leaks
        return () => {
            clearTimeout(gameTimerRef.current);
        };
    }, [router.asPath]);

    const handleLogout = async () => {
        // ... (logout logic is the same)
        const response = await fetch('/api/auth/logout');
        if (response.ok) {
            setIsLoggedIn(false);
            router.push('/admin/login');
        }
    };

    const handleButtonHover = () => {
        // Only run the logic if the game is active
        if (isGameActive) {
            // If this is the first time hovering, start the 10-second timer
            if (!gameTimerRef.current) {
                gameTimerRef.current = setTimeout(() => {
                    setIsGameActive(false); // End the game
                    setIsButtonOnLeft(false); // Force button to the right
                }, 10000); // 10 seconds
            }
            // Make the button jump
            setIsButtonOnLeft((prevState) => !prevState);
        }
    };

    // This is the component for our moving button
    const EvasiveLoginButton = () => (
        <div className="transition-opacity duration-300 ease-in-out">
            <Link
                href="/admin/login"
                onMouseEnter={handleButtonHover} // Trigger the game logic on hover
                className="bg-cyan-600 text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-cyan-700 transition-colors"
            >
                Admin Login
            </Link>
        </div>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-10 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Left Side */}
                <div className="flex-1 flex justify-start">
                    {!isLoggedIn && isButtonOnLeft && isGameActive && <EvasiveLoginButton />}
                </div>

                {/* Centered Navigation Links */}
                <nav className="flex-none flex justify-center">
                    <div className="bg-gray-800 bg-opacity-90 px-3 py-2 rounded-full">
                        <ul className="flex items-center space-x-2 text-sm">
                            <li><a href="#about" className="text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors">About</a></li>
                            <li><a href="#services" className="text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors">Services</a></li>
                            <li><a href="#projects" className="text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors">Projects</a></li>
                        </ul>
                    </div>
                </nav>

                {/* Right Side */}
                <div className="flex-1 flex justify-end">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-red-600 ...">Logout</button>
                    ) : (
                        (!isButtonOnLeft || !isGameActive) && <EvasiveLoginButton />
                    )}
                </div>
            </div>
        </header>
    );
}