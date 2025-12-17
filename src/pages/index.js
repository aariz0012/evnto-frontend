import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { 
  FiMapPin, 
  FiCalendar, 
  FiUsers, 
  FiSearch, 
  FiNavigation,
  FiChevronRight, 
  FiCheckCircle, 
  FiLayers, 
  FiTag, 
  FiHeadphones, 
  FiMail, 
  FiPhone, 
  FiClock, 
  FiArrowRight 
} from 'react-icons/fi';
import { 
  FaStar, 
  FaRegStar, 
  FaStarHalfAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import VenueCarousel from '../components/VenueCarousel';

// Add your data structures here (categories, featuredVenues, howItWorks, etc.)// Categories Data
const categories = [
  { id: 1, name: 'Wedding', image: '/images/events/wedding.jpg' },
  { id: 2, name: 'Corporate', image: '/images/events/corporate.jpg' },
  { id: 3, name: 'Birthday', image: '/images/events/birthday.jpg' },
  { id: 4, name: 'Conference', image: '/images/events/conference.jpg' },
  { id: 5, name: 'Exhibition', image: '/images/events/exhibition.jpg' },
  { id: 6, name: 'Anniversary', image: '/images/events/anniversary.jpg' },
];

const featuredVenues = [
  {
    id: 1,
    name: 'Grand Ballroom',
    location: 'Mumbai, India',
    image: '/images/venues/ballroom.jpg',
    capacity: 300,
    pricePerHour: 500,
    hours: 4,
    amenities: ['Stage', 'Sound System', 'Catering', 'Parking', 'WiFi']
  },
  {
    id: 2,
    name: 'Skyline Rooftop',
    location: 'Delhi, India',
    image: '/images/venues/rooftop.jpg',
    capacity: 150,
    pricePerHour: 350,
    hours: 5,
    amenities: ['City View', 'Bar', 'DJ Setup', 'Lighting', 'Restrooms']
  },
  {
    id: 3,
    name: 'Garden Pavilion',
    location: 'Bangalore, India',
    image: '/images/events/wedding.jpg', // Using existing image as placeholder
    capacity: 200,
    pricePerHour: 400,
    hours: 6,
    amenities: ['Outdoor', 'Garden', 'Dance Floor', 'Catering', 'Parking']
  }
];
// How It Works Data
const howItWorks = [
  {
    id: 1,
    title: 'Search & Explore',
    description: 'Browse through our extensive collection of venues and filter by location, capacity, and amenities.',
    icon: <FiSearch size={32} />,
    color: '#4f46e5'
  },
  {
    id: 2,
    title: 'Book Instantly',
    description: 'Check real-time availability and book your perfect venue with just a few clicks.',
    icon: <FiCalendar size={32} />,
    color: '#10b981'
  },
  {
    id: 3,
    title: 'Enjoy Your Event',
    description: 'Have a memorable experience with our dedicated support and top-notch venues.',
    icon: <FiUsers size={32} />,
    color: '#f59e0b'
  }
];
// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Event Planner, Mumbai',
    content: 'Finding the perfect venue used to be a nightmare until we discovered Venuity. The platform is incredibly user-friendly and saved us countless hours of searching!',
    rating: 5,
    image: '/images/testimonial1.jpg'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Corporate HR, Delhi',
    content: 'We organized our annual conference through Venuity and were blown away by the quality of venues available. The booking process was seamless and their support team was exceptional.',
    rating: 4,
    image: '/images/testimonial2.jpg'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Wedding Planner, Bangalore',
    content: 'As a wedding planner, I rely on Venuity for all my venue needs. The variety and quality of venues, along with the easy booking process, make it my go-to platform.',
    rating: 5,
    image: '/images/testimonial3.jpg'
  }
];
// Why Choose Us Data
const whyChooseUs = [
  {
    id: 1,
    title: 'Wide Selection',
    description: 'Choose from thousands of verified venues across India for any type of event.',
    icon: <FiLayers size={28} />
  },
  {
    id: 2,
    title: 'Best Prices',
    description: 'Get the best deals and prices with our price match guarantee.',
    icon: <FiTag size={28} />
  },
  {
    id: 3,
    title: 'Easy Booking',
    description: 'Simple and secure booking process with instant confirmation.',
    icon: <FiCheckCircle size={28} />
  },
  {
    id: 4,
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you.',
    icon: <FiHeadphones size={28} />
  }
];
// Blog/News Data
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Wedding Venues in Mumbai for 2025',
    excerpt: 'Discover the most sought-after wedding venues in Mumbai that will make your special day unforgettable.',
    date: 'May 15, 2025',
    readTime: '5 min read',
    category: 'Wedding',
    image: '/images/blog/wedding-venues.jpg'
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Corporate Event Venue',
    excerpt: 'Essential tips for selecting a venue that will impress your clients and employees alike.',
    date: 'April 28, 2025',
    readTime: '4 min read',
    category: 'Corporate',
    image: '/images/blog/corporate-events.jpg'
  },
  {
    id: 3,
    title: 'Outdoor vs Indoor Venues: Pros and Cons',
    excerpt: 'Weighing the benefits and challenges of outdoor and indoor event spaces for your next gathering.',
    date: 'April 10, 2025',
    readTime: '6 min read',
    category: 'Tips',
    image: '/images/blog/outdoor-indoor.jpg'
  }
];

