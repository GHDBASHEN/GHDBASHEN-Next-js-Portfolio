import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isButtonOnLeft, setIsButtonOnLeft] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false); // New state for tooltip
  const router = useRouter();
  
  // Refs to hold the two separate timers
  const gameTimerRef = useRef(null);
  const tooltipTimerRef = useRef(null);
  const timersStartedRef = useRef(false); // Ref to ensure timers start only once

  useEffect(() => {
    const loggedInStatus = Cookies.get('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
    
    // Cleanup both timers if the component unmounts
    return () => {
      clearTimeout(gameTimerRef.current);
      clearTimeout(tooltipTimerRef.current);
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
    // Start timers only on the very first hover
    if (!timersStartedRef.current) {
      timersStartedRef.current = true;

      // 1. Show tooltip and start its 3-second timer
      setShowTooltip(true);
      tooltipTimerRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 3000); // 3 seconds

      // 2. Start the 10-second game timer for movement
      gameTimerRef.current = setTimeout(() => {
        setIsGameActive(false);
        setIsButtonOnLeft(false);
      }, 10000); // 10 seconds
    }

    // Make the button jump if the game is still active
    if (isGameActive) {
      setIsButtonOnLeft((prevState) => !prevState);
    }
  };

  const EvasiveButtonWithTooltip = () => {
    const tooltipPositionClasses = isButtonOnLeft ? 'left-full ml-3' : 'right-full mr-3';

    return (
      <div className="relative flex items-center">
        {/* The tooltip now uses its own 'showTooltip' state */}
        {showTooltip && (
          <div className={`absolute whitespace-nowrap bg-gray-700 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 ${tooltipPositionClasses}`}>
            Catch me if you can!
          </div>
        )}
        <Link
          href="/admin/login"
          onMouseEnter={handleButtonHover}
          className="bg-cyan-600 text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-cyan-700 transition-colors"
        >
          Admin Login
        </Link>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Side */}
        <div className="flex-1 flex justify-start">
          {!isLoggedIn && isButtonOnLeft && isGameActive && <EvasiveButtonWithTooltip />}
        </div>

        {/* Centered Navigation */}
        <nav className="flex-none flex justify-center">
            <ul className="flex items-center space-x-2 text-sm">
               <li><a href="#home" className="text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors">Services</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors">Projects</a></li>
            </ul>
        </nav>

        {/* Right Side */}
        <div className="flex-1 flex justify-end">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-red-700 transition-colors">Logout</button>
          ) : (
            (!isButtonOnLeft || !isGameActive) && <EvasiveButtonWithTooltip />
          )}
        </div>
      </div>
    </header>
  );
}