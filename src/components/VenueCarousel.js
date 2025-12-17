import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart, FiClock, FiMapPin, FiUsers, FiCalendar, FiX } from 'react-icons/fi';
import { FaRegBookmark, FaRegHeart, FaHeart, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/VenueCarousel.module.css';

const VenueCarousel = ({ venues }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [availability, setAvailability] = useState({});

  // Check venue availability
  useEffect(() => {
    const checkAvailability = async () => {
      const availabilityData = {};
      for (const venue of venues) {
        try {
          // Simulate API call to check availability
          const isAvailable = Math.random() > 0.3; // 70% chance of being available
          availabilityData[venue.id] = {
            isAvailable,
            nextAvailable: isAvailable ? null : new Date(Date.now() + 86400000 * 2).toLocaleDateString()
          };
        } catch (error) {
          console.error('Error checking availability:', error);
          availabilityData[venue.id] = { isAvailable: false, error: 'Error checking availability' };
        }
      }
      setAvailability(availabilityData);
    };

    checkAvailability();
  }, [venues]);

  // Auto-advance carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const toggleWishlist = (venueId) => {
    setWishlist(prev => ({
      ...prev,
      [venueId]: !prev[venueId]
    }));
  };

  const openQuickView = (venue) => {
    setSelectedVenue(venue);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const renderVenueCard = (venue) => (
    <div key={venue.id} className={styles.venueCard}>
      <div className={styles.imageContainer}>
        <Image
          src={venue.image}
          alt={venue.name}
          width={400}
          height={250}
          className={styles.venueImage}
        />
        <button 
          className={`${styles.wishlistButton} ${wishlist[venue.id] ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(venue.id);
          }}
          aria-label={wishlist[venue.id] ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlist[venue.id] ? <FaHeart /> : <FaRegHeart />}
        </button>
        
        {availability[venue.id] && (
          <div className={`${styles.availabilityBadge} ${
            availability[venue.id].isAvailable ? styles.available : styles.unavailable
          }`}>
            {availability[venue.id].isAvailable ? 'Available' : 'Booked'}
          </div>
        )}
      </div>
      
      <div className={styles.venueInfo}>
        <h3>{venue.name}</h3>
        <div className={styles.venueMeta}>
          <span><FiMapPin /> {venue.location}</span>
          <span><FiUsers /> Up to {venue.capacity} guests</span>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${venue.pricePerHour}/hour</span>
          <button 
            className={styles.quickViewButton}
            onClick={() => openQuickView(venue)}
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.featuredVenues}>
      <div className={styles.sectionHeader}>
        <h2>Featured Venues</h2>
        <p>Discover our most popular event spaces</p>
      </div>
      
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {venues.map(renderVenueCard)}
        </Slider>
      </div>

      {modalOpen && selectedVenue && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              <FiX />
            </button>
            
            <div className={styles.modalGrid}>
              <div className={styles.modalImage}>
                <Image
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  width={600}
                  height={400}
                  layout="responsive"
                />
              </div>
              
              <div className={styles.modalDetails}>
                <h2>{selectedVenue.name}</h2>
                <p className={styles.venueLocation}><FiMapPin /> {selectedVenue.location}</p>
                
                <div className={styles.detailRow}>
                  <span><FiUsers /> Capacity: {selectedVenue.capacity} guests</span>
                  <span><FiClock /> {selectedVenue.hours} hours min</span>
                </div>
                
                {availability[selectedVenue.id] && (
                  <div className={styles.availabilityInfo}>
                    <h4>Availability:</h4>
                    {availability[selectedVenue.id].isAvailable ? (
                      <p className={styles.availableText}>
                        <FaRegCalendarAlt /> Available for booking
                      </p>
                    ) : (
                      <p className={styles.unavailableText}>
                        <FaRegClock /> Next available: {availability[selectedVenue.id].nextAvailable}
                      </p>
                    )}
                  </div>
                )}
                
                <div className={styles.amenities}>
                  <h4>Amenities:</h4>
                  <div className={styles.amenityList}>
                    {selectedVenue.amenities?.map((amenity, index) => (
                      <span key={index} className={styles.amenityTag}>{amenity}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.modalActions}>
                  <button className={styles.primaryButton}>Book Now</button>
                  <button 
                    className={`${styles.secondaryButton} ${wishlist[selectedVenue.id] ? styles.inWishlist : ''}`}
                    onClick={() => toggleWishlist(selectedVenue.id)}
                  >
                    {wishlist[selectedVenue.id] ? (
                      <><FaHeart /> In Wishlist</>
                    ) : (
                      <><FaRegHeart /> Add to Wishlist</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VenueCarousel;
