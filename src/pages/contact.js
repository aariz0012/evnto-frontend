import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaDirections } from "react-icons/fa";

export async function getServerSideProps() {
  return { props: {} };
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone",
      details: [
        { text: "+16892655819", link: "tel:+16892655819" },
        { text: "+918875195390", link: "tel:+918875195390" }
      ],
      color: "bg-blue-500"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      details: [
                { text: "support@venuity.com", link: "mailto:support@venuity.com" },
        { text: "khanaariz0012@gmail.com", link: "mailto:khanaariz0012@gmail.com" }
      ],
      color: "bg-green-500"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Office",
      details: [
        { text: "Tower 2, 23rd floor-2328, Bhutani Alphathum, Sector90, Noida, Uttar Pradesh, India", link: "https://maps.google.com/?q=Tower+2,+23rd+floor-2328,+Bhutani+Alphathum,+Sector90,+Noida,+Uttar+Pradesh,+India" }
      ],
      color: "bg-purple-500"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Business Hours",
      details: [
        { text: "Mon-Fri: 9AM-6PM", link: null },
        { text: "Sat-Sun: 10AM-4PM", link: null }
      ],
      color: "bg-orange-500"
    }
  ];

  const faqs = [
    {
      question: "How do I book a venue?",
      answer: "Simply browse our venue listings, select your preferred dates, and complete the booking process through our secure platform."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer flexible cancellation policies. Most bookings can be cancelled up to 48 hours before the event for a full refund."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! Our dedicated support team is available 24/7 to help with any questions or concerns you may have."
    },
    {
      question: "Can I modify my booking?",
      answer: "Absolutely! You can modify your booking details through your account dashboard or by contacting our support team."
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" }
  ];

  const officeAddress = "Tower 2, 23rd floor-2328, Bhutani Alphathum, Sector90, Noida, Uttar Pradesh, India";
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(officeAddress)}`;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're here to help you create the perfect event experience
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  detail.link ? (
                    <a
                      key={idx}
                      href={detail.link}
                      className="block text-blue-600 hover:text-blue-800 mb-1 transition-colors duration-200 hover:underline"
                      target={detail.link.startsWith('http') ? "_blank" : "_self"}
                      rel={detail.link.startsWith('http') ? "noopener noreferrer" : ""}
                    >
                      {detail.text}
                    </a>
                  ) : (
                    <p key={idx} className="text-gray-600 mb-1">{detail.text}</p>
                  )
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              
              {submitStatus === "success" && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What is this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-md font-semibold transition duration-300 ease-in-out"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Map/Office Info */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Visit Our Office</h2>
              
              {/* Interactive Map */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center hover:bg-gray-300 transition-colors duration-300 cursor-pointer group"
              >
                <div className="text-center text-gray-500 group-hover:text-gray-700">
                  <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
                  <p className="font-semibold">Click to Open Google Maps</p>
                  <p className="text-sm mt-2">Get directions to our office</p>
                  <div className="flex items-center justify-center mt-2 text-blue-600">
                    <FaDirections className="mr-1" />
                    <span className="text-sm">View Directions</span>
                  </div>
                </div>
              </a>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Office Address</h3>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline block"
                  >
                    {officeAddress}
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Office Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition duration-300"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Start Planning?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let us help you create the perfect event experience. Get started today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-x-4"
          >
            <a 
              href="/venues" 
              className="inline-block bg-white text-indigo-700 hover:bg-gray-100 py-3 px-8 rounded-md font-semibold transition duration-300 ease-in-out"
            >
              Browse Venues
            </a>
            <a 
              href="/register" 
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 py-3 px-8 rounded-md font-semibold transition duration-300 ease-in-out"
            >
              Sign Up Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 
