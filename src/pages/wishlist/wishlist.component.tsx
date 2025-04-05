import React from 'react';
import './wishlist.component.scss';
import { Filter, X, Trash2 } from 'lucide-react';
import { useState } from 'react';

const FavoritesPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Hamısı');
    
    const filterOptions = ['Hamısı', 'Məhsullar', 'Elan', 'Istehsalci'];
    
    const handleFilterSelect = (filter: string) => {
      setSelectedFilter(filter);
      setIsModalOpen(false);
    };
    
    const handleDeleteAll = () => {
      console.log('Delete all favorites');
    };
  
    return (
      <div className="favorites-page">
        <header className="header1">
          <h1 className="header1__title">SALAM USERNAME</h1>
          <p className="header1__welcome">SEVİMLİ SİYAHINA XOŞ GƏLİRSİNİZ</p>
        </header>
  
        <main className="main-content">
          <div className="favorites-container">
            <div className="favorites-header">
              <h2 className="favorites-header__title">Sevimlilər siyahısı</h2>
              
              <div className="favorites-header__actions">
                <button 
                  className="favorites-header__filter"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Filter size={18} />
                  <span>Filtr: {selectedFilter}</span>
                  <div className="dropdown-icon">▼</div>
                </button>
                
                <button 
                  className="favorites-header__delete"
                  onClick={handleDeleteAll}
                  aria-label="Delete all favorites"
                >
                  <Trash2 size={18} />
                  <span className="delete-text">Hamısını sil</span>
                </button>
              </div>
            </div>
  
            <div className="favorites-list">
              <p className="favorites-list__empty-message">
                Axtarışınız heç bir favoritə uyğun gəlmədi.
              </p>
            </div>
  
            <div className="illustration">
              <div className="illustration__image">
                <img src="src\assets\images\favorites\download.webp" alt="" />
              </div>
            </div>
          </div>
        </main>
        
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3>Filtr seçin</h3>
                <button 
                  className="modal__close" 
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal__content">
                <ul className="filter-options">
                  {filterOptions.map((filter) => (
                    <li 
                      key={filter} 
                      className={`filter-option ${selectedFilter === filter ? 'filter-option--selected' : ''}`}
                      onClick={() => handleFilterSelect(filter)}
                    >
                      {filter}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default FavoritesPage;