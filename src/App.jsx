import React, { useState, useEffect, useRef } from 'react';
import CardSwap, { Card } from './CardSwap';
import Shuffle from './Shuffle';
import BubbleMenu from './BubbleMenu';
import CustomNotification from './CustomNotification';
import InfinityBanner from './InfinityBanner';
import './App.css';

function App() {
  // Generate array of image paths from 1.png to 21.png
  const images = Array.from({ length: 21 }, (_, i) => `/${i + 1}.png`);
  const [notification, setNotification] = useState(null);
  const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);
  const secondSectionRef = useRef(null);

  const contractAddress = '2u4qmae4zRjvT1uo4o4LbhQwD46Z4V9LwTF3q1rmbonk';

  const handleCopyCA = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(contractAddress).then(() => {
      setNotification('CA Copied!');
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSecondSectionVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      {notification && (
        <CustomNotification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
      
      <InfinityBanner />
      
      <div className="app">
        <div className="hero-section">
          <div className="title-section">
            <Shuffle
              text="The Bonk Fire"
              tag="h1"
              className="project-title"
              textAlign="left"
              shuffleDirection="right"
              duration={0.5}
              ease="power3.out"
              threshold={0.1}
              rootMargin="0px"
              shuffleTimes={3}
              animationMode="evenodd"
              stagger={0.05}
              scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
              triggerOnce={true}
              triggerOnHover={true}
            />
            <div className="menu-buttons-container">
              <button onClick={handleCopyCA} className="menu-button">
                CA
              </button>
              <a href="https://x.com/fireonbonk1" target="_blank" rel="noopener noreferrer" className="menu-button">
                X
              </a>
              <a href="https://x.com/i/communities/1986944400132309416" target="_blank" rel="noopener noreferrer" className="menu-button">
                Community
              </a>
            </div>
          </div>
      
          <CardSwap
            width={600}
            height={500}
            cardDistance={50}
            verticalDistance={60}
            delay={2000}
            pauseOnHover={true}
            easing="elastic"
          >
            {images.map((imgSrc, index) => (
              <Card key={index}>
                <img src={imgSrc} alt={`Card ${index + 1}`} />
              </Card>
            ))}
          </CardSwap>
        </div>

        <div 
          ref={secondSectionRef}
          className={`second-section ${isSecondSectionVisible ? 'visible' : ''}`}
        >
          <div className="content-wrapper">
            <div className="fire-image-container">
              <img src="/fire.png" alt="The Flame" className="fire-image" />
            </div>
            
            <div className="description-container">
              <div className="description-placard placard-1">
                <p className="description-text">
                  The Flame is eternal.
                </p>
              </div>
              
              <div className="description-placard placard-2">
                <p className="description-text">
                  From the dawn of the trenches, the best have had that fighting spirit inside, day or night, rain or shine.
                </p>
              </div>
              
              <div className="description-placard placard-3">
                <p className="description-text">
                  That is the spirit of the Flame -- and he is here to save Bonk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

