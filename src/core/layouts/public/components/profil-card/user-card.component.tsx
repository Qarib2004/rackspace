import React, { useEffect, useState } from 'react';
import { FileUser, MoreVertical } from 'lucide-react';
import './profil.component.scss';
import { User } from 'core/utils/IUser';
import defaultImage from '../../../../../assets/images/profil-card/hFicmWpIh6RnU8cNVzRVY594zGMfbEFQicik4dPr (1).jpg'; // default image for fallback

interface ProfilCardProps {
  users: User[];
}

const UsersPage: React.FC<ProfilCardProps> = ({ users }) => {
  const [productsPerPage, setProductsPerPage] = useState(4);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setProductsPerPage(isMobile ? 2 : 4);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const totalPages = Math.ceil(users.length / productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = users.slice(indexOfFirstProduct, indexOfLastProduct);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">İstehsalçı profili</h1>
          <div className="pagination">
            <span className="pagination-info">
              Səhifə {currentPage} / {totalPages}
            </span>
            <div className="pagination-buttons">
              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                ←
              </button>
              <button
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={goToNextPage}
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="products-grid">
          {currentProducts.map((user) => (
            <div key={user.id} className="product-card">
              <button className="options-button">
                <MoreVertical className="options-icon" />
              </button>
              <div className="product-image-container">
                <img
                  src={user.photo || defaultImage}
                  alt={user.firstname}
                  className="product-image"
                />
              </div>

              <div className="product-details">
                <div className="product-header">
                  <div className="product-title-container">
                    <h3 className="product-title">{user.firstname}</h3>
                  </div>
                </div>

                <p className="product-producer">
                  Email: <span className="producer-name">{user.email}</span>
                </p>

                <p className="product-producer">
                  Tlm: <span className="producer-name">{user.phoneNumber || 'N/A'}</span>
                </p>

                <div className="product-rating">
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="rating-star">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="product-actions">
                  <button className="buy-button">
                    <FileUser />
                    Ətraflı məlumat əldə edin
                  </button>
                  <button className="add-button">
                    <span className="plus-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>{' '}
                    Mesaj göndər
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

export default UsersPage;
