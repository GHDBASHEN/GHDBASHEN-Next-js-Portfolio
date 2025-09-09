import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// ✅ ENSURE THIS LINE SAYS "export default"
export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = Cookies.get('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router.asPath]);

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout');
    if (response.ok) {
      setIsLoggedIn(false);
      router.push('/admin/login');
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          My Portfolio
        </Link>
        <div>
          {isLoggedIn ? (
            // --- SHOWS WHEN LOGGED IN ---
            <>
              <Link href="/admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            // --- SHOWS WHEN LOGGED OUT ---
            <Link href="/admin/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}