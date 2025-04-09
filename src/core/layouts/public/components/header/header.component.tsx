import './header.component.scss';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Search,
  ShoppingBag,
  Globe,
  X,
  Home,
  User,
  MessageCircle,
  Heart,
  Bell,
} from 'lucide-react';
import { Logo } from 'assets/images/icons/agro-logo';
import { getToken } from 'core/helpers/get-token';
import SidebarBasket from 'pages/basket-sidebar/basketSidebar.component';
import SearchComponent from '../search/search.component';
import { useSelector, useDispatch } from 'react-redux';
import {useStore} from '../../../../../store/store.config';


const HeaderComponent = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  const userCredential = useStore('user');

  console.log(userCredential);

  useEffect(() => {
    const handleMenuClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        menuPanelRef.current &&
        !menuPanelRef.current.contains(target) &&
        !target.closest('.mobile-nav__item')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleProfileClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.header__profile-btn')
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleMenuClickOutside);
    }

    document.addEventListener('mousedown', handleProfileClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleMenuClickOutside);
      document.removeEventListener('mousedown', handleProfileClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.reload();
    setIsAuthenticated(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBasketOpen(!isBasketOpen);
  };

  const toggleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__left">
            <button
              className="header__menu-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={24} />
              <span>MENU</span>
            </button>

            <div className="header__search" onClick={toggleSearch}>
              <Search size={20} />
            </div>
          </div>

          <div className="header__logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="header__right">
            {!isAuthenticated ? (
              <Link to="/login" className="header__auth-btn">
                Giriş/Qeydiyyat
              </Link>
            ) : (
              <>
                <Link to="/notifications" className="header__icon-btn">
                  <Bell size={24} />
                </Link>
                <Link to="/wishlist" className="header__icon-btn">
                  <Heart size={24} />
                </Link>
              </>
            )}

            <button onClick={toggleBasket} className="header__cart-btn">
              <ShoppingBag size={24} />
            </button>

            {!isAuthenticated ? (
              <button className="header__lang-btn">
                <Globe size={24} />
              </button>
            ) : (
              <></>
            )}

            {isAuthenticated && (
              <div className="header__profile">
                <button
                  className="header__profile-btn"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                >
                  <img
                    className="header__img"
                    src="https://agromarketing.com/wp-content/uploads/2016/12/default-avatar.png"
                    alt="Profile"
                  />
                </button>
                {isProfileDropdownOpen && (
                  <div
                    ref={profileDropdownRef}
                    className="header__profile-dropdown"
                  >
                    <div className="header__profile-dropdown-header">
                      <img
                        className="header__profile-dropdown-img"
                        src="https://agromarketing.com/wp-content/uploads/2016/12/default-avatar.png"
                        alt="Profile"
                      />
                      <div className="header__profile-dropdown-info">
                        <span className="header__profile-dropdown-name">
                          <span className="header__profile-dropdown-name">
                            {/*{user?.firstname ? `${user.firstname}` : ''}*/}
                          </span>
                        </span>
                        <span className="header__profile-dropdown-user">
                          Müştəri
                        </span>
                      </div>
                    </div>
                    <ul className="header__profile-dropdown-menu">
                      <li>
                        <Link
                          to="/profile/general"
                          className="header__profile-dropdown-item"
                        >
                          <User size={16} />
                          <span>Profil</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile/messages"
                          className="header__profile-dropdown-item"
                        >
                          <MessageCircle size={16} />
                          <span>Messages</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile/orders"
                          className="header__profile-dropdown-item"
                        >
                          <ShoppingBag size={16} />
                          <span>Sifarişlərim</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile/addresses"
                          className="header__profile-dropdown-item"
                        >
                          <Home size={16} />
                          <span>Ünvanlar</span>
                        </Link>
                      </li>
                      <li>
                        <div className="header__profile-dropdown-item-btn">
                          <Link
                            to="/help"
                            className="header__profile-dropdown-help"
                          >
                            Kömək Lazımdır?
                          </Link>
                        </div>
                        <div className="header__profile-dropdown-item-btn2">
                          <button
                            className="header__profile-dropdown-button"
                            onClick={handleLogout}
                          >
                            Çıxış
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="header__small-modal">
            <div className="header__small-modal-content">
              <div className="header__small-modal-header">
                <h3>Menu</h3>
                <button
                  className="header__small-modal-close"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="header__small-modal-menu">
                <ul>
                  <li>
                    <Link to="/">Ana səhifə</Link>
                  </li>
                  <li>
                    <Link to="/store">Kateqoriyalar</Link>
                  </li>
                  <li>
                    <Link to="/promotions">Təkliflər</Link>
                  </li>
                  <li>
                    <Link to="/new">Xəbərlər</Link>
                  </li>
                  <li>
                    <Link to="/about">Haqqımızda</Link>
                  </li>
                  <li>
                    <Link to="/contact">Əlaqə</Link>
                  </li>
                  <li>
                    <Link to="/help">Kömək</Link>
                  </li>
                  <li>
                    <Link to="/rules">Ümumi qaydalar</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </header>

      <nav className="mobile-nav">
        <div className="mobile-nav__container">
          <Link to="/" className="mobile-nav__item mobile-nav__item--active">
            <Home size={24} />
            <span>Ana səhifə</span>
          </Link>
          <button
            className="mobile-nav__item"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
            <span>Menu</span>
          </button>
          <Link to="/store" className="mobile-nav__item">
            <ShoppingBag size={24} />
            <span>Mağaza</span>
          </Link>
          {isAuthenticated ? (
            <Link to="/profile/general" className="mobile-nav__item">
              <User size={24} />
              <span>Profil</span>
            </Link>
          ) : (
            <Link to="/login" className="mobile-nav__item">
              <User size={24} />
              <span>Giriş</span>
            </Link>
          )}
        </div>

        <div
          ref={menuPanelRef}
          className={`mobile-nav__menu-panel ${isMobileMenuOpen ? 'mobile-nav__menu-panel--open' : ''
            }`}
        >
          <div className="mobile-nav__menu-content">
            <div className="mobile-nav__menu-header">
              <h3>Menu</h3>
              <button
                className="mobile-nav__menu-close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="mobile-nav__menu-list">
              <ul>
                <li>
                  <Link to="/">Ana səhifə</Link>
                </li>
                <li>
                  <Link to="/store">Kateqoriyalar</Link>
                </li>
                <li>
                  <Link to="/wishlist">Favoriler</Link>
                </li>
                <li>
                  <Link to="/new">Xəbərlər</Link>
                </li>
                <li>
                  <Link to="/about">Haqqımızda</Link>
                </li>
                <li>
                  <Link to="/contact">Əlaqə</Link>
                </li>
                <li>
                  <Link to="/help">Kömək</Link>
                </li>
                <li>
                  <Link to="/rules">Ümumi qaydalar</Link>
                </li>
              </ul>
            </div>
            <div className="mobile-nav__auth-section">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="primary">
                    Giriş / 
                  </Link>
                  <Link to="/register" className="secondary">
                    Qeydiyyat
                  </Link>
                </>
              ) : (
                <button className="secondary" onClick={handleLogout}>
                  Çıxış
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SidebarBasket
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
      />
      <SearchComponent
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default HeaderComponent;
