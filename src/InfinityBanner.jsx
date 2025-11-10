import React from 'react';
import './InfinityBanner.css';

const InfinityBanner = () => {
  const messages = [
    'FLAME ON TOP',
    'ONE FLAME TO RULE THEM ALL',
    'ARE YOU FIRED UP?'
  ];

  // Repeat messages multiple times for seamless loop
  const repeatedMessages = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="infinity-banner">
      <div className="banner-content">
        {repeatedMessages.map((message, index) => (
          <span key={index} className="banner-message">
            {message}
          </span>
        ))}
      </div>
      <div className="banner-content" aria-hidden="true">
        {repeatedMessages.map((message, index) => (
          <span key={index} className="banner-message">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfinityBanner;

