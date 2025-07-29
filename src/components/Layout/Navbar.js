import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiCalendar, FiSettings } from 'react-icons/fi';
import Logo from '@/components/common/Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const { user, host, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const navLinkClasses = (path) =>
    `${router.pathname === path
      ? 'text-primary-500 border-primary-500'
      : 'text-gray-500 hover:text-primary-500 border-transparent'
    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300`;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Logo withTagline={false} className="h-10" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={navLinkClasses('/')}>
                Home
              </Link>
              <Link href="/venues" className={navLinkClasses('/venues')}>
                Venues
              </Link>
              <Link href="/services" className={navLinkClasses('/services')}>
                Services
              </Link>
              <div 
                className="relative flex items-center"
                onMouseEnter={() => setIsAboutMenuOpen(true)}
                onMouseLeave={() => setIsAboutMenuOpen(false)}
              >
                <button className={navLinkClasses('/about')}>
                  <span>About</span>
                </button>
                {isAboutMenuOpen && (
                  <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Link href="/about#overview" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Overview
                      </Link>
                      <Link href="/about#features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Features
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/contact" className={navLinkClasses('/contact')}>
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user || host ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleProfile}
                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                      <FiUser className="h-5 w-5" />
                    </div>
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      Signed in as
                      <p className="font-medium text-gray-900">
                        {user ? user.fullName : host ? host.businessName : ''}
                      </p>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <Link
                      href={user ? "/dashboard" : "/host/dashboard"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <FiHome className="mr-2" /> Dashboard
                      </div>
                    </Link>
                    <Link
                      href={user ? "/bookings" : "/host/bookings"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" /> {user ? "My Bookings" : "Manage Bookings"}
                      </div>
                    </Link>
                    <Link
                      href={user ? "/profile" : "/host/profile"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <FiSettings className="mr-2" /> Settings
                      </div>
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <FiLogOut className="mr-2" /> Sign out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-600 hover:bg-gray-200' : 'text-white hover:bg-white/20'}`}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="btn-primary-outline"
                >
                  Sign Up
                </Link>
                <Link
                  href="/host/register"
                  className="btn-primary"
                >
                  Become a Host
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${isScrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-sm">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`${router.pathname === '/' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Home
            </Link>
            <Link
              href="/venues"
              className={`${router.pathname.startsWith('/venues') ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Venues
            </Link>
            <Link
              href="/services"
              className={`${router.pathname.startsWith('/services') ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Services
            </Link>
            <Link
              href="/about"
              className={`${router.pathname === '/about' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              About
            </Link>
            <Link
              href="/contact"
              className={`${router.pathname === '/contact' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
