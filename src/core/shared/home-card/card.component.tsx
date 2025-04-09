import  { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import './card.component.scss';
import { Product } from './card';
import { useGetProducts } from './actions/card.query';

const Card = () => {
 
  const{ data: products} = useGetProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  
  
  
  const allProducts = products?.data ?? [];

  const totalPages = Math.ceil(products?.length / productsPerPage);


  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
          <h1 className="page-title">Bu yaxınlarda əlavə edildi</h1>
          <div className="pagination">
            <span className="pagination-info">
              Səhifə {currentPage}/{totalPages}
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
          {currentProducts.map((product: Product) => (
            <div key={product.id} className="product-card">
              <button className="options-button">
                <MoreVertical className="options-icon" />
              </button>
              <div className="product-image-container">
                {product.image && product.image.length > 0 && (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="product-image"
                  />
                )}
              </div>

              <div className="product-details">
                <div className="product-header">
                  <div className="product-title-container">
                    <h3 className="product-title">{product.name}</h3>
                    {product.weight && (
                      <p className="product-weight">({product.weight})</p>
                    )}
                  </div>
                </div>

                {product.seller && (
                  <p className="product-producer">
                    İstehsalçı:{' '}
                    <span className="producer-name">
                      {typeof product.seller === 'object' &&
                      product.seller !== null
                        ? product.seller.firstname || 'Unknown'
                        : typeof product.seller === 'string'
                        ? product.seller
                        : 'Unknown'}
                    </span>
                  </p>
                )}

                <div className="product-rating">
                  <div className="rating">
                    {[...Array(5)].map((_, i) => {
                      const full = i + 1 <= Math.floor(product.rating || 0);
                      const half =
                        i < (product.rating || 0) &&
                        i + 1 > (product.rating || 0);
                      return (
                        <span key={i} className="rating-star">
                          {full ? '★' : half ? '⯪' : '☆'}
                        </span>
                      );
                    })}
                  </div>

                  <div>
                    <span className="product-price">
                      {product.price?.toFixed(2)} ₼
                    </span>
                  </div>
                </div>

                <div className="product-actions">
                  <button className="buy-button">Indi al</button>
                  <button className="add-button">
                    <span className="plus-icon">+</span> Əlavə etmək üçün
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
