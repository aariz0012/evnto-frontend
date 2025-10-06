import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiUsers, FiCalendar, FiArrowRight } from 'react-icons/fi';
import Layout from '../components/Layout/Layout';

// Static data
const featuredVenues = [
  {
    id: 1,
    name: 'Royal Garden Lawn',
    location: 'Mumbai, India',
    image: '/images/venue1.jpg',
    price: '₹50,000',
    rating: 4.8,
    type: 'Lawn'
  },
  // ... rest of your featuredVenues array
];

const featuredServices = [
  // ... your featuredServices array
];

const eventTypes = [
  // ... your eventTypes array
];

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    guestCount: '',
    eventType: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    window.location.href = `/venues?${queryParams.toString()}`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white" 
        style={{ 
          backgroundImage: "url('/images/welcome-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '600px'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find the Perfect Venue for Your Special Occasion
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Book venues, caterers, decorators, and event organizers all in one place
            </motion.p>
            
            {/* Search Form */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-left max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={searchParams.location}
                        onChange={handleChange}
                        placeholder="City, State"
                        className="form-input pl-10 text-gray-900 w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUsers className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        value={searchParams.guestCount}
                        onChange={handleChange}
                        placeholder="No. of guests"
                        min="1"
                        className="form-input pl-10 text-gray-900 w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={searchParams.eventType}
                      onChange={handleChange}
                      className="form-input text-gray-900 w-full"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="corporate">Corporate</option>
                      <option value="engagement">Engagement</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                    >
                      <FiSearch className="inline mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of your existing sections */}
      <section className="py-16">
        {/* Your existing featured venues, services, and other sections */}
      </section>
    </Layout>
  );
}
