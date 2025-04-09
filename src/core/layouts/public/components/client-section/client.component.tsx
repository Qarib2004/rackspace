import './client.components.scss';
import Image1 from '../../../../../assets/images/cliente/Cliente.cf3a43bb762021445442.jpeg';
import Image2 from '../../../../../assets/images/cliente/Produtor.33537edce15aeceb8842.jpeg';


const ClienteSection = () => {
  return (
    <div className="cliente-section">
      <div className="cliente-section__container">
        <div className="cliente-card">
          <div className="cliente-card__image-container">
            <img
              src={Image1}
              alt="Cliente"
              className="cliente-card__image"
            />
            <div className="cliente-card__overlay" />
            <h2 className="cliente-card__title">Müştəri</h2>
            <div className="cliente-card__content">
              <p className="cliente-card__text">
                Siz doğru yerdəsiniz. Regional istehsala və şüurlu istehlaka
                dəyər verin. Birbaşa yerli istehsalçılardan alın!
              </p>
            </div>
          </div>
        </div>

        <div className="cliente-card cliente-card--produtor">
          <div className="cliente-card__image-container">
            <img
              src={Image2}
              alt="Produtor"
              className="cliente-card__image"
            />
            <div className="cliente-card__overlay" />
            <h2 className="cliente-card__title cliente-card__title--white">
              İstehsalçı
            </h2>
            <div className="cliente-card__content">
              <p className="cliente-card__text">
                Məhsullarınızı vasitəçi olmadan müştərilərə çatdırmağa imkan
                verən praktik və sadə platformamız var.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteSection;
