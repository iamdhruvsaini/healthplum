import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Find Doctor', href: '/find-doctor' },
    { name: 'Appointments', href: '/appointments' },

  ];

  const userLinks = currentUser
    ? [
        {
          name: 'Dashboard',
          href: currentUser.role === 'doctor' ? '/doctor' : '/patient',
        },
        {
          name: 'Profile',
          href: currentUser.role === 'doctor' ? '/doctor/profile' : '/patient/profile',
        },
      ]
    : [];

  const navLinks = [...publicLinks, ...userLinks.slice(0, 1)];
  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className="sticky top-0 z-50 transition-all duration-300 bg-white"
    >
      <div className="mx-auto">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="h-8 w-8 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </motion.div>
              <span className="text-xl font-bold text-primary-600">HealthPlum</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center justify-center">
            {navLinks.map((link) => (
              <motion.div 
                whileHover={{ y: -2 }} 
                key={link.name}
              >
                <Link
                  to={link.href}
                  className={`text-sm font-medium px-1 py-1 relative group transition-all duration-200 ease-in-out ${
                    isActive(link.href)
                      ? 'text-primary-700'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-1 left-0 w-full h-0.5 transform transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-primary-600 scale-x-100'
                        : 'bg-primary-500 scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  className="relative text-gray-500 hover:text-primary-600 transition-all"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
                </motion.button>
                
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="relative">
                      {currentUser.profileImage ? (
                        <img 
                          src={currentUser.profileImage} 
                          alt="Profile" 
                          className="w-9 h-9 rounded-full object-cover border-2 border-primary-100"
                        />
                      ) : (
                        <div className="bg-primary-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold">
                          {currentUser.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{currentUser.username || 'User'}</p>
                      <p className="text-xs text-gray-500">{currentUser.role || 'Member'}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg py-1 z-20 border border-gray-100"
                      >
                        <Link 
                          to={currentUser.role === 'doctor' ? '/doctor/profile' : '/patient/profile'}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Your Profile
                        </Link>
                        <Link 
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Settings
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Login
                </Link>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-primary-600 rounded-md hover:bg-primary-700 transition-all border"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {currentUser && (
              <div className="relative">
                {currentUser.profileImage ? (
                  <img 
                    src={currentUser.profileImage} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {currentUser.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white rounded-full"></div>
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary-600 transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block text-sm px-3 py-2 rounded-md transition-all ${
                    isActive(link.href)
                      ? 'text-primary-700 bg-gray-50 font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-100 mt-3 pt-3">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-3 mb-3 px-3">
                      {currentUser.profileImage ? (
                        <img 
                          src={currentUser.profileImage}
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                        />
                      ) : (
                        <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
                          {currentUser.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800">{currentUser.username}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>
                    
                    <Link
                      to={currentUser.role === 'doctor' ? '/doctor/profile' : '/patient/profile'}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    >
                      Your Profile
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    >
                      Settings
                    </Link>
                    
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md mt-1"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center text-sm px-3 py-2 rounded-md border border-primary-600 text-primary-600 hover:bg-gray-50 transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center text-sm px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;