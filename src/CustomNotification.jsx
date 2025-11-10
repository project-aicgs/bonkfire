import React, { useEffect } from 'react';
import './CustomNotification.css';

const CustomNotification = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="custom-notification">
      <div className="notification-content">
        {message}
      </div>
    </div>
  );
};

export default CustomNotification;

