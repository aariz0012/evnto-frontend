import React from 'react';

const Logo = ({ className = '', withTagline = true }) => {
  return (
    <div className={`inline-block ${className}`}>
      <svg 
        width={withTagline ? '300' : '150'} 
        height={withTagline ? '80' : '40'}
        viewBox="0 0 300 80" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-label="Venuity Logo"
        className="max-w-full h-auto"
      >
        <style>
          {
            `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400&display=swap');
            .logo-text {
              font-family: 'Playfair Display', serif;
              font-size: ${withTagline ? '50px' : '30px'};
              font-weight: 700;
            }
            .tagline-text {
              font-family: 'Roboto', sans-serif;
              font-size: 14px;
              letter-spacing: 1.5px;
              fill: #4A5568;
            }
            `
          }
        </style>
        <text x="0" y={withTagline ? '45' : '32'} className="logo-text">
          <tspan fill="#006400">V</tspan>
          <tspan fill="#000000">enuity</tspan>
        </text>
        {withTagline && (
          <text x="0" y="68" className="tagline-text">
            EVENTS MADE EASY
          </text>
        )}
      </svg>
    </div>
  );
};

export default Logo;
