import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import './card.component.scss';
import cardImg from '../../../assets/images/home-card/dGcTPgGHVd93YBZM3BKS2wXFC9tnRf8dLgCdDWa5.jpg';

interface Product {
  id: number;
  name: string;
  producer: string;
  weight: string;
  price: number;
  image: string;
}
const products: Product[] = [
  {
    id: 1,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '10 gr',
    price: 1.6,
    image: `${cardImg}`,
  },
  {
    id: 2,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '50 gr',
    price: 1.5,
    image: `${cardImg}`,
  },
  {
    id: 3,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '60 gr',
    price: 1.5,
    image: `${cardImg}`,
  },
  {
    id: 4,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '300 gr',
    price: 1.69,
    image: `${cardImg}`,
  },
  {
    id: 5,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '300 gr',
    price: 1.69,
    image: `${cardImg}`,
  },
  {
    id: 6,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '300 gr',
    price: 1.69,
    image: `${cardImg}`,
  },
  {
    id: 7,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '300 gr',
    price: 1.69,
    image: `${cardImg}`,
  },
  {
    id: 8,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '200 gr',
    price: 1.79,
    image: `${cardImg}`,
  },
  {
    id: 9,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '250 gr',
    price: 1.89,
    image: `${cardImg}`,
  },
  {
    id: 10,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '100 gr',
    price: 1.59,
    image: `${cardImg}`,
  },
  {
    id: 11,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '150 gr',
    price: 1.65,
    image: `${cardImg}`,
  },
  {
    id: 12,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '175 gr',
    price: 1.75,
    image: `${cardImg}`,
  },
  {
    id: 13,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '225 gr',
    price: 1.85,
    image: `${cardImg}`,
  },
  {
    id: 14,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '350 gr',
    price: 1.95,
    image: `${cardImg}`,
  },
  {
    id: 15,
    name: 'Məlumat yoxdur',
    producer: 'Hüseynağa',
    weight: '400 gr',
    price: 2.05,
    image: `${cardImg}`,
  },
];

const Card = () => {
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
            <span className="pagination-info">Səhifə {currentPage}/{totalPages}</span>
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
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <button className="options-button">
                <MoreVertical className="options-icon" />
              </button>
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <div className="certification-badge">
                  <img
                    src="src/assets/images/home-card/download.jpeg"
                    alt="Organic certification"
                    className="certification-icon"
                  />
                </div>
              </div>

              <div className="product-details">
                <div className="product-header">
                  <div className="product-title-container">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-weight">({product.weight})</p>
                  </div>

                </div>

                <p className="product-producer">
                  İstehsalçı:{' '}
                  <span className="producer-name">{product.producer}</span>
                </p>

                <div className="product-rating">
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="rating-star">
                        ★
                      </span>
                    ))}
                  </div>
                  <div>
                    <span className="product-price">
                      {product.price.toFixed(2)} €
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