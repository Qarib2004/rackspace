import './producerDetails.component.scss';
import { Col, Rate, Row } from 'antd';
import {
  DownOutlined,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import QuestionMessage from 'assets/images/icons/question-message';
import { Link, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useGetUser } from './actions/producer.query';
import defaultImage from '../../assets/images/profil-card/Grupo 32300.jpeg';

const labels = ['Haqqında', 'Çatdırılma/Çatdırılma Siyasəti', 'Rəylər'];

const ProducerDetailsComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showArrows, setShowArrows] = useState(false);
  const id = useParams().id;
  const { data: user } = useGetUser(id);

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
  }, [activeTab, user]); 

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
  }, [user]); 

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="producer">
      <div className="container">
        <Row gutter={[46, 24]}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <div className="producer__img-box">
              <img
                className="producer__img-box__img"
                src={user.photo || defaultImage}
                alt={user.firstname}
              />
            </div>
            <div className="producer__icons">
              <div className="producer__icons__box">
                <ShareAltOutlined className="producer__icons__box__share-icon" />
              </div>
              <div className="producer__icons__box">
                <HeartOutlined className="producer__icons__box__heart-icon" />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <div className="producer__user">
              <h2 className="producer__user__name">
                {user.firstname} {user.lastname}
              </h2>

              <div className="producer__user__info">
                <div className="producer__user__info__left">
                  <div className="producer__user__info__left__box">
                    <p className="producer__user__info__left__box__label">
                      İstehsalçı
                    </p>
                    <p className="producer__user__info__left__box__value">
                      <Link
                        className="producer__user__info__left__box__value__link"
                        to={'#'}
                      >
                        {user.firstname} {user.lastname}
                      </Link>
                      <span className="producer__user__info__left__box__value__icon">
                        {<QuestionMessage />}
                      </span>
                    </p>
                  </div>
                  <div className="producer__user__info__left__box">
                    <p className="producer__user__info__left__box__label producer__user__info__left__box__label-margin">
                      Kəşfiyyat saytları
                    </p>
                    <p className="producer__user__info__left__box__value">
                      {user.productionSites || '-'}
                    </p>
                  </div>
                  <div className="producer__user__info__left__box">
                    <p className="producer__user__info__left__box__label producer__user__info__left__box__label-margin">
                      Əlaqələr
                    </p>
                    <p className="producer__user__info__left__box__value">
                      <Link
                        className="producer__user__info__left__box__value__link"
                        to={`tel:${user.phoneNumber}`}
                      >
                        {user.phoneNumber || 'N/A'}
                      </Link>
                    </p>
                    <p className="producer__user__info__left__box__value">
                      <Link
                        className="producer__user__info__left__box__value__link"
                        to={`mailto:${user.email}`}
                      >
                        {user.email}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="producer__user__info__right">
                  <div className="producer__user__info__right__box">
                    <p className="producer__user__info__right__box__label">
                      Dillər
                    </p>
                    <p className="producer__user__info__right__box__value-status">
                      {user.languages?.join(', ') || '-'}
                    </p>
                  </div>
                  <div className="producer__user__info__right__box">
                    <p className="producer__user__info__right__box__label">
                      Sertifikatlar
                    </p>
                    <p className="producer__user__info__right__box__value">
                      {user.certificates?.join(', ') || '-'}
                    </p>
                  </div>
                  <div className="producer__user__info__right__box">
                    <p className="producer__user__info__right__box__label">
                      Ümumi reytinq
                    </p>
                    <div className="producer__user__info__rating">
                      <div className="producer__user__info__rating__box">
                        <Rate
                          className="producer__user__info__rating__box__rate-icon"
                          value={user.rating || 0}
                          disabled
                        />
                        <DownOutlined className="producer__user__info__rating__box__down-icon" />
                      </div>
                      <span className="producer__user__info__rating__rating-text">
                        <span>{user.reviewCount || 0}</span> rəy
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="producer__user__location">
                <p className="producer__user__location__sentence">
                  Burada satın ala biləcəyiniz yerlərə baxın
                </p>
              </div>

              <div className="producer__user__status">
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
                    className="producer__user__status__info scrollable-tabs"
                    ref={scrollContainerRef}
                  >
                    {labels.map((label, index) => (
                      <p
                        key={index}
                        ref={(el) => (tabRefs.current[index] = el)}
                        className={`producer__user__status__info__label ${activeTab === index ? 'active' : ''
                          }`}
                        onClick={() => handleTabClick(index)}
                      >
                        {label}
                      </p>
                    ))}
                    <span
                      ref={underlineRef}
                      className="producer__user__status__info__moving-underline"
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
                  <p className="producer__user__status__description">
                    {user.about || 'Məlumat yoxdur'}
                  </p>
                )}
                {activeTab === 1 && (
                  <p className="producer__user__status__missing-description">
                    {user.deliveryPolicy || 'Konfiqurasiya edilmiş çatdırılma/göndərmə siyasəti yoxdur'}
                  </p>
                )}
                {activeTab === 2 && (
                  <div className="producer__user__status__missing-description">
                    {user.reviews?.length > 0 ? (
                      user.reviews.map((review: any, index: any) => (
                        <div key={index} className="review-item">
                          <Rate value={review.rating} disabled />
                          <p>{review.comment}</p>
                          <p className="review-author">- {review.author}</p>
                        </div>
                      ))
                    ) : (
                      <p>Rəy yoxdur.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProducerDetailsComponent;