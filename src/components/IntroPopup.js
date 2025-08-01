import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Link from 'next/link';

const IntroPopup = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to Venuity",
      content: "Your one-stop solution for booking venues and event services for all your special occasions.",
      image: "/images/welcome-hero-new.jpg"
    },
    {
      title: "Customer Experience",
      content: "Easily find and book your dream venue with our user-friendly interface and trusted service providers.",
      image: "/images/customer-experience.jpg",
      subtitle: "For Customers"
    },
    {
      title: "Vendor Opportunities",
      content: "Grow your business by reaching thousands of potential clients through our platform.",
      image: "/images/vendor-opportunities.jpg",
      subtitle: "For Vendors"
    },
    {
      title: "Beautiful Venues",
      content: "Discover stunning venues for weddings, corporate events, parties, and more.",
      image: "/images/venue-showcase.jpg"
    },
    {
      title: "Professional Services",
      content: "Connect with top-rated caterers, decorators, photographers, and event planners.",
      image: "/images/services-showcase.jpg"
    },
    {
      title: "Join Our Community",
      content: "Create an account to start booking venues or list your services today!",
      image: "/images/join-community.jpg"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            aria-label="Close popup"
          >
            <FiX size={24} />
          </button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Image Section */}
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center"
                >
                  <motion.img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex-grow"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Venuity!</h2>
                  <p className="text-gray-600 mb-6">{slides[currentSlide].content}</p>
                  {slides[currentSlide].subtitle && (
                    <div className="text-sm text-gray-500 mt-2">{slides[currentSlide].subtitle}</div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Testimonial */}
              {currentSlide === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-100 p-4 rounded-lg mb-6"
                >
                                    <p className="text-gray-700 italic">"Venuity made planning our wedding so much easier! We found the perfect venue and amazing vendors all in one place."</p>
                  <p className="text-gray-500 text-sm mt-2">- Sarah & John, Newlyweds</p>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-auto">
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 w-2 rounded-full ${
                        currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex space-x-4">
                  {currentSlide > 0 && (
                    <button
                      onClick={prevSlide}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Back
                    </button>
                  )}
                  
                  {currentSlide < slides.length - 1 ? (
                    <button
                      onClick={nextSlide}
                      className="btn-primary"
                    >
                      Next
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <Link href="/register" className="btn-primary">
                        Sign Up
                      </Link>
                      <Link href="/host/register" className="btn-secondary">
                        Become a Host
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroPopup;
