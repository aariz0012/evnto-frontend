import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTagline, setShowTagline] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Generate random values only on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 800);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Keep the component mounted for the exit animation
      setTimeout(() => {
        // Optional: Add any cleanup or navigation logic here
      }, 1000);
    }, 3500); // Increased duration to account for animations

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50"
        >
          {/* Background with bokeh effect and texture */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Bokeh effect circles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute rounded-full bg-[#0a5c36]"
                  initial={{
                    opacity: 0,
                    width: `${Math.random() * 200 + 50}px`,
                    height: `${Math.random() * 200 + 50}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{ 
                    opacity: [1.0, 0.7, 0.9, 0.6, 1.0],
                    scale: [1, 1.4, 1.2],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 15 + Math.random() * 15,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                  style={{
                    filter: 'blur(25px)'
                  }}
                />
              ))}
            </div>
            
            {/* Subtle linen texture */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM60 91c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM35 41c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM12 60c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z\' fill=\'%230a5c36\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '200px 200px'
              }}
            />
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-50/80" />
          </div>

          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            {/* Logo with animation */}
            <motion.div 
              className="relative mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image
                src="/images/logo.png"
                alt="Venuity Logo"
                width={260}
                height={260}
                className="relative z-10 mx-auto mb-1"
                priority
              />
            </motion.div>

            {/* Tagline with typing effect */}
            <AnimatePresence>
              {showTagline && (
                <motion.p
                  className="text-2xl font-bold text-gray-800 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.3
                    }
                  }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}
                >
                  EVENTS MADE EASY
                </motion.p>
              )}
            </AnimatePresence>

            {/* Loading bar with micro-content */}
            <div className="w-full max-w-xs mx-auto space-y-8">
              {/* Loading bar */}
              <motion.div 
                className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { 
                    delay: 0.6,
                    duration: 0.6
                  }
                }}
              >
                <motion.div
                  className="h-full bg-[#0a5c36]"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: '100%',
                    transition: { 
                      duration: 2.5,
                      ease: [0.65, 0, 0.35, 1]
                    }
                  }}
                />
              </motion.div>
              
              {/* Micro-content */}
              <motion.p 
                className="text-sm text-gray-600 font-light tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.8,
                    duration: 0.6
                  }
                }}
                style={{
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Did you Know? Searching thousands of venues for you...
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
