import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loggedInStatus = Cookies.get("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, [router.asPath]);

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout");
    if (response.ok) {
      setIsLoggedIn(false);
      setIsOpen(false); 
      router.push("/admin/login");
    }
  };

  const NavLinks = ({ mobile = false, onClick = () => {} }) => (
    <>
      <Link
        href="/#home"
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
        onClick={onClick}
      >
        Home
      </Link>
      <Link
        href="/#about"
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
        onClick={onClick}
      >
        About
      </Link>
      <Link
        href="/#services"
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
        onClick={onClick}
      >
        Services
      </Link>
      <Link
        href="/#certificates"
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
        onClick={onClick}
      >
        Certifications
      </Link>
      <Link
        href="/#awards"
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
        onClick={onClick}
      >
        Awards
      </Link>
      <Link
        href="/#projects"
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
        onClick={onClick}
      >
        Projects
      </Link>
    </>
  );

  const AuthLinks = ({ mobile = false, onClick = () => {} }) => (
    <>
      {isLoggedIn ? (
        <>
          <Link
            href="/admin"
            className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
            onClick={onClick}
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              handleLogout();
              onClick();
            }}
            className={`text-left ml-0 md:ml-4 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 ${mobile ? 'w-full' : 'md:w-auto'}`}
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/admin/login"
          className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : ''}`}
          onClick={onClick}
        >
          Admin Login
        </Link>
      )}
    </>
  );

  return (
    // UPDATED: 'fixed' (floats on top), 'bg-transparent' (clear), 'z-50' (always on top)
    <nav className="fixed top-0 w-full z-50 p-4 bg-transparent transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          My Portfolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLinks />
          <div className="h-6 w-px bg-gray-700 mx-2"></div>
          <AuthLinks />
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4 pb-4 border-t border-gray-700 bg-black/90 backdrop-blur-md rounded-xl p-4 shadow-2xl transition-all duration-300`}>
        <div className="flex flex-col space-y-1">
           <NavLinks mobile onClick={() => setIsOpen(false)} />
           <div className="h-px w-full bg-gray-800 my-2"></div>
           <AuthLinks mobile onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
}