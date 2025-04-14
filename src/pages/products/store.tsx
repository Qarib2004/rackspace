import React, { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from './sidebar/sidebar';
import Card from 'core/shared/base-card/card.component';
import { SlidersHorizontal, ChevronDown, X, ArrowUp } from 'lucide-react';
import './store.component.scss';
import StoreOne from 'core/layouts/public/components/store-one-section/store-one.component';
import { Product } from 'core/shared/home-card/card';
import { useGetProducts } from 'core/shared/home-card/actions/card.query';
import { debounce} from 'lodash';


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

const Store = () => {
  const { data: products } = useGetProducts();
  const allProducts = products?.data ?? [];
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Relevance');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    searchTerm: '',
    priceRange: [0, 1000], 
    categories: [],
    sellers: [],
    ratings: [],
    salesMethods: [],
    productTypes: [],
    isAvailable: null,
    minQuantity: 0,
    weightRanges: [],
    organic: 'all',
    minRating: null,
  });
  const [showMobileNav, setShowMobileNav] = useState(false);

  const oneSectionRef = useRef<HTMLDivElement | null>(null);
  const sortOptions = [
    'Price',
    'Publication date',
    'Weight',      
    'Rating',      
  ];
  
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const parseWeight = (weight: string) => {
    if (!weight) return 0;
    const match = weight.match(/^(\d+)(g|kg)$/);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    const unit = match[2];
    return unit === 'kg' ? value * 1000 : value;
  };

  const getWeightRange = (weight: string): string => {
    if (!weight) return '0-1kg';
    const weightInKg = parseWeight(weight) / 1000; 
    
    if (weightInKg <= 1) return '0-1kg';
    if (weightInKg <= 5) return '1-5kg';
    return '5+kg';
  };

  const applyFiltersAndSort = useCallback(() => {
    if (!allProducts || allProducts.length === 0) {
      return;
    }

    let result = [...allProducts];

    if (activeFilters) {
      if (activeFilters.searchTerm) {
        const searchLower = activeFilters.searchTerm.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          (product.description && product.description.toLowerCase().includes(searchLower))
        );
      }

      result = result.filter(product => 
        product.price >= activeFilters.priceRange[0] && product.price <= activeFilters.priceRange[1]
      );

      if (activeFilters.categories.length > 0) {
        result = result.filter(product => {
          const category = product.name.split(' ')[0];
          return activeFilters.categories.includes(category);
        });
      }

      if (activeFilters.sellers.length > 0) {
        result = result.filter(product => 
          product.seller && product.seller.firstname && 
          activeFilters.sellers.includes(product.seller.firstname)
        );
      }

      if (activeFilters.ratings.length > 0) {
        result = result.filter(product => {
          if (!product.rating) return false;
          const rating = Math.floor(product.rating);
          return activeFilters.ratings.includes(rating);
        });
      }

      if (activeFilters.minRating !== null) {
        result = result.filter(product => 
          product.rating !== undefined && product.rating >= activeFilters.minRating!
        );
      }

      if (activeFilters.salesMethods.length > 0) {
        result = result.filter(product => {
          const method = (product.quantity && product.quantity > 10) ? 'Online sales' : 'Local Sale';
          return activeFilters.salesMethods.includes(method);
        });
      }

      if (activeFilters.productTypes.length > 0) {
        result = result.filter(product => {
          const type = product.isOrganic ? 'Singular' : 'Basket';
          return activeFilters.productTypes.includes(type);
        });
      }

      if (activeFilters.isAvailable !== null) {
        result = result.filter(product => product.isAvailable === activeFilters.isAvailable);
      }

      if (activeFilters.minQuantity > 0) {
        result = result.filter(product => 
          (product.quantity || 0) >= activeFilters.minQuantity
        );
      }

      if (activeFilters.weightRanges.length > 0) {
        result = result.filter(product => {
          if (!product.weight) return false;
          const weightRange = getWeightRange(product.weight);
          return activeFilters.weightRanges.includes(weightRange);
        });
      }

      if (activeFilters.organic !== 'all') {
        result = result.filter(product => {
          if (activeFilters.organic === 'organic') return product.isOrganic === true;
          return product.isOrganic === false;
        });
      }
    }

    if (sortOption !== 'Relevance') {
      switch (sortOption) {
        case 'Price':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'Publication date':
          result.sort(
            (a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
          );
          break;
        case 'Weight':
          result.sort(
            (a, b) => parseWeight(a.weight || '') - parseWeight(b.weight || '')
          );
          break;
        case 'Rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }
    }

    setDisplayedProducts(result);
  }, [allProducts, activeFilters, sortOption]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      setDisplayedProducts([...allProducts]);
    }
  }, [allProducts]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleFilterChange = useCallback(
    debounce((newFilters: FilterState) => {
      setActiveFilters(newFilters);
    }, 500), 
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setDesktopSidebarVisible(false); 
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (oneSectionRef.current) {
        const oneSectionBottom =
          oneSectionRef.current.getBoundingClientRect().bottom;
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
    setSortMenuVisible(false);
  };

  return (
    <>
      <div ref={oneSectionRef}>
        <StoreOne />
      </div>

      <div className="store-section-flex" >
      {desktopSidebarVisible && (
  <div className="store-sidebar-container" ref={sidebarRef}  style={{ backgroundColor: 'white' }}>
    <Sidebar 
      onClose={handleToggleDesktopSidebar} 
      onFilterChange={handleFilterChange}
     
    />
  </div>
)}

        <div
          className={`store-content-container ${
            desktopSidebarVisible || sortMenuVisible || mobileSidebarVisible
              ? 'blurred'
              : ''
          }`}
        >
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
                        className={`sort-controls__dropdown-menu-item ${
                          sortOption === option
                            ? 'sort-controls__dropdown-menu-item--active'
                            : ''
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
  data={displayedProducts.map(p => ({
    ...p,
    _id: String(p._id)
  }))}
  imageKey="image"
  titleKey="name"
  subtitleKey="seller"
  additionalKeys={['weight']}
  showPagination={false}
  pageTitle="Məhsullar"
  priceKey="price"
  keyLabels={{
    weight: 'Çəki',
    price: 'Qiymət',
    name: 'Ad',
    seller: 'Satıcı',
    quantity: 'Miqdar'
  }}
/>


        </div>

        <div
          className={`mobile-nav-store ${
            showMobileNav ? 'mobile-nav-store--visible' : ''
          }`}
        >
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

        <div
          className={`mobile-sidebar ${
            mobileSidebarVisible ? 'mobile-sidebar--visible' : ''
          }`}
        >
          <div className="mobile-sidebar__header">
            <h2>Filters</h2>
            <button
              className="mobile-sidebar__close"
              onClick={handleToggleMobileSidebar}
            >
              <X size={24} />
            </button>
          </div>
          <div className="mobile-sidebar__content">
            <Sidebar 
              onClose={handleToggleMobileSidebar} 
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div
          className={`mobile-sort-menu ${
            sortMenuVisible ? 'mobile-sort-menu--visible' : ''
          }`}
          ref={sortMenuRef}
        >
          <div className="mobile-sort-menu__header">
            <h2>Sort by</h2>
            <button
              className="mobile-sort-menu__close"
              onClick={handleToggleSortMenu}
            >
              <X size={24} />
            </button>
          </div>
          <div className="mobile-sort-menu__content">
            {sortOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSortChange(option)}
                className={`mobile-sort-menu__item ${
                  sortOption === option ? 'mobile-sort-menu__item--active' : ''
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