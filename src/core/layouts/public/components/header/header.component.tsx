import './header.component.scss';
import { LogoIcon } from '../../../../../assets/images/icons/logo';
import HeaderRightComponent from '../header-right/header-right.component';
import { Link } from 'react-router-dom';
import React from 'react';
import { Menu, Search, ShoppingBag, Globe } from 'lucide-react';
import { Logo } from 'assets/images/icons/agro-logo';

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <button className="header__menu-btn">
            <Menu size={24} />
            <span>MENU</span>
          </button>
          <div className="header__search">
            <Search size={20} />
          </div>
          <button className="header__voice-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-mic"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>

        <div className="header__logo">
          <Logo />
        </div>

        <div className="header__right">
          <button className="header__auth-btn">ENTRAR/REGISTAR</button>
          <button className="header__cart-btn">
            <ShoppingBag size={24} />
          </button>
          <button className="header__lang-btn">
            <Globe size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
