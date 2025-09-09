// File: components/Layout.js

// ✅ ENSURE THIS IMPORT IS CORRECT (no curly braces)
import Navbar from './Navbar'; 

// ✅ ENSURE THIS LINE SAYS "export default"
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}