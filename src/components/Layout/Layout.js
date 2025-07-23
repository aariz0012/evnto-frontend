import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import IntroPopup from '../IntroPopup';

const Layout = ({ children, title = 'EventO - Book Venues & Services' }) => {
  const [showIntroPopup, setShowIntroPopup] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore && window.location.pathname === '/') {
      // Show intro popup on first visit to homepage
      setShowIntroPopup(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Book venues and event services for weddings, birthdays, galas, and more" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        
        <main className="flex-grow">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent opacity-50 pointer-events-none" />
            {children}
          </div>
        </main>
        
        <Footer />
        
        {/* Floating Action Button for Quick Actions */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex flex-col space-y-2">
            <button 
              className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center"
              onClick={() => window.location.href = '/explore'}
            >
              <span className="text-xl">🔍</span>
              <span className="ml-2">Explore Venues</span>
            </button>
            <button 
              className="bg-secondary-500 text-white px-4 py-2 rounded-full hover:bg-secondary-600 transition-colors flex items-center justify-center"
              onClick={() => window.location.href = '/services'}
            >
              <span className="text-xl">✨</span>
              <span className="ml-2">Find Services</span>
            </button>
          </div>
        </div>
      </div>

      {showIntroPopup && (
        <IntroPopup onClose={() => setShowIntroPopup(false)} />
      )}
    </>
  );
};

export default Layout;
