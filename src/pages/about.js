import React from "react";

// Placeholder SVG logo component
const EventOLogo = () => (
  <div className="flex justify-center mb-6">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="EventO Logo">
      <circle cx="40" cy="40" r="38" stroke="#6366F1" strokeWidth="4" fill="#EEF2FF" />
      <text x="50%" y="54%" textAnchor="middle" fill="#6366F1" fontSize="32" fontWeight="bold" dy=".3em" fontFamily="Arial, sans-serif">E</text>
    </svg>
  </div>
);

const aboutSections = [
  {
    title: "Welcoming Introduction",
    content: `Welcome to EventO – your all-in-one platform for discovering, booking, and managing venues for any occasion. Whether you’re planning a wedding, corporate event, birthday party, or any special gathering, EventO makes it easy to find the perfect venue, compare options, and secure your reservation—all in just a few clicks.`,
    imageAlt: "People celebrating at an event",
    image: null // Add image path or import here
  },
  {
    title: "Mission Statement",
    content: `At EventO, our mission is to make event planning effortless and enjoyable for everyone. We are dedicated to connecting people with the perfect venues by providing a transparent, secure, and user-friendly platform. We value trust, convenience, and exceptional service, striving to empower our users to create memorable experiences with ease and confidence.`,
    imageAlt: "Team collaborating on event planning",
    image: null // Add image path or import here
  },
  {
    title: "Why Choose EventO?",
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
    content: `Behind EventO is a passionate group of event enthusiasts, tech innovators, and customer service professionals. We understand the excitement—and the challenges—of planning memorable events, which is why we’re dedicated to making the process as smooth and enjoyable as possible. Our diverse team brings together years of experience in hospitality, technology, and support, all united by a shared commitment to helping you create unforgettable moments. We’re here to support you every step of the way!`,
    imageAlt: "EventO team photo",
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

const About = () => (
  <main className="max-w-4xl mx-auto px-4 py-12">
    <EventOLogo />
    <header className="mb-10 text-center">
      <h1 className="text-5xl font-extrabold mb-4 text-indigo-700">About EventO</h1>
      <p className="text-lg text-gray-600">Discover what makes us the best choice for your next event.</p>
    </header>
    <div className="space-y-12">
      {aboutSections.map((section, idx) => (
        <section key={section.title} className="flex flex-col md:flex-row items-center md:space-x-8 bg-white rounded-lg shadow-md p-6">
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
        </section>
      ))}
    </div>
  </main>
);

export default About; 
