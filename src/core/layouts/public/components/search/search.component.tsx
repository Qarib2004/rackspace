// SearchComponent.tsx
import './search.component.scss';
import { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Meyve', 'Tərəvəz', 'Süd məhsulları', 'Çörək'
  ]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
      if (!recentSearches.includes(searchTerm.trim())) {
        setRecentSearches(prev => [searchTerm.trim(), ...prev.slice(0, 4)]);
      }
      
      console.log('Searching for:', searchTerm);
      
    }
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    console.log('Searching for recent term:', term);
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
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
          {searchTerm.length === 0 && (
            <div className="search-component__recent">
              <h3 className="search-component__recent-title">Son axtarışlar"s</h3>
              <ul className="search-component__recent-list">
                {recentSearches.map((term, index) => (
                  <li key={index} className="search-component__recent-item">
                    <button onClick={() => handleRecentSearchClick(term)}>
                      <Search size={16} />
                      <span>{term}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {searchTerm.length > 0 && (
            <div className="search-component__results">
              <p className="search-component__no-results">
              Axtarılır "{searchTerm}"...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;