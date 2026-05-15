"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./Button";
import Cookies from "js-cookie";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/search", label: "Products" },
    { path: "/pricing", label: "Vendor Pricing" },
    { path: "/contact-us", label: "Contact Us" },
    { path: "/become-vendor", label: "Apply for Vendor" },
  ];

  const authNavigationItems = [
    { path: "/profile", label: "Profile" },
  ];

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <>
      <div className="h-24"></div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg w-full">
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            {/* Logo section */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img
                  src="/logo.jpg"
                  alt="SwapShare Logo"
                  className="w-24 h-auto"
                />
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center text-sm space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-white font-semibold px-4 py-2 rounded-md transition duration-200 hover:bg-blue-900 ${
                    pathname === item.path ? "bg-blue-900 italic" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated &&
                authNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`text-white font-semibold px-4 py-2 rounded-md transition duration-200 hover:bg-blue-900 ${
                      pathname === item.path ? "bg-blue-900 italic" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>

            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/authentication?login"
                    className="text-white font-semibold px-4 py-2 rounded-md transition duration-200 hover:bg-blue-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/authentication?signup"
                    className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-950 transition duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-950 transition duration-200"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
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
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-2 bg-primary border-t border-blue-900">
            {navigationItems.map((item) => (
              <Link key={item.path} href={item.path} className="block">
                <div
                  className={`text-white font-semibold p-3 rounded-md transition hover:bg-blue-900 ${
                    pathname === item.path ? "bg-blue-900 italic" : ""
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            {isAuthenticated &&
              authNavigationItems.map((item) => (
                <Link key={item.path} href={item.path} className="block">
                  <div
                    className={`text-white font-semibold p-3 rounded-md transition hover:bg-blue-900 ${
                      pathname === item.path ? "bg-blue-900 italic" : ""
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-blue-900">
              {!isAuthenticated ? (
                <>
                  <Link href="/authentication?login" className="block">
                    <div className="text-white font-semibold p-3 rounded-md transition hover:bg-blue-900">
                      Login
                    </div>
                  </Link>
                  <Link href="/authentication?signup" className="block">
                    <div className="bg-blue-900 text-white font-semibold p-3 rounded-md transition hover:bg-blue-950">
                      Sign Up
                    </div>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-white font-semibold p-3 rounded-md transition hover:bg-blue-900 w-full text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
