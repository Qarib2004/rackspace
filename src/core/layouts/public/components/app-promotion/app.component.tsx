import React from 'react';
import './app.component.scss';
import appStoreIcon from '../../../../../assets/images/app-promotion/download (1).jpeg';
import googlePlayIcon from '../../../../../assets/images/app-promotion/download (2).jpeg';

const AppPromotion: React.FC = () => {
  return (
    <div className="app-promotion-container">
      <h1 className="app-promotion-title">Mobil proqraml</h1>

      <div className="app-promotion-content">
        <div className="app-promotion-text-container">
          <h2 className="app-promotion-slogan">
            Proqramımızdan<br />
            masanıza
          </h2>

          <button className="app-promotion-button">Ətraflı məlumat əldə edin</button>
        </div>



        <div className="app-promotion-badges">
          <a href="#" className="app-store-badge">
            <img src={appStoreIcon} alt="Download on App Store" />
          </a>
          <a href="#" className="google-play-badge">
            <img src={googlePlayIcon} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppPromotion;