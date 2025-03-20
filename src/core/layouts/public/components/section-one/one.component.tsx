import React, { useState, useEffect } from 'react';
import './one.component.scss';

import Banner1 from '../../../../../assets/images/banner/Banner-Entrada_1.8eb77de87bb3e15c863f.webp';
import Banner2 from '../../../../../assets/images/banner/Banner-Entrada_2.f7c7426e9b172bf44076.webp';
import Banner3 from '../../../../../assets/images/banner/Banner-Entrada_3.a998fb3d89b34cb2f05f.webp';

const OneSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [Banner1, Banner2, Banner3];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="one-section">
      <div className="slideshow-container">
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="content">
              <h1>No Agromarket, os seus produtos falam por si</h1>
              <h2>A loja online de produtos agrícolas</h2>
            </div>
          </div>
        ))}
        
        <div className="dots-container">
          {banners.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`} 
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OneSection;