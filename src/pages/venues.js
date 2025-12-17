import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
  const [showMyVenues, setShowMyVenues] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)), 
  });

  useEffect(() => {
    // Check if user is authenticated and get user role
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // You'll need to implement this API endpoint to return user info
          const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (userRes.ok) {
            const userData = await userRes.json();
            setIsHost(userData.isHost || false);
            setIsAdmin(userData.role === 'admin');
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/venues`;
        if (isHost && showMyVenues) {
          url += '?myVenues=true';
        }
        const res = await fetch(url, { headers });
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
  }, [showMyVenues, isHost]);

  const handleSearch = (e) => {
    e.preventDefault();
    // For now, just log the search query and date range
    // Filtering can be implemented later
    console.log('Search query:', searchQuery);
    console.log('Date range:', dateRange);
  };

  const handleToggleStatus = async (venueId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/venues/${venueId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error('Failed to update venue status');

      // Update the venue in the local state
      setVenues(venues.map(venue => 
        venue._id === venueId 
          ? { ...venue, isActive: !currentStatus } 
          : venue
      ));
    } catch (err) {
      setError(err.message || 'Error updating venue status');
    }
  };

  const handleApproveVenue = async (venueId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/venues/${venueId}/approval`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ isApproved: !currentStatus })
        }
      );

      if (!res.ok) throw new Error('Failed to update venue approval');

      // Update the venue in the local state
      setVenues(venues.map(venue => 
        venue._id === venueId 
          ? { 
              ...venue, 
              isApproved: !currentStatus,
              isActive: !currentStatus // Auto-activate when approved
            } 
          : venue
      ));
    } catch (err) {
      setError(err.message || 'Error updating venue approval');
    }
  };

  // Render status badge for venue
  const renderStatusBadge = (venue) => {
    if (!venue.isApproved) {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
          Pending Approval
        </span>
      );
    }
    if (!venue.isActive) {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
          Inactive
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
        Active
      </span>
    );
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {showMyVenues ? 'My Venues' : 'Explore Our Venues'}
              </h1>
              <p className="text-xl mb-8">
                {showMyVenues 
                  ? 'Manage your listed venues and view their status'
                  : 'Your ideal event space awaits. Browse and discover the perfect venue for your next occasion.'}
              </p>
              
              {/* Host Controls */}
              {isHost && (
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => setShowMyVenues(!showMyVenues)}
                    className={`px-6 py-2 rounded-md mr-4 ${
                      showMyVenues
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'bg-blue-700 hover:bg-blue-800 text-white'
                    } transition-colors`}
                  >
                    {showMyVenues ? 'View All Venues' : 'View My Venues'}
                  </button>
                  <Link
                    href="/host/venues/new"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-md transition-colors"
                  >
                    + Add New Venue
                  </Link>
                </div>
              )}

              {/* Search Form */}
              {!showMyVenues && (
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
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content Area: Venues Grid */}
        <section className="py-16 bg-gray-50 min-h-[40vh]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                {showMyVenues ? 'My Venues' : 'Available Venues'}
              </h2>
              {showMyVenues && (
                <span className="text-sm text-gray-600">
                  Showing {venues.length} venue{venues.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
           
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            ) : venues.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {showMyVenues ? 'No venues found' : 'No venues available'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {showMyVenues
                    ? 'You have not listed any venues yet.'
                    : 'There are currently no venues available.'}
                </p>
                {isHost && !showMyVenues && (
                  <button
                    onClick={() => setShowMyVenues(true)}
                    className="text-blue-600 hover:underline"
                  >
                    View your venues
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {venues.map((venue) => (
                  <motion.div
                    key={venue._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    {/* Image Section */}
                    <div className="relative flex-shrink-0">
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={venue.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                          alt={venue.name || 'Venue image'}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        {renderStatusBadge(venue)}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Venue Header */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                          {venue.businessName || 'Unnamed Venue'}
                        </h3>
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full ml-2">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-700">
                            {venue.rating ? Number(venue.rating).toFixed(1) : 'New'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {venue.city || 'Location not specified'}
                          {venue.state ? `, ${venue.state}` : ''}
                          {venue.country ? `, ${venue.country}` : ''}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-700 mb-4 line-clamp-2 flex-grow">
                        {venue.about || 'No description available'}
                      </p>
                      
                      {/* Footer */}
                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-lg text-blue-600">
                            ${(venue.pricing?.basePrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}/day
                          </span>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            👥 {venue.maxGuestCapacity || 'N/A'} guests
                          </span>
                        </div>
                        <Link
                          href={`/venues/${venue._id}`}
                          className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 block"
                        >
                          View Details
                        </Link>
                      </div>
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
