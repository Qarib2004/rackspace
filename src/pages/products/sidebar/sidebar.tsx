import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, Star, ArrowLeft } from 'lucide-react';
import { Slider, InputNumber, Radio, Select } from 'antd';
import 'antd';
import './sidebar.scss';
import { Product } from 'core/shared/home-card/card';
import { User } from 'core/utils/IUser';
import { useGetProducts } from 'core/shared/home-card/actions/card.query';

interface FilterSection {
  id: string;
  title: string;
  isOpen: boolean;
}

interface SidebarProps {
  onClose?: () => void;
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  categories: string[];
  sellers: string[];
  ratings: number[];
  salesMethods: string[];
  productTypes: string[];
  isAvailable: boolean | null;
  minQuantity: number;
  weightRanges: string[];
  organic: 'all' | 'organic' | 'non-organic';
  minRating: number | null;
}

interface CategoryCount {
  [key: string]: number;
}

interface SellerCount {
  [key: string]: number;
}

interface SalesMethodCount {
  [key: string]: number;
}

interface ProductTypeCount {
  [key: string]: number;
}

interface RatingCount {
  [key: number]: number;
}

interface WeightRangeCount {
  [key: string]: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, onFilterChange }) => {
  const { data: products } = useGetProducts();
  const allProducts = products?.data ?? [];

  const [searchTerm, setSearchTerm] = useState('');
  const [sections, setSections] = useState<FilterSection[]>([
    { id: 'categories', title: 'Categories', isOpen: true },
    { id: 'seller', title: 'Seller', isOpen: true },
    { id: 'priceRange', title: 'Price range', isOpen: true },
    { id: 'rating', title: 'Rating', isOpen: true },
    { id: 'availability', title: 'Availability', isOpen: true },
    { id: 'quantity', title: 'Quantity', isOpen: true },
    { id: 'weight', title: 'Weight', isOpen: true },
    { id: 'organic', title: 'Organic', isOpen: true },
    { id: 'salesMethod', title: 'Sales method', isOpen: true },
    { id: 'productType', title: 'Product Type', isOpen: true },
  ]);
  
  const minMaxPrice = useMemo((): [number, number] => {
    if (allProducts.length === 0) return [1, 18000];
    const prices = allProducts.map((product: Product) => product.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [allProducts]);
  
  const maxQuantity = useMemo(() => {
    if (allProducts.length === 0) return 100;
    const quantities = allProducts.map((product: Product) => product.quantity || 0);
    return Math.max(...quantities);
  }, [allProducts]);
  
  const categoryCounts = useMemo(() => {
    const counts: CategoryCount = {};
    allProducts.forEach((product: Product) => {
      const category = product.name.split(' ')[0]; 
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [allProducts]);
  
  const sellerCounts = useMemo(() => {
    const counts: SellerCount = {};
    allProducts.forEach((product: Product) => {
      if (product.seller && product.seller.firstname) {
        counts[product.seller.firstname] = (counts[product.seller.firstname] || 0) + 1;
      }
    });
    return counts;
  }, [allProducts]);
  
  const ratingCounts = useMemo(() => {
    const counts: RatingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allProducts.forEach((product: Product) => {
      if (product.rating) {
        const rating = Math.floor(product.rating);
        if (rating >= 1 && rating <= 5) {
          counts[rating] = counts[rating] + 1;
        }
      }
    });
    return counts;
  }, [allProducts]);
  
  const weightRangeCounts = useMemo(() => {
    const counts: WeightRangeCount = { 
      '0-1kg': 0, 
      '1-5kg': 0, 
      '5+kg': 0
    };
    
    allProducts.forEach((product: Product) => {
      if (product.weight) {
        const weightMatch = product.weight.match(/^(\d+)(g|kg)$/);
        if (weightMatch) {
          const value = parseInt(weightMatch[1], 10);
          const unit = weightMatch[2];
          const weightInKg = unit === 'kg' ? value : value / 1000;
          
          if (weightInKg <= 1) {
            counts['0-1kg']++;
          } else if (weightInKg <= 5) {
            counts['1-5kg']++;
          } else {
            counts['5+kg']++;
          }
        }
      }
    });
    
    return counts;
  }, [allProducts]);
  
  const organicCounts = useMemo(() => {
    let organic = 0;
    let nonOrganic = 0;
    
    allProducts.forEach((product: Product) => {
      if (product.isOrganic) {
        organic++;
      } else {
        nonOrganic++;
      }
    });
    
    return { organic, nonOrganic };
  }, [allProducts]);
  
  const availabilityCounts = useMemo(() => {
    let available = 0;
    let unavailable = 0;
    
    allProducts.forEach((product: Product) => {
      if (product.isAvailable) {
        available++;
      } else {
        unavailable++;
      }
    });
    
    return { available, unavailable };
  }, [allProducts]);
  
  const salesMethodCounts = useMemo(() => {
    const counts: SalesMethodCount = { 'Online sales': 0, 'Local Sale': 0 };
    allProducts.forEach((product: Product) => {
      if (product.quantity && product.quantity > 10) {
        counts['Online sales'] = counts['Online sales'] + 1;
      } else {
        counts['Local Sale'] = counts['Local Sale'] + 1;
      }
    });
    return counts;
  }, [allProducts]);
  
  const productTypeCounts = useMemo(() => {
    const counts: ProductTypeCount = { 'Singular': 0, 'Basket': 0 };
    allProducts.forEach((product: Product) => {
      if (product.isOrganic) {
        counts['Singular'] = counts['Singular'] + 1;
      } else {
        counts['Basket'] = counts['Basket'] + 1;
      }
    });
    return counts;
  }, [allProducts]);
  
  const [priceRange, setPriceRange] = useState<[number, number]>(minMaxPrice);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSalesMethods, setSelectedSalesMethods] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [selectedWeightRanges, setSelectedWeightRanges] = useState<string[]>([]);
  const [organicFilter, setOrganicFilter] = useState<'all' | 'organic' | 'non-organic'>('all');
  const [minRating, setMinRating] = useState<number | null>(null);
  
  useEffect(() => {
    setPriceRange(minMaxPrice);
  }, [minMaxPrice]);
  
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        searchTerm,
        priceRange,
        categories: selectedCategories,
        sellers: selectedSellers,
        ratings: selectedRatings,
        salesMethods: selectedSalesMethods,
        productTypes: selectedProductTypes,
        isAvailable,
        minQuantity,
        weightRanges: selectedWeightRanges,
        organic: organicFilter,
        minRating
      });
    }
  }, [
    searchTerm, 
    priceRange, 
    selectedCategories, 
    selectedSellers, 
    selectedRatings, 
    selectedSalesMethods, 
    selectedProductTypes,
    isAvailable,
    minQuantity,
    selectedWeightRanges,
    organicFilter,
    minRating,
    onFilterChange
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
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const handleSellerToggle = (seller: string) => {
    setSelectedSellers(prev => 
      prev.includes(seller) 
        ? prev.filter(s => s !== seller) 
        : [...prev, seller]
    );
  };
  
  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  const handleSalesMethodToggle = (method: string) => {
    setSelectedSalesMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method) 
        : [...prev, method]
    );
  };
  
  const handleProductTypeToggle = (type: string) => {
    setSelectedProductTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const handleWeightRangeToggle = (range: string) => {
    setSelectedWeightRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range) 
        : [...prev, range]
    );
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
          style={{cursor:'pointer'}}
        />
      </div>

      <div className="search-container">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          placeholder="Search products"
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
              {section.id === 'categories' && (
                <>
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <div key={category} className="checkbox-option">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <span className="label">{category}</span>
                      <span className="count">({count})</span>
                    </div>
                  ))}
                </>
              )}
              
              {section.id === 'seller' && (
                <>
                  {Object.entries(sellerCounts).map(([seller, count]) => (
                    <div key={seller} className="checkbox-option">
                      <input 
                        type="checkbox" 
                        checked={selectedSellers.includes(seller)}
                        onChange={() => handleSellerToggle(seller)}
                      />
                      <span className="label">{seller}</span>
                      <span className="count">({count})</span>
                    </div>
                  ))}
                </>
              )}
              
              {section.id === 'priceRange' && (
                <div className="price-range-container">
                  <Slider
                    range
                    min={minMaxPrice[0]}
                    max={minMaxPrice[1]}
                    value={priceRange}
                    onChange={handlePriceChange}
                    trackStyle={[{ backgroundColor: '#F59E0B' }]}
                    handleStyle={[
                      { borderColor: '#F59E0B', backgroundColor: '#fff' },
                      { borderColor: '#F59E0B', backgroundColor: '#fff' }
                    ]}
                    railStyle={{ backgroundColor: '#E5E7EB' }}
                  />
                  <div className="price-display">
                    <span>Price: {priceRange[0].toLocaleString()}€ -- {priceRange[1].toLocaleString()}€</span>
                  </div>
                </div>
              )}

              {section.id === 'rating' && (
                <>
                  <div className="rating-min-filter">
                    <p>Minimum Rating:</p>
                    <div className="rating-buttons">
                      {[null, 1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating === null ? 'any' : rating}
                          className={`rating-button ${minRating === rating ? 'active' : ''}`}
                          onClick={() => setMinRating(rating)}
                        >
                          {rating === null ? 'Any' : rating + '⭐'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rating-specific-filter">
                    <p>Specific Ratings:</p>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="rating-option">
                        <input 
                          type="checkbox" 
                          checked={selectedRatings.includes(rating)}
                          onChange={() => handleRatingToggle(rating)}
                        />
                        <div className="stars">
                          {renderStars(rating)}
                        </div>
                        <span className="count">({ratingCounts[rating]})</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {section.id === 'availability' && (
                <div className="availability-filter">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="all-products"
                      name="availability"
                      checked={isAvailable === null}
                      onChange={() => setIsAvailable(null)}
                    />
                    <label htmlFor="all-products">All Products ({allProducts.length})</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="available-products"
                      name="availability"
                      checked={isAvailable === true}
                      onChange={() => setIsAvailable(true)}
                    />
                    <label htmlFor="available-products">Available Only ({availabilityCounts.available})</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="unavailable-products"
                      name="availability"
                      checked={isAvailable === false}
                      onChange={() => setIsAvailable(false)}
                    />
                    <label htmlFor="unavailable-products">Unavailable Only ({availabilityCounts.unavailable})</label>
                  </div>
                </div>
              )}
              
              {section.id === 'quantity' && (
                <div className="quantity-filter">
                  <p>Minimum Quantity:</p>
                  <div className="quantity-input">
                    <InputNumber
                      min={0}
                      max={maxQuantity}
                      value={minQuantity}
                      onChange={(value) => setMinQuantity(value !== null ? value : 0)}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              )}
              
              {section.id === 'weight' && (
                <div className="weight-filter">
                  {Object.entries(weightRangeCounts).map(([range, count]) => (
                    <div key={range} className="checkbox-option">
                      <input 
                        type="checkbox" 
                        checked={selectedWeightRanges.includes(range)}
                        onChange={() => handleWeightRangeToggle(range)}
                      />
                      <span className="label">{range}</span>
                      <span className="count">({count})</span>
                    </div>
                  ))}
                </div>
              )}
              
              {section.id === 'organic' && (
                <div className="organic-filter">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="all-products-organic"
                      name="organic"
                      checked={organicFilter === 'all'}
                      onChange={() => setOrganicFilter('all')}
                    />
                    <label htmlFor="all-products-organic">All Products ({allProducts.length})</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="organic-products"
                      name="organic"
                      checked={organicFilter === 'organic'}
                      onChange={() => setOrganicFilter('organic')}
                    />
                    <label htmlFor="organic-products">Organic Only ({organicCounts.organic})</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="non-organic-products"
                      name="organic"
                      checked={organicFilter === 'non-organic'}
                      onChange={() => setOrganicFilter('non-organic')}
                    />
                    <label htmlFor="non-organic-products">Non-Organic Only ({organicCounts.nonOrganic})</label>
                  </div>
                </div>
              )}

              {section.id === 'salesMethod' && (
                <>
                  {Object.entries(salesMethodCounts).map(([method, count]) => (
                    <div key={method} className="checkbox-option">
                      <input 
                        type="checkbox" 
                        checked={selectedSalesMethods.includes(method)}
                        onChange={() => handleSalesMethodToggle(method)}
                      />
                      <span className="label">{method}</span>
                      <span className="count">({count})</span>
                    </div>
                  ))}
                </>
              )}

              {section.id === 'productType' && (
                <>
                  {Object.entries(productTypeCounts).map(([type, count]) => (
                    <div key={type} className="checkbox-option">
                      <input 
                        type="checkbox" 
                        checked={selectedProductTypes.includes(type)}
                        onChange={() => handleProductTypeToggle(type)}
                      />
                      <span className="label">{type}</span>
                      <span className="count">({count})</span>
                    </div>
                  ))}
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