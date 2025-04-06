// import OneSection from 'core/layouts/public/components/section-one/one.component';
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './sidebar/sidebar';
import Card from 'core/shared/base-card/card.component';
import { SlidersHorizontal, ChevronDown, X, ArrowUp } from 'lucide-react';
import './store.component.scss';
import StoreOne from 'core/layouts/public/components/store-one-section/store-one.component';
import tomatoImg from '../../assets/images/store/pomidor.jpeg';

const products = [
  {
    id: 1,
    name: 'Tomato',
    producer: 'Farm',
    weight: '1 L',
    price: 1.2,
    image: tomatoImg,
    date: '2025-03-15',
    title: 'Fresh Farm Tomatoes',
    assessment: 4.5,
  },
  {
    id: 2,
    name: 'Tomato',
    producer: 'Bakery',
    weight: '500 g',
    price: 0.8,
    image: tomatoImg,
    date: '2025-03-10',
    title: 'Bakery Selection Tomatoes',
    assessment: 3.8,
  },
  {
    id: 3,
    name: 'Tomato',
    producer: 'Farm',
    weight: '200 g',
    price: 3.5,
    image: tomatoImg,
    date: '2025-03-18',
    title: 'Premium Cherry Tomatoes',
    assessment: 4.9,
  },
  {
    id: 4,
    name: 'Tomato',
    producer: 'Farm',
    weight: '200 g',
    price: 3.5,
    image: tomatoImg,
    date: '2025-03-18',
    title: 'Premium Cherry Tomatoes',
    assessment: 4.9,
  },
  {
    id: 5,
    name: 'Tomato',
    producer: 'Farm',
    weight: '200 g',
    price: 3.5,
    image: tomatoImg,
    date: '2025-03-18',
    title: 'Premium Cherry Tomatoes',
    assessment: 4.9,
  },
  {
    id: 6,
    name: 'Tomato',
    producer: 'Farm',
    weight: '200 g',
    price: 3.5,
    image: tomatoImg,
    date: '2025-03-18',
    title: 'Premium Cherry Tomatoes',
    assessment: 4.9,
  },
];

const Store = () => {
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Relevance');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const oneSectionRef = useRef<HTMLDivElement | null>(null);
  const sortOptions = ['Relevance', 'Price', 'Publication date', 'Ad title', 'Assessment'];
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (oneSectionRef.current) {
        const oneSectionBottom = oneSectionRef.current.getBoundingClientRect().bottom;
        setShowMobileNav(oneSectionBottom <= 0);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleDesktopSidebar = () => {
    setDesktopSidebarVisible(!desktopSidebarVisible);
    setDropdownOpen(false);
  };

  const handleToggleMobileSidebar = () => {
    setMobileSidebarVisible(!mobileSidebarVisible);
    if (!mobileSidebarVisible) {
      setSortMenuVisible(false);
    }
  };

  const handleToggleSortMenu = () => {
    setSortMenuVisible(!sortMenuVisible);
    if (!sortMenuVisible) {
      setMobileSidebarVisible(false);
    }
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setDropdownOpen(false);

    const sortedData = [...products];

    switch (option) {
      case 'Price':
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'Publication date':
        sortedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'Ad title':
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Assessment':
        sortedData.sort((a, b) => b.assessment - a.assessment);
        break;
      default:
        break;
    }

    setSortedProducts(sortedData);
    setSortMenuVisible(false);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    const isClickInDesktopSidebar = sidebarRef.current && sidebarRef.current.contains(target);
    const isClickInDesktopSidebarButton = target.closest('.filter-toggle') !== null;

    const isClickInMobileNav = target.closest('.mobile-nav-store') !== null;
    const isClickInMobileSidebar = target.closest('.mobile-sidebar') !== null;
    const isClickInMobileSortMenu = target.closest('.mobile-sort-menu') !== null;

    if (dropdownOpen && !target.closest('.sort-controls__dropdown')) {
      setDropdownOpen(false);
    }

    if (desktopSidebarVisible && !isClickInDesktopSidebar && !isClickInDesktopSidebarButton) {
      setDesktopSidebarVisible(false);
    }
    if (!isClickInMobileNav && !isClickInMobileSidebar && !isClickInMobileSortMenu) {
      setMobileSidebarVisible(false);
      setSortMenuVisible(false);
    }
  };

  return (
    <>
      <div ref={oneSectionRef}>
        <StoreOne/>
      </div>

      <div className="store-section-flex" onClick={handleClickOutside}>
        {desktopSidebarVisible && (
          <div className="store-sidebar-container" ref={sidebarRef}>
            <Sidebar onClose={handleToggleDesktopSidebar} />
          </div>
        )}

        <div className={`store-content-container ${desktopSidebarVisible || sortMenuVisible || mobileSidebarVisible ? 'blurred' : ''}`}>
          <div className="store-controls desktop-controls">
            {!desktopSidebarVisible && (
              <button
                onClick={handleToggleDesktopSidebar}
                className="filter-toggle"
              >
                <SlidersHorizontal size={16} />
                <span>Filters</span>
              </button>
            )}
            <div className="sort-controls">
              <span className="sort-controls__label">Sort by:</span>
              <div className="sort-controls__dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className="sort-controls__dropdown-button"
                >
                  {sortOption}
                  <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="sort-controls__dropdown-menu">
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSortChange(option)}
                        className={`sort-controls__dropdown-menu-item ${sortOption === option ? 'sort-controls__dropdown-menu-item--active' : ''
                          }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Card
            data={sortedProducts}
            imageKey="image"
            titleKey="name"
            subtitleKey="producer"
            additionalKeys={['weight', 'price']}
            showPagination={false}
            pageTitle="Products"
          />
        </div>

        <div className={`mobile-nav-store ${showMobileNav ? 'mobile-nav-store--visible' : ''}`}>
          <button
            className="mobile-nav-store__button"
            onClick={handleToggleMobileSidebar}
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </button>
          <button
            className="mobile-nav-store__button"
            onClick={handleToggleSortMenu}
          >
            <ChevronDown size={20} />
            <span>Sort: {sortOption}</span>
          </button>
        </div>

        <div className={`mobile-sidebar ${mobileSidebarVisible ? 'mobile-sidebar--visible' : ''}`}>
          <div className="mobile-sidebar__header">
            <h2>Filters</h2>
            <button className="mobile-sidebar__close" onClick={handleToggleMobileSidebar}>
              <X size={24} />
            </button>
          </div>
          <div className="mobile-sidebar__content">
            <Sidebar onClose={handleToggleMobileSidebar} />
          </div>
        </div>

        <div className={`mobile-sort-menu ${sortMenuVisible ? 'mobile-sort-menu--visible' : ''}`} ref={sortMenuRef}>
          <div className="mobile-sort-menu__header">
            <h2>Sort by</h2>
            <button className="mobile-sort-menu__close" onClick={handleToggleSortMenu}>
              <X size={24} />
            </button>
          </div>
          <div className="mobile-sort-menu__content">
            {sortOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSortChange(option)}
                className={`mobile-sort-menu__item ${sortOption === option ? 'mobile-sort-menu__item--active' : ''
                  }`}
              >
                {option}
                {sortOption === option && <ArrowUp size={16} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;