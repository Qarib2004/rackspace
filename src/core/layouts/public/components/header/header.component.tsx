import './header.component.scss';
import { LogoIcon } from '../../../../../assets/images/icons/logo';
import HeaderRightComponent from '../header-right/header-right.component';
import { Link } from 'react-router-dom';
import React from 'react';
import { Menu, Search, ShoppingBag, Globe, X, Home, User} from 'lucide-react';
import { Logo } from 'assets/images/icons/agro-logo';
import { useState, useRef, useEffect } from 'react';

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const menuPanelRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    if (
      menuPanelRef.current &&
      !menuPanelRef.current.contains(target) &&
      !target.closest('.mobile-nav__item')
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  if (isMobileMenuOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isMobileMenuOpen]);


  return (
    <>
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <button className="header__menu-btn" onClick={() => setIsOpen(!isOpen)}>
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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

      {isOpen && (
        <div className="header__small-modal">
          <div className="header__small-modal-content">
            <div className="header__small-modal-header">
              <h3>Menu</h3>
              <button className="header__small-modal-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <nav className="header__small-modal-menu">
              <ul>
              <li><a href="#">Página Inicial</a></li>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Promoções</a></li>
              <li><a href="#">Novidades</a></li>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Contactos</a></li>
              <li><a href="#">Ajuda</a></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>

    <nav className="mobile-nav">
      <div className="mobile-nav__container">
        <a href="#" className="mobile-nav__item mobile-nav__item--active">
          <Home size={24} />
          <span>Inicio</span>
        </a>
        <button className="mobile-nav__item" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={24} />
          <span>Menu</span>
        </button>
        <a href="#" className="mobile-nav__item">
          <ShoppingBag size={24} />
          <span>Loja</span>
        </a>
        <a href="#" className="mobile-nav__item">
          <User size={24} />
          <span>Perfil</span>
        </a>
      </div>
      
      <div 
        ref={menuPanelRef}
        className={`mobile-nav__menu-panel ${isMobileMenuOpen ? 'mobile-nav__menu-panel--open' : ''}`}
      >
        <div className="mobile-nav__menu-content">
          <div className="mobile-nav__menu-header">
            <h3>Menu</h3>
            <button className="mobile-nav__menu-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="mobile-nav__menu-list">
            <ul>
              <li><a href="#">Página Inicial</a></li>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Promoções</a></li>
              <li><a href="#">Novidades</a></li>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Contactos</a></li>
              <li><a href="#">Ajuda</a></li>
            </ul>
          </div>
          <div className="mobile-nav__auth-section">
            <button className="primary">Entrar</button>
            <button className="secondary">Criar Conta</button>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default HeaderComponent;