export default function Home() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [email, setEmail] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Using OpenStreetMap Nominatim for reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || '';
              const state = data.address.state || '';
              setLocation(city ? `${city}${state ? `, ${state}` : ''}` : `Nearby (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
              setIsLocating(false);
            })
            .catch(() => {
              setLocation(`Nearby (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
              setIsLocating(false);
            });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please enter it manually.');
          setIsLocating(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setIsLocating(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < Math.floor(rating) ? 
        <FaStar key={i} className={styles.starIcon} /> : 
        i < Math.ceil(rating) ? 
          <FaStarHalfAlt key={i} className={styles.starIcon} /> : 
          <FaRegStar key={i} className={styles.starIcon} />
    ));
  };

  return (
    <Layout>
      <Head>
        <title>Venuity - Book Your Perfect Venue</title>
        <meta name="description" content="Find and book the perfect venue for your next event" />
      </Head>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Find the Perfect Venue for Your Next Event</h1>
            <p>Discover and book unique venues for any occasion across India</p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className={styles.searchContainer}>
              <div className={`${styles.searchInput} relative`}>
                <FiMapPin className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pr-10"
                />
                <button 
                  type="button" 
                  onClick={detectLocation}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  disabled={isLocating}
                  title="Use my current location"
                >
                  {isLocating ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FiNavigation className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className={styles.searchInput}>
                <FiCalendar className={styles.searchIcon} />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className={styles.searchInput}>
                <FiUsers className={styles.searchIcon} />
                <input 
                  type="number" 
                  placeholder="Guests" 
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.searchButton}>
                <FiSearch /> Search
              </button>
            </form>
          </div>
        </section>

        {/* Categories Section */}
<section className={`${styles.section} ${styles.bgLight}`}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Browse by Category</h2>
      <p className={styles.sectionSubtitle}>Find the perfect venue for any occasion</p>
    </div>
    <div className={styles.categoriesGrid}>
      {categories.map((category) => (
        <motion.div 
          key={category.id} 
          className={styles.categoryCard}
          whileHover={{ y: -5 }}
        >
          <div className={styles.categoryImage}>
            <Image 
              src={category.image} 
              alt={category.name} 
              width={300} 
              height={200}
              className={styles.categoryImg}
              onError={(e) => {
                console.error('Failed to load image: ${category.image}');
                e.target.onerror = null;
                e.target.src = '/images/events/default.jpg';
              }}
            />
          </div>
          <h3>{category.name}</h3>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Featured Venues Section */}
<section className={`${styles.section} ${styles.bgWhite}`}>
  <div className={styles.container}>
    <VenueCarousel venues={featuredVenues} />
  </div>
</section>

{/* How It Works Section */}
<section className={styles.section}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>How It Works</h2>
      <p className={styles.sectionSubtitle}>Get your perfect venue in just 3 simple steps</p>
    </div>
    <div className={styles.howItWorks}>
      {howItWorks.map((step, index) => (
        <motion.div 
          key={step.id} 
          className={styles.stepCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div 
            className={styles.stepIcon} 
            style={{ backgroundColor: `${step.color}15`, color: step.color }}
          >
            {step.icon}
            <span className={styles.stepNumber}>0{index + 1}</span>
          </div>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDescription}>{step.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* Testimonials Section */}
<section className={`${styles.section} ${styles.bgLight}`}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
      <p className={styles.sectionSubtitle}>Hear from people who have experienced our service</p>
    </div>
    <div className={styles.testimonialsGrid}>
      {testimonials.map((testimonial) => (
        <motion.div 
          key={testimonial.id} 
          className={styles.testimonialCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.testimonialContent}>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.testimonialText}>{testimonial.content}</p>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                i < testimonial.rating ? 
                  <FaStar key={i} className={styles.starFilled} /> : 
                  <FaRegStar key={i} className={styles.starEmpty} />
              ))}
            </div>
          </div>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorImage}>
              <Image 
                src={testimonial.image} 
                alt={testimonial.name} 
                width={60} 
                height={60}
                className={styles.authorImg}
              />
            </div>
            <div className={styles.authorInfo}>
              <h4>{testimonial.name}</h4>
              <p>{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* Why Choose Us Section */}
<section className={styles.section}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Why Choose Venuity</h2>
      <p className={styles.sectionSubtitle}>We make event planning simple and stress-free</p>
    </div>
    <div className={styles.whyChooseUsGrid}>
      {whyChooseUs.map((feature, index) => (
        <motion.div 
          key={feature.id} 
          className={styles.featureCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className={styles.featureIcon}>
            {feature.icon}
          </div>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDescription}>{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* CTA Banner Section */}
<section className={styles.ctaBanner}>
  <div className={styles.container}>
    <div className={styles.ctaContent}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Find Your Perfect Venue?</h2>
        <p>Join thousands of satisfied customers who found their dream venue with us</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <a href="/venues" className={styles.ctaButton}>
          Explore Venues <FiArrowRight className={styles.ctaIcon} />
        </a>
      </motion.div>
    </div>
  </div>
</section>

{/* Blog/News Section */}
<section className={`${styles.section} ${styles.bgLight}`}>
  <div className={styles.container}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Latest News & Tips</h2>
      <p className={styles.sectionSubtitle}>Stay updated with the latest trends and insights in event planning</p>
    </div>
    <div className={styles.blogGrid}>
      {blogPosts.map((post) => (
        <motion.article 
          key={post.id} 
          className={styles.blogCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.blogImage}>
            <Image 
              src={post.image} 
              alt={post.title}
              width={400}
              height={250}
              className={styles.blogImg}
            />
            <span className={styles.blogCategory}>{post.category}</span>
          </div>
          <div className={styles.blogContent}>
            <div className={styles.blogMeta}>
              <span className={styles.blogDate}>{post.date}</span>
              <span className={styles.blogReadTime}>{post.readTime}</span>
            </div>
            <h3 className={styles.blogTitle}>{post.title}</h3>
            <p className={styles.blogExcerpt}>{post.excerpt}</p>
            <a href={`/blog/${post.id}`} className={styles.readMore}>
              Read More <FiArrowRight className={styles.arrowIcon} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
    <div className={styles.seeAllContainer}>
      <a href="/blog" className={styles.seeAllLink}>
        View All Articles <FiArrowRight className={styles.arrowIcon} />
      </a>
    </div>
  </div>
</section>

{/* Newsletter Signup Section */}
<section className={`${styles.newsletter} ${styles.section}`}>
  <div className={styles.container}>
    <motion.div
      className={styles.newsletterContent}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Stay Updated</h2>
      <p>Subscribe to our newsletter for the latest venue updates, special offers, and event planning tips.</p>
      <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
        <input
          type="email"
          className={styles.newsletterInput}
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className={styles.newsletterButton}
          disabled={!email}
        >
          <FiMail size={18} /> Subscribe
        </button>
      </form>
      <svg 
        className={`${styles.newsletterPattern} ${styles.newsletterPattern1}`} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M45,-78.8C58.3,-69.9,69.1,-57.7,74.1,-43.4C79.1,-29.1,78.4,-12.5,78.9,4.5C79.4,21.5,81.2,43,70.9,56.9C60.6,70.8,38.2,77.1,18.1,81.6C-2,86.1,-19.7,88.8,-33.2,80.6C-46.7,72.4,-56,53.3,-65.3,36.9C-74.6,20.5,-83.9,6.8,-85.2,-8.2C-86.5,-23.2,-79.8,-39.6,-66.7,-48.7C-53.5,-57.8,-33.9,-59.6,-19.8,-67.6C-5.7,-75.6,2.9,-89.8,15.8,-91.2C28.7,-92.6,45.8,-81.2,45,-78.8Z" transform="translate(100 100)" />
      </svg>
      <svg 
        className={`${styles.newsletterPattern} ${styles.newsletterPattern2}`} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M45,-78.8C58.3,-69.9,69.1,-57.7,74.1,-43.4C79.1,-29.1,78.4,-12.5,78.9,4.5C79.4,21.5,81.2,43,70.9,56.9C60.6,70.8,38.2,77.1,18.1,81.6C-2,86.1,-19.7,88.8,-33.2,80.6C-46.7,72.4,-56,53.3,-65.3,36.9C-74.6,20.5,-83.9,6.8,-85.2,-8.2C-86.5,-23.2,-79.8,-39.6,-66.7,-48.7C-53.5,-57.8,-33.9,-59.6,-19.8,-67.6C-5.7,-75.6,2.9,-89.8,15.8,-91.2C28.7,-92.6,45.8,-81.2,45,-78.8Z" transform="translate(100 100)" />
      </svg>
    </motion.div>
  </div>
</section>

        {/* Add other sections here */}
      </main>
    </Layout>
  );
}
