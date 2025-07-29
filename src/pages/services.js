import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { FiMapPin, FiChevronRight, FiUsers, FiStar, FiSearch } from 'react-icons/fi';
import { FaUtensils, FaPaintBrush, FaRegCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const serviceCategories = [
  {
    key: 'caterer',
    name: 'Caterer',
    icon: <FaUtensils className="text-3xl text-primary-600" />,
    color: 'from-blue-100 to-blue-200',
    href: '/services?type=caterer',
  },
  {
    key: 'decorator',
    name: 'Decorator',
    icon: <FaPaintBrush className="text-3xl text-secondary-600" />,
    color: 'from-purple-100 to-purple-200',
    href: '/services?type=decorator',
  },
  {
    key: 'planner',
    name: 'Event Planner',
    icon: <FaRegCalendarCheck className="text-3xl text-pink-600" />,
    color: 'from-pink-100 to-pink-200',
    href: '/services?type=planner',
  },
];

// Mock service providers data
const mockServices = [
  {
    id: 1,
    name: 'Delicious Delights Catering',
    type: 'Caterer',
    image: '/images/service1.jpg',
    rating: 4.9,
    location: 'Mumbai, India',
    description: 'Premium catering for weddings, parties, and corporate events. Custom menus and live counters available.',
  },
  {
    id: 2,
    name: 'Dream Decorators',
    type: 'Decorator',
    image: '/images/service2.jpg',
    rating: 4.8,
    location: 'Delhi, India',
    description: 'Creative event decoration for all occasions. Floral, theme, and lighting specialists.',
  },
  {
    id: 3,
    name: 'Perfect Planners',
    type: 'Event Planner',
    image: '/images/service3.jpg',
    rating: 4.7,
    location: 'Goa, India',
    description: 'End-to-end event planning and management. Stress-free experience for your big day.',
  },
];

const ServicesPage = () => {
  const [location, setLocation] = useState('');
  const [filteredServices, setFilteredServices] = useState(mockServices);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      const filtered = mockServices.filter(service => service.type.toLowerCase().replace(' ', '') === type);
      setFilteredServices(filtered);
    } else {
      setFilteredServices(mockServices);
    }
  }, []);

  return (
        <Layout title="Services | Venuity">
      <div className="min-h-screen bg-gray-50">
        {/* Header/Hero Section */}
        <motion.section
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Services for Your Perfect Event</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your event, our experts. Find the best caterers, decorators, and planners to make your occasion unforgettable.
            </p>
          </div>
        </motion.section>

        {/* Service Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Browse by Service Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {serviceCategories.map((cat) => (
                <a
                  key={cat.key}
                  href={cat.href}
                  className={`group block rounded-xl bg-gradient-to-br ${cat.color} shadow-md hover:shadow-lg transition p-8 text-center cursor-pointer`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4">{cat.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition">{cat.name}</h3>
                    <span className="inline-flex items-center text-primary-600 font-medium group-hover:underline">
                      Explore <FiChevronRight className="ml-1" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Location-Based Search */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <form className="flex items-center bg-white rounded-lg shadow p-4 gap-2">
                <FiMapPin className="text-xl text-primary-600" />
                <input
                  type="text"
                  placeholder="Search services by city or state"
                  className="flex-1 border-none outline-none text-gray-800 text-lg bg-transparent"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-1"
                  onClick={e => e.preventDefault()}
                >
                  <FiSearch />
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Service Listings */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Available Service Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  className="card overflow-hidden hover:shadow-lg flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-0 right-0 bg-white px-3 py-1 m-2 rounded-full text-sm font-medium text-secondary-600 shadow">
                      {service.type}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FiMapPin className="mr-1" />
                      <span>{service.location}</span>
                    </div>
                    <p className="text-gray-700 mb-3 flex-1">{service.description}</p>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="ml-1 font-medium">{service.rating}</span>
                    </div>
                    <button className="btn-primary w-full mt-auto">Book Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ServicesPage; 
