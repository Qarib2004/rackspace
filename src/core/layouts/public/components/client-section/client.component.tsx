import React from 'react';
import './client.components.scss';

const ClienteSection = () => {
  return (
    <div className="cliente-section">
      <div className="cliente-section__container">
        <div className="cliente-card">
          <div className="cliente-card__image-container">
            <img
              src="src/assets/images/cliente/Cliente.cf3a43bb762021445442.jpeg"
              alt="Cliente"
              className="cliente-card__image"
            />
            <div className="cliente-card__overlay" />
            <h2 className="cliente-card__title">Cliente</h2>
            <div className="cliente-card__content">
              <p className="cliente-card__text">
                Está no sítio certo. Valorize a produção regional e o consumo
                consciente. Compre diretamente aos produtores locais!
              </p>
            </div>
          </div>
        </div>

        <div className="cliente-card cliente-card--produtor">
          <div className="cliente-card__image-container">
            <img
              src="src/assets/images/cliente/Produtor.33537edce15aeceb8842.jpeg"
              alt="Produtor"
              className="cliente-card__image"
            />
            <div className="cliente-card__overlay" />
            <h2 className="cliente-card__title cliente-card__title--white">
              Produtor
            </h2>
            <div className="cliente-card__content">
              <p className="cliente-card__text">
                Temos à sua disposição uma plataforma prática e simples que
                permite levar os seus produtos até aos clientes sem
                intermediários.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteSection;
