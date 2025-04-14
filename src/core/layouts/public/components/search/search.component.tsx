import './search.component.scss';
import { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useGetProduct } from './actions/search.query';
import { Link } from 'react-router-dom';

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  _id: string;
  name: string;
  image?: string;
  price?: number;
  category?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data: searchResult, isLoading, isError } = useGetProduct(searchTerm);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    } else {
      setRecentSearches(['Meyve', 'Tərəvəz', 'Süd məhsulları', 'Çörək']);
    }
  }, []);

  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.header__search')
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm.trim());
    }
  };

  const addToRecentSearches = (term: string) => {
    setRecentSearches(prev => {
      const newSearches = [term, ...prev.filter(t => t !== term)].slice(0, 5);
      return newSearches;
    });
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    addToRecentSearches(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className={`search-component ${isOpen ? 'search-component--open' : ''}`}>
      <div
        ref={searchContainerRef}
        className="search-component__container"
      >
        <div className="search-component__header">
          <button className="search-component__back-btn" onClick={onClose}>
            <ArrowLeft size={24} />
          </button>

          <form onSubmit={handleSearch} className="search-component__form">
            <div className="search-component__input-wrapper">
              <Search size={20} className="search-component__icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="search-component__input"
                placeholder="Məhsul axtarın"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-component__clear-btn"
                  onClick={clearSearch}
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button type="submit" className="search-component__submit-btn">
              Axtar
            </button>
          </form>

          <button className="search-component__close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="search-component__content">
          {searchTerm.length === 0 ? (
            <div className="search-component__recent">
              <div className="search-component__recent-header">
                <h3 className="search-component__recent-title">Son axtarışlar</h3>
                {recentSearches.length > 0 && (
                  <button
                    className="search-component__clear-recent"
                    onClick={clearRecentSearches}
                  >
                    Təmizlə
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <ul className="search-component__recent-list">
                  {recentSearches.map((term, index) => (
                    <li key={index} className="search-component__recent-item">
                      <button
                        onClick={() => handleRecentSearchClick(term)}
                        className="search-component__recent-button"
                      >
                        <Search size={16} className="search-component__recent-icon" />
                        <span>{term}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="search-component__no-recent">Son axtarışlar yoxdur</p>
              )}
            </div>
          ) : (
            <div className="search-component__results">
              {isLoading ? (
                <div className="search-component__loading-state">
                  <div className="search-component__spinner"></div>
                  <p>Axtarılır "{searchTerm}"...</p>
                </div>
              ) : isError ? (
                <div className="search-component__error-state">
                  <p>Xəta baş verdi. Yenidən cəhd edin.</p>
                </div>
              ) : searchResult?.data?.length > 0 ? (
                <>
                  <p className="search-component__results-count">
                    {searchResult.data.length} nəticə tapıldı
                  </p>
                  <ul className="search-component__results-list">
                    {searchResult.data.map((product: Product) => (
                      <li key={product._id} className="search-component__result-item">
                        <Link
                          to={`/products/${product._id}`}
                          className="search-component__result-link"
                          onClick={onClose}
                        >
                          {product.image && (
                            <div className="search-component__result-image">
                              <img src={product.image} alt={product.name} />
                            </div>
                          )}
                          <div className="search-component__result-info">
                            <h4 className="search-component__result-name">{product.name}</h4>
                            {product.category && (
                              <span className="search-component__result-category">
                                {product.category}
                              </span>
                            )}
                            {product.price && (
                              <span className="search-component__result-price">
                                {product.price.toFixed(2)} ₼
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="search-component__no-results">
                  <Search size={48} className="search-component__no-results-icon" />
                  <p className="search-component__no-results-text">
                    "{searchTerm}" üzrə heç bir nəticə tapılmadı
                  </p>
                  <p className="search-component__no-results-hint">
                    Başqa açar sözlərlə cəhd edin
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;