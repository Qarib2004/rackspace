import OneSection from 'core/layouts/public/components/section-one/one.component';
import React, { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import Card from 'core/shared/base-card/card.component';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import './store.component.scss';

const products = [
  {
    id: 1,
    name: 'Tomato',
    producer: 'Farm',
    weight: '1 L',
    price: 1.2,
    image: 'src/assets/images/store/pomidor.jpeg',
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
    image: 'src/assets/images/store/pomidor.jpeg',
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
    image: 'src/assets/images/store/pomidor.jpeg',
    date: '2025-03-18',
    title: 'Premium Cherry Tomatoes',
    assessment: 4.9,
  },
];

const Store = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sortOption, setSortOption] = useState('Relevance');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([...products]);

  const sortOptions = ['Relevance', 'Price', 'Publication date', 'Ad title', 'Assessment'];

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSortChange = (option:any) => {
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
        // 'Relevance' or default - keep original order
        break;
    }
    
    setSortedProducts(sortedData);
  };

  const handleClickOutside = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  return (
    <>
      <OneSection />
      <div className="store-section-flex">
        {sidebarVisible && (
          <div className="store-sidebar-container">
            <Sidebar onClose={handleToggleSidebar} />
          </div>
        )}
        <div className="store-content-container" onClick={handleClickOutside}>
          <div className="store-controls">
            {!sidebarVisible && (
              <button
                onClick={handleToggleSidebar}
                className="filter-toggle"
              >
                <SlidersHorizontal size={16} />
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
                        className={`sort-controls__dropdown-menu-item ${
                          sortOption === option ? 'sort-controls__dropdown-menu-item--active' : ''
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
          />
        </div>
      </div>
    </>
  );
};

export default Store;