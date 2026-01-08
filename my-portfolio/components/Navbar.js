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

  const AuthLinks = () => (
    <>
      {isLoggedIn ? (
        <>
          <Link
            href="/admin"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-left w-full md:w-auto ml-0 md:ml-4 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/admin/login"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
          onClick={() => setIsOpen(false)}
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
        <div className="hidden md:flex items-center">
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
      {/* We keep a dark background HERE so the links are readable when the menu is open */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4 pb-4 border-t border-gray-700 bg-black/80 rounded-lg p-2`}>
        <div className="flex flex-col space-y-2 mt-2">
           <AuthLinks />
        </div>
      </div>
    </nav>
  );
}