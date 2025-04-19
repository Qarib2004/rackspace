import './details.component.scss';
import { Col, Rate, Row } from 'antd';
import {
  DownOutlined,
  HeartOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
  ShareAltOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Search } from 'lucide-react';
import QuestionMessage from 'assets/images/icons/question-message';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

const labels = ['Haqqında', 'Çatdırılma/Çatdırılma Siyasəti', 'Rəylər'];

const DetailsComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showArrows, setShowArrows] = useState(false);

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 100;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    const underline = underlineRef.current;

    if (currentTab && underline) {
      underline.style.width = `${currentTab.offsetWidth}px`;
      underline.style.left = `${currentTab.offsetLeft}px`;
    }
  }, [activeTab]);

  useEffect(() => {
    const checkOverflow = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowArrows(container.scrollWidth > container.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <>
      <div className="details">
        <div className="container">
          <Row gutter={[46, 24]}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <div className="details__img-box">
                <img
                  className="details__img-box__img"
                  src="https://api.agromarket.pt//public_images/producer/notices/cnDpkdergVbO0W57qaoDP1wZZ8nH5OpmXLe6LBNI.jpg"
                  alt="products"
                />
              </div>
              <div className="details__icons">
                <div className="details__icons__box">
                  <ShareAltOutlined className="details__icons__box__share-icon" />
                </div>
                <div className="details__icons__box">
                  <HeartOutlined className="details__icons__box__heart-icon" />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              <div className="details__product">
                <h2 className="details__product__name-price">
                  Limon <span>(1 kq)</span>
                </h2>

                <div className="details__product__details">
                  <div className="details__product__details__quantity">
                    <div className="details__product__details__quantity-adjuster">
                      <p className="details__product__details__decrement">
                        <MinusOutlined />
                      </p>
                      <p className="details__product__details__quantity-number">
                        1
                      </p>
                      <p className="details__product__details__increment">
                        <PlusOutlined />
                      </p>
                    </div>
                    <div className="details__product__details__price-info">
                      <p className="details__product__details__price-info__unit-price">
                        1,00 €/vahid
                      </p>
                      <p className="details__product__details__price-info__total-price">
                        €1.00
                      </p>
                    </div>
                  </div>

                  <div className="details__product__details__actions">
                    <button className="details__product__details__actions__add-button">
                      <span>
                        <ShoppingOutlined className="details__product__details__actions__add-button__shopping-bag" />
                      </span>
                      əlavə et
                    </button>
                    <button className="details__product__details__actions__buy-button">
                      indi al
                    </button>
                  </div>
                </div>

                <div className="details__product__info">
                  <div className="details__product__info__left">
                    <div className="producer__product__info__left__box">
                      <p className="details__product__info__left__box__label">
                        İstehsalçı
                      </p>
                      <p className="details__product__info__left__box__value">
                        <Link
                          className="details__product__info__left__box__value__link"
                          to={'#'}
                        >
                          Maria Jardim
                        </Link>
                        <span className="details__product__info__left__box__value__icon">
                          {<QuestionMessage />}
                        </span>
                      </p>
                    </div>
                    <div className="producer__product__info__left__box">
                      <p className="details__product__info__left__box__label details__product__info__left__box__label-margin">
                        İstehsal yerləri
                      </p>
                      <p className="details__product__info__left__box__value">
                        <Link
                          className="details__product__info__left__box__value__link"
                          to={'#'}
                        >
                          Maria Jardim
                        </Link>
                      </p>
                    </div>
                    <div className="producer__product__info__left__box">
                      <p className="details__product__info__left__box__label details__product__info__left__box__label-margin">
                        Sertifikatlar
                      </p>
                      <p className="details__product__info__left__box__value">
                        -
                      </p>
                    </div>
                  </div>
                  <div className="details__product__info__right">
                    <div className="producer__product__info__right__box">
                      {' '}
                      <p className="details__product__info__right__box__label">
                        Vəziyyət
                      </p>
                      <p className="details__product__info__right__box__value-status">
                        Stokda
                      </p>
                    </div>
                    <div className="producer__product__info__right__box">
                      <p className="details__product__info__right__box__label">
                        Satış növü
                      </p>
                      <p className="details__product__info__right__box__value">
                        Onlayn və yerində
                      </p>
                    </div>
                    <div className="producer__product__info__right__box">
                      <p className="details__product__info__right__box__label">
                        Məhsulun geri qaytarılması
                      </p>
                      <p className="details__product__info__right__box__value">
                        yox
                      </p>
                    </div>
                    <div className="producer__product__info__right__box">
                      <p className="details__product__info__right__box__label">
                        Ümumi reytinq
                      </p>
                      <div className="details__product__info__rating">
                        <div className="details__product__info__rating__box">
                          <Rate className="details__product__info__rating__box__rate-icon" />
                          <DownOutlined className="details__product__info__rating__box__down-icon" />
                        </div>
                        <span className="details__product__info__rating__rating-text">
                          <span>0</span> rəy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details__product__location">
                  <p className="details__product__location__sentence">
                    Burada satın ala biləcəyiniz yerlərə baxın
                  </p>
                  <div className="details__product__location__box">
                    <div className="details__product__location__box__big-device">
                      <Row>
                        <Col span={12}>
                          <p className="details__product__location__box__label">
                            Satış nöqtəsi
                          </p>
                          <p className="details__product__location__box__value-with-underline">
                            Maria Jardim
                          </p>
                        </Col>

                        <Col span={12}>
                          <p className="details__product__location__box__label">
                            Cədvəllər
                          </p>
                          <p className="details__product__location__box__value">
                            Çərşənbə axşamı və cümə günləri saat 13:00-da...
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div className="details__product__location__box__small-device">
                      <p className="details__product__location__box__value-with-underline">
                        Kahinlərin Fajası
                      </p>
                      <p>
                        <Search className="details__product__location__box__small-device__search-icon" />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="details__product__status">
                  <div className="tabs-wrapper">
                    {showArrows && (
                      <p
                        className="arrow-btn"
                        onClick={() => scrollTabs('left')}
                      >
                        <LeftOutlined />
                      </p>
                    )}

                    <div
                      className="details__product__status__info scrollable-tabs"
                      ref={scrollContainerRef}
                    >
                      {labels.map((label, index) => (
                        <p
                          key={index}
                          ref={(el) => (tabRefs.current[index] = el)}
                          className={`details__product__status__info__label ${
                            activeTab === index ? 'active' : ''
                          }`}
                          onClick={() => handleTabClick(index)}
                        >
                          {label}
                        </p>
                      ))}
                      <span
                        ref={underlineRef}
                        className="details__product__status__info__moving-underline"
                      />
                    </div>

                    {showArrows && (
                      <p
                        className="arrow-btn"
                        onClick={() => scrollTabs('right')}
                      >
                        <RightOutlined />
                      </p>
                    )}
                  </div>

                  {activeTab === 0 && (
                    <p className="details__product__status__description">
                      Orqanik olaraq istehsal olunan limon.
                    </p>
                  )}
                  {activeTab === 1 && (
                    <p className="details__product__status__missing-description">
                      Konfiqurasiya edilmiş çatdırılma/göndərmə siyasəti yoxdur
                    </p>
                  )}
                  {activeTab === 2 && (
                    <p className="details__product__status__missing-description">
                      Rəy yoxdur.
                    </p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DetailsComponent;
