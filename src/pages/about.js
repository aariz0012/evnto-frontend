import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiShield, FiMessageCircle, FiStar, FiClipboard, FiHeadphones } from 'react-icons/fi';

// Static export - no server-side rendering needed

const aboutSections = [
  {
    title: "Welcoming Introduction",
        content: `Welcome to Venuity – your all-in-one platform for discovering, booking, and managing venues for any occasion. Whether you’re planning a wedding, corporate event, birthday party, or any special gathering, Venuity makes it easy to find the perfect venue, compare options, and secure your reservation—all in just a few clicks.`,
    imageAlt: "People celebrating at an event",
    image: null // Add image path or import here
  },
  {
    title: "Mission Statement",
        content: `At Venuity, our mission is to make event planning effortless and enjoyable for everyone. We are dedicated to connecting people with the perfect venues by providing a transparent, secure, and user-friendly platform. We value trust, convenience, and exceptional service, striving to empower our users to create memorable experiences with ease and confidence.`,
    imageAlt: "Team collaborating on event planning",
    image: null // Add image path or import here
  },
  {
        title: "Why Choose Venuity?",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li><b>Extensive Venue Selection:</b> Find a wide variety of venues to suit any event, style, or budget.</li>
        <li><b>Seamless Booking Experience:</b> Enjoy a simple, intuitive process from discovery to reservation.</li>
        <li><b>Verified Reviews & Ratings:</b> Make informed decisions with honest feedback from real users.</li>
        <li><b>Secure Payments:</b> Book with confidence using our safe and reliable payment system.</li>
        <li><b>Dedicated Customer Support:</b> Get help whenever you need it from our friendly support team.</li>
        <li><b>Flexible Cancellation Policies:</b> Plans changed? We offer flexible options to accommodate your needs.</li>
        <li><b>Exclusive Deals & Offers:</b> Access special discounts and promotions available only to our members.</li>
      </ul>
    ),
    imageAlt: "Venue options collage",
    image: null // Add image path or import here
  },
  {
    title: "Meet the Team",
        content: `Behind Venuity is a passionate group of event enthusiasts, tech innovators, and customer service professionals. We understand the excitement—and the challenges—of planning memorable events, which is why we’re dedicated to making the process as smooth and enjoyable as possible. Our diverse team brings together years of experience in hospitality, technology, and support, all united by a shared commitment to helping you create unforgettable moments. We’re here to support you every step of the way!`,
        imageAlt: "Venuity team photo",
    image: null // Add image path or import here
  },
  {
    title: "Contact Us",
    content: (
      <div>
        <p>Have questions, feedback, or need assistance? We’re here to help!</p>
        <p>Reach out to our support team anytime at <a href="mailto:khanaariz0012@gmail.com" className="text-blue-600 underline">khanaariz0012@gmail.com</a>, and we’ll get back to you as soon as possible.</p>
        <p>You can also visit our <a href="#" className="text-blue-600 underline">Help Center</a> for answers to common questions.</p>
      </div>
    ),
    imageAlt: "Contact support illustration",
    image: null // Add image path or import here
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const About = () => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Venuity</h1>
        <p className="text-xl mb-8">Discover what makes us the best choice for your next event.</p>
      </div>
    </section>

    {/* About Sections */}
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 space-y-12">
        {aboutSections.map((section, idx) => (
          <motion.div
            key={section.title}
            className="flex flex-col md:flex-row items-center md:space-x-8 bg-white rounded-lg shadow-md p-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Image placeholder - replace null with actual image path or import */}
            {section.image ? (
              <img src={section.image} alt={section.imageAlt} className="w-40 h-40 object-cover rounded-full mb-4 md:mb-0" />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-full text-gray-400 mb-4 md:mb-0 text-center text-sm">
                Add image here
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 text-indigo-600">{section.title}</h2>
              <div className="text-gray-700 text-base">
                {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Core Features</h2>
          <p className="text-lg text-gray-600 mt-2">Everything you need to plan the perfect event.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FiSearch className="w-10 h-10 text-indigo-500" />,
              title: "Advanced Search & Filtering",
              description: "Quickly find the perfect venue with powerful search, custom filters, and an interactive map view.",
            },
            {
              icon: <FiShield className="w-10 h-10 text-indigo-500" />,
              title: "Secure Online Booking",
              description: "Book your venue with confidence using our secure and streamlined payment and reservation system.",
            },
            {
              icon: <FiMessageCircle className="w-10 h-10 text-indigo-500" />,
              title: "Direct Communication",
              description: "Connect directly with venue hosts to ask questions, discuss details, and ensure everything is perfect.",
            },
            {
              icon: <FiStar className="w-10 h-10 text-indigo-500" />,
              title: "Verified Reviews & Ratings",
              description: "Make informed decisions by reading authentic reviews and ratings from our community of users.",
            },
            {
              icon: <FiClipboard className="w-10 h-10 text-indigo-500" />,
              title: "Event Management Tools",
              description: "Stay organized with a personalized dashboard to manage bookings, track payments, and communicate.",
            },
            {
              icon: <FiHeadphones className="w-10 h-10 text-indigo-500" />,
              title: "24/7 Customer Support",
              description: "Our dedicated support team is available around the clock to assist you with any questions or issues.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Host Your Next Event?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who have found their perfect venue through Venuity.</p>
        <a 
          href="/register" 
          className="inline-block bg-white text-indigo-700 hover:bg-gray-100 py-3 px-8 rounded-md font-semibold transition duration-300 ease-in-out"
        >
          Sign Up Now
        </a>
      </div>
    </section>
  </div>
);

export default About; 
