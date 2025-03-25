import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, Star, ArrowLeft } from 'lucide-react';
import { Slider } from 'antd';
import 'antd';
import './sidebar.scss';

interface FilterSection {
  id: string;
  title: string;
  isOpen: boolean;
}

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 18000]);
  const [sections, setSections] = useState<FilterSection[]>([
    { id: 'categories', title: 'Categories', isOpen: true },
    { id: 'producer', title: 'Producer', isOpen: true },
    { id: 'priceRange', title: 'Price range', isOpen: true },
    { id: 'assessment', title: 'Assessment', isOpen: true },
    { id: 'salesMethod', title: 'Sales method', isOpen: true },
    { id: 'productType', title: 'Product Type', isOpen: true },
  ]);

  const toggleSection = (id: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const handleArrowLeftClick = () => {
    if (onClose) {
      onClose();
    } else {
      console.log('Sidebar close action triggered');
    }
  };

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < count ? '#FFB800' : 'none'}
        color={index < count ? '#FFB800' : '#D1D5DB'}
      />
    ));
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  return (
    <div className="sidebar">
      <div className="header-sidebar">
        <h2>
          <SlidersHorizontal size={20} />
          Filter
        </h2>
        <ArrowLeft 
          size={20} 
          onClick={handleArrowLeftClick}
          className="close-button"
        />
      </div>

      <div className="search-container">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          placeholder="Search by filter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {sections.map(section => (
        <div key={section.id} className="filter-section">
          <div className="section-header" onClick={() => toggleSection(section.id)}>
            <h3>{section.title}</h3>
            {section.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {section.isOpen && (
            <div className="content">
              {section.id === 'priceRange' && (
                <div className="price-range-container">
                  <Slider
                    range
                    min={1}
                    max={18000}
                    defaultValue={priceRange}
                    onChange={handlePriceChange}
                    trackStyle={[{ backgroundColor: '#F59E0B' }]}
                    handleStyle={[
                      { borderColor: '#F59E0B', backgroundColor: '#fff' },
                      { borderColor: '#F59E0B', backgroundColor: '#fff' }
                    ]}
                    railStyle={{ backgroundColor: '#E5E7EB' }}
                  />
                  <div className="price-display">
                    <span>Price: {priceRange[0].toLocaleString()}€ — {priceRange[1].toLocaleString()}€</span>
                  </div>
                </div>
              )}

              {section.id === 'assessment' && (
                <>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="rating-option">
                      <input type="checkbox" />
                      <div className="stars">
                        {renderStars(rating)}
                      </div>
                      <span className="count">{rating === 5 ? '' : 'or more'} (0)</span>
                    </div>
                  ))}
                </>
              )}

              {section.id === 'salesMethod' && (
                <>
                  <div className="checkbox-option">
                    <input type="checkbox" />
                    <span className="label">Online sales</span>
                    <span className="count">(8)</span>
                  </div>
                  <div className="checkbox-option">
                    <input type="checkbox" />
                    <span className="label">Local Sale</span>
                    <span className="count">(19)</span>
                  </div>
                </>
              )}

              {section.id === 'productType' && (
                <>
                  <div className="checkbox-option">
                    <input type="checkbox" />
                    <span className="label">Singular</span>
                    <span className="count">(19)</span>
                  </div>
                  <div className="checkbox-option">
                    <input type="checkbox" />
                    <span className="label">Basket</span>
                    <span className="count">(0)</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;