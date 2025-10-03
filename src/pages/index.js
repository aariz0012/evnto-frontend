import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiUsers, FiCalendar, FiArrowRight } from 'react-icons/fi';
import Layout from '../components/Layout/Layout';

// Default venue image
const DEFAULT_VENUE_IMAGE = '/images/placeholder-venue.jpg';

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
  {
    id: 2,
    name: 'Grand Celebration Banquet',
    location: 'Delhi, India',
    image: '/images/venue2.jpg',
    price: '₹75,000',
    rating: 4.9,
    type: 'Banquet'
  },
  {
    id: 3,
    name: 'Seaside Resort',
    location: 'Goa, India',
    image: '/images/venue3.jpg',
    price: '₹120,000',
    rating: 4.7,
    type: 'Resort'
  }
];

const featuredServices = [
  {
    id: 1,
    name: 'Delicious Delights Catering',
    type: 'Caterer',
    image: '/images/service1.jpg',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Dream Decorators',
    type: 'Decorator',
    image: '/images/service2.jpg',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Perfect Planners',
    type: 'Organizer',
    image: '/images/service3.jpg',
    rating: 4.7
  }
];

const eventTypes = [
  { name: 'Wedding', image: '/images/events/wedding.jpg' },
  { name: 'Birthday', image: '/images/events/birthday.jpg' },
  { name: 'Corporate', image: '/images/events/corporate.jpg' },
  { name: 'Engagement', image: '/images/events/engagement.jpg' },
  { name: 'Anniversary', image: '/images/events/anniversary.jpg' },
];

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    guestCount: '',
    eventType: '',
    date: ''
  });
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Handle image errors
  const handleImageError = (e) => {
    if (e.target.src !== DEFAULT_VENUE_IMAGE) {
      e.target.src = DEFAULT_VENUE_IMAGE;
    }
  };

  if (!isClient) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>EventO - Find the Perfect Venue for Your Event</title>
        <meta name="description" content="Discover and book the best venues and services for your events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <img 
            src="/images/hero-bg.jpg" 
            alt="Event venue"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Perfect Venue
          </motion.h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover and book the best venues and services for weddings, corporate events, and more.
          </p>
          
          {/* Search Form */}
          <motion.form 
            onSubmit={handleSearch}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={searchParams.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="guestCount"
                  value={searchParams.guestCount}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Guests</option>
                  <option value="1-50">1-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-200">101-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <select
                  name="eventType"
                  value={searchParams.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="birthday">Birthday</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <FiSearch className="mr-2" /> Search
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Venues</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium venues</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <motion.div 
                key={venue.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 text-sm font-semibold px-3 py-1 rounded-full">
                    {venue.rating} ★
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{venue.name}</h3>
                      <p className="text-gray-600 flex items-center mt-1">
                        <FiMapPin className="mr-1" size={14} /> {venue.location}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {venue.type}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">{venue.price}</span>
                    <Link href={`/venues/${venue.id}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      View Details <FiArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/venues" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              View All Venues
            </Link>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event Types</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We've got you covered for all types of events</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {eventTypes.map((event, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-xl h-40 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 z-10 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg">{event.name}</h3>
                </div>
                <img
                  src={event.image}
                  alt={event.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Complete event solutions under one roof</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <motion.div 
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{service.type}</span>
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-gray-600 text-sm">({service.rating})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to plan your next event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who found their perfect venue with us.
          </p>
          <div className="space-x-4">
            <Link href="/venues" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100">
              Browse Venues
            </Link>
            <Link href="/contact" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
