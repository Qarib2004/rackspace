import './header.component.scss';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Globe, X, Home, User, ChevronDown, MessageCircle } from 'lucide-react';
import { Logo } from 'assets/images/icons/agro-logo';

const HeaderComponent = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.header__profile-btn')
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        {/* Left Section */}
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

        {/* Logo Section */}
        <div className="header__logo">
          <Logo />
        </div>

        {/* Right Section */}
        <div className="header__right">
          <Link to="/login" className="header__auth-btn">
            Giriş/Qeydiyyat
          </Link>
          <button className="header__cart-btn">
            <ShoppingBag size={24} />
          </button>
          <button className="header__lang-btn">
            <Globe size={24} />
          </button>
          <div className="header__profile">
            <button
              className="header__profile-btn"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <img
                className="header__img"
                src="https://agromarketing.com/wp-content/uploads/2016/12/default-avatar.png"
                alt="Profile"
              />
            </button>
            {isProfileDropdownOpen && (
              <div ref={profileDropdownRef} className="header__profile-dropdown">
                <div className="header__profile-dropdown-header">
                  <img
                    className="header__profile-dropdown-img"
                    src="https://agromarketing.com/wp-content/uploads/2016/12/default-avatar.png"
                    alt="Profile"
                  />
                  <div className="header__profile-dropdown-info">
                    <span className="header__profile-dropdown-name">John Doe</span>
                    <span className="header__profile-dropdown-user">Customer</span>
                  </div>
                </div>
                <ul className="header__profile-dropdown-menu">
                  <li>
                    <Link to="/profile" className="header__profile-dropdown-item">
                      <User size={16} />
                      <span>Profil</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="header__profile-dropdown-item">
                      <MessageCircle size={16} />
                      <span>Messages</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="header__profile-dropdown-item">
                      <ShoppingBag size={16} />
                      <span>Sifarişlərim</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/addresses" className="header__profile-dropdown-item">
                      <Home size={16} />
                      <span>Ünvanlar</span>
                    </Link>
                  </li>
                  <li>
                    <div className="header__profile-dropdown-item-btn">
                      <Link to="/help" className="header__profile-dropdown-help">
                        Kömək Lazımdır?
                      </Link>
                    </div>
                    <div className="header__profile-dropdown-item-btn2">
                      <button className="header__profile-dropdown-button">Çıxış</button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;