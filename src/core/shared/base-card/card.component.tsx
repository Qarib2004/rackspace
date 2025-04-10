import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import './card.component.scss';
import { User } from 'core/utils/IUser';

interface CardProps<T> {
  data: T[];
  imageKey?: keyof T;
  titleKey: keyof T;
  subtitleKey?: keyof T;
  additionalKeys?: (keyof T)[];
  itemsPerPage?: number;
  showPagination?: boolean;
  pageTitle?: string;
  priceKey?: keyof T;
}

const Card = <T extends { rating?: number }>({
  data,
  imageKey,
  titleKey,
  subtitleKey,
  additionalKeys = [],
  itemsPerPage = 4,
  showPagination = true,
  pageTitle,
  priceKey
}: CardProps<T>) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = showPagination
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="page-header">
          {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
          {showPagination && totalPages > 1 && (
            <div className="pagination">
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <div className="pagination-buttons">
                <button
                  className="pagination-button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                <button
                  className="pagination-button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="products-grid">
          {currentItems.map((item, index) => (
            <div key={index} className="product-card">
              <button className="options-button">
                <MoreVertical className="options-icon" />
              </button>

              {imageKey && (
                <div className="product-image-container">
                  <img
                    src={String(item[imageKey])}
                    alt={String(item[titleKey])}
                    className="product-image"
                  />
                </div>
              )}

              <div className="product-details">
                <div className="product-info">
                  <div className="product-title-container">
                    <h3 className="product-title">{String(item[titleKey])}</h3>
                    
                    {subtitleKey && (
                      <span className="product-weight">
                        Seller:
                        {typeof item[subtitleKey] === 'object' &&
                        item[subtitleKey] !== null
                          ? (item[subtitleKey] as User).firstname
                          : String(item[subtitleKey])}
                      </span>
                    )}
                  </div>

                  {additionalKeys.map((key) => (
                    <p key={String(key)} className="product-producer">
                      <span className="producer-name">{String(key)}</span>:{' '}
                      {String(item[key])}
                    </p>
                  ))}
                </div>

                <div className="product-rating">
                  <div>
                    {[...Array(5)].map((_, i) => {
                      const rating = (item as any).rating || 0; 
                      const full = i + 1 <= Math.floor(rating);
                      const half = i < rating && i + 1 > rating;
                      return (
                        <span key={i} className="rating-star">
                          {full ? '★' : half ? '⯪' : '☆'}
                        </span>
                      );
                    })}
                  </div>
                  {priceKey && (<span className="product-price"> {String(item[priceKey as keyof T])}₼</span> )}
                </div>

                <div className="product-actions">
                  <button className="buy-button"><span><i className="fa-solid fa-cart-shopping" style={{color:'#ccdadb'}}></i></span>Buy </button>
                  <button className="add-button">
                    <span className="plus-icon">+</span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
