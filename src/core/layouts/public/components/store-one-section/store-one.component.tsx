import React, { useEffect, useState } from 'react';
import './store-one.component.scss';


import Banner1 from '../../../../../assets/images/store-one/Loja.c63acfcb3363bf1b41ff.png';

const StoreOne: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [Banner1];
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % banners.length);
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [banners.length]);

//   const handleDotClick = (index: number) => {
//     setCurrentSlide(index);
//   };
  
  return (
    <div className="one-section">
      <div className="slideshow-container">
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${banner})` }}
          >
            
          </div>
        ))}
        
        {/* <div className="dots-container">
          {banners.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`} 
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default StoreOne;