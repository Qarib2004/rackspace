import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import './profil.component.scss';

interface Product {
  id: number;
  name: string;
  email: string;
  tlm: string;
  image: string;
}

const cardImg = 'src/assets/images/profil-card/Grupo 32300.png';

const cardImg2 = 'src/assets/images/profil-card/Grupo 32331.jpeg';

const cardImg3 = 'src/assets/images/profil-card/Grupo 32333.jpeg';

const cardImg4 =
  'src/assets/images/profil-card/hFicmWpIh6RnU8cNVzRVY594zGMfbEFQicik4dPr (1).jpg';

const cardImg5 =
  'src/assets/images/profil-card/R67wI1AYFwOeFEdNV5R9H6N2juXoz434SQ8jdxdF (1).jpg';

const products: Product[] = [
  {
    id: 1,
    name: 'Francisco Daniel Gonçalves Freitas',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg}`,
  },
  {
    id: 2,
    name: 'Eugénio Câmara',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg2}`,
  },
  {
    id: 3,
    name: 'Sem informação',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg3}`,
  },
  {
    id: 4,
    name: 'Sem informação',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg4}`,
  },
  {
    id: 5,
    name: 'Sem informação',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg5}`,
  },
  {
    id: 6,
    name: 'Francisco Daniel Gonçalves Freitas',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg}`,
  },
  {
    id: 7,
    name: 'Eugénio Câmara',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg2}`,
  },
  {
    id: 8,
    name: 'Ricardo Ventura',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg3}`,
  },
  {
    id: 9,
    name: 'Sem informação',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg4}`,
  },
  {
    id: 10,
    name: 'Sem informação',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg5}`,
  },
  {
    id: 11,
    name: 'Francisco Daniel Gonçalves Freitas',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg}`,
  },
  {
    id: 12,
    name: 'Eugénio Câmara',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg2}`,
  },
  {
    id: 13,
    name: 'Ricardo Ventura',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg3}`,
  },
  {
    id: 14,
    name: 'Sem informação',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg4}`,
  },
  {
    id: 15,
    name: 'Sem informação',
    email: 'freitas.helder84@gmail.com',
    tlm: '966692723',
    image: `${cardImg5}`,
  },
];

const ProfilCard = () => {
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
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
          <h1 className="page-title">Perfil produtor</h1>
          <div className="pagination">
            <span className="pagination-info">
              Página {currentPage} de {totalPages}
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
              </div>

              <div className="product-details">
                <div className="product-header">
                  <div className="product-title-container">
                    <h3 className="product-title">{product.name}</h3>
                  </div>
                </div>

                <p className="product-producer">
                  Email: <span className="producer-name">{product.email}</span>
                </p>

                <p className="product-producer">
                  Tlm: <span className="producer-name">{product.tlm}</span>
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
                  <button className="buy-button">Saiba Mais</button>
                  <button className="add-button">
                    <span className="plus-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>{' '}
                    Enivar Mensagem
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

export default ProfilCard;
