import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMapMarkerAlt, FaStar, FaRegCalendarAlt, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Static export - no server-side rendering needed

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)), 
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues`);
        if (!res.ok) throw new Error('Failed to fetch venues');
        const data = await res.json();
        let venuesArray = [];
        if (Array.isArray(data)) {
          venuesArray = data;
        } else if (data && Array.isArray(data.venues)) {
          venuesArray = data.venues;
        } else if (data && Array.isArray(data.data)) {
          venuesArray = data.data;
        }
        setVenues(Array.isArray(venuesArray) ? venuesArray : []);
      } catch (err) {
        setError(err.message || 'Error loading venues');
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // For now, just log the search query and date range
    // Filtering can be implemented later
    console.log('Search query:', searchQuery);
    console.log('Date range:', dateRange);
  };

  // Animation variants (from Home page)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
        <Layout title="Venues | Venuity">
      <div className="min-h-screen">
        {/* Hero/Header Section */}
        <motion.section
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div className="max-w-3xl mx-auto text-center" variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Diverse Venues</h1>
              <p className="text-xl mb-8">Your ideal event space awaits. Browse and discover the perfect venue for your next occasion.</p>
              {/* Search/Filter Form */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search venues by name or location"
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <FaRegCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                      <DatePicker
                        selectsRange
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        onChange={(update) => {
                          const [start, end] = update;
                          setDateRange({ startDate: start, endDate: end });
                        }}
                        isClearable
                        placeholderText="Select your dates"
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        dateFormat="MMM dd"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300 ease-in-out"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content Area: Venues Grid */}
        <section className="py-16 bg-gray-50 min-h-[40vh]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Available Venues</h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-40">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p>{error}</p>
                </div>
              </div>
            ) : venues.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <div className="bg-gray-100 border border-gray-300 text-gray-600 px-6 py-4 rounded shadow text-lg">
                  No venues available or data format is invalid.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {venues.map((venue) => (
                  <motion.div
                    key={venue._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={venue.images && venue.images[0] ? venue.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{venue.name}</h3>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>{venue.averageRating ? venue.averageRating.toFixed(1) : 'New'}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{venue.location ? venue.location.city : 'Location not specified'}</span>
                      </div>
                      <p className="text-gray-700 mb-3 line-clamp-2">{venue.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">${venue.price ? venue.price.toFixed(2) : '0.00'}/day</span>
                        <span className="text-sm text-gray-500">Capacity: {venue.capacity}</span>
                      </div>
                      <a
                        href={`/venues/${venue._id}`}
                        className="text-blue-600 hover:underline mt-2 inline-block"
                      >
                        View Details
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VenuesPage;
