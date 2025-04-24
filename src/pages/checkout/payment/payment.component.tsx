import React, { useState } from 'react';
import './payment.component.scss';
import { Check, Dot, Minus, Plus, Trash2 } from 'lucide-react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Paypay from 'assets/images/checkout/Paypay';
import MbWay from 'assets/images/checkout/MbWay';
import DebitCard from 'assets/images/checkout/DebitCard';

const PaymentComponent = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      <div className="checkout">
        <div className="checkout__border">
          <div className="checkout__shipping-info">
            <div className="checkout__shipping-info__box">
              <p>
                {' '}
                <Check className="checkout__shipping-info__box__checked" />
              </p>
              <p className="checkout__shipping-info__box__name">
                faktura ünvanı
              </p>
              <span className="checkout__shipping-info__box__tick">
                <Check />
              </span>
            </div>
            <span className="checkout__shipping-info__line"></span>
            <div className="checkout__shipping-info__box">
              <p>
                {' '}
                <Check className="checkout__shipping-info__box__checked" />
              </p>
              <p className="checkout__shipping-info__box__name">
                çatdırılma üsulu
              </p>
              <span className="checkout__shipping-info__box__tick">
                <Check />
              </span>
            </div>
            <span className="checkout__shipping-info__line"></span>
            <div className="checkout__shipping-info__box">
              <p className="checkout__shipping-info__box__number-bg">3</p>
              <p className="delivery__shipping-info__box__name-bold">ödəniş</p>
              <span className="checkout__shipping-info__box__circle">
                <Dot />
              </span>
            </div>
          </div>
        </div>

        <div className="checkout__cards">
          <div className="container">
            <Row>
              <Col xs={24} sm={24} md={24} lg={14} xl={15}>
                <div className="checkout__cards__info">
                  <p className="checkout__cards__info__heading">Ödəniş üsulu</p>
                  <div className="checkout__cards__info__box">
                    <Row>
                      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div className="checkout__cards__info__box__card checkout__cards__info__box__card-margin">
                          {<Paypay />}
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div className="checkout__cards__info__box__card">
                          {<MbWay />}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <div className="checkout__cards__info__box__debit-card checkout__cards__info__box__card">
                          {<DebitCard />}
                          <p>Credit/Debit Card</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <p className="checkout__cards__info__paragraph">
                    PayPay is an online payment service that makes it as easy as
                    possible for businesses to issue and receive payments from
                    their customers through a faster and more secure process.
                    You will be redirected to PayPay, one of our trusted
                    partners.
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={10} xl={9}>
                <div className="checkout__cards__details">
                  <div className="checkout__cards__details__box">
                    <p className="checkout__cards__details__box__sum">Xülasə</p>
                    {open ? (
                      <p onClick={() => setOpen(false)}>
                        <Plus className="checkout__cards__details__box__icon" />
                      </p>
                    ) : (
                      <p onClick={() => setOpen(true)}>
                        <Minus className="checkout__cards__details__box__icon" />
                      </p>
                    )}
                  </div>

                  <p className="checkout__cards__details__products">
                    Məhsullar{' '}
                    <span className="checkout__cards__details__number">
                      (2)
                    </span>
                  </p>

                  <div
                    className={`checkout__cards__details__product ${
                      open ? 'open' : ''
                    }`}
                  >
                    <div className="checkout__cards__details__product__box">
                      <p className="checkout__cards__details__product__producer">
                        Maria Jardim
                      </p>

                      <div className="checkout__cards__details__product__info">
                        <div className="checkout__cards__details__product__info__img-box">
                          <img
                            className="checkout__cards__details__product__info__img-box__img"
                            src="https://api.agromarket.pt/public_images/producer/notices/cnDpkdergVbO0W57qaoDP1wZZ8nH5OpmXLe6LBNI.jpg"
                            alt="product"
                          />
                        </div>

                        <div>
                          <div className="checkout__cards__details__product__info__details">
                            <p className="checkout__cards__details__product__info__details__name">
                              Üzvi salsa
                            </p>
                            <p>
                              <Trash2 className="checkout__cards__details__product__info__details__trash-icon" />
                            </p>
                          </div>
                          <p className="checkout__cards__details__product__info__note">
                            Aşağı səhmlər
                          </p>

                          <div className="checkout__cards__details__product__info__quantity">
                            <div className="checkout__cards__details__product__info__quantity-adjuster">
                              <p className="checkout__cards__details__product__info__decrement">
                                <MinusOutlined />
                              </p>
                              <p className="checkout__cards__details__product__info__quantity-number">
                                1
                              </p>
                              <p className="checkout__cards__details__product__info__increment">
                                <PlusOutlined />
                              </p>
                            </div>
                            <p className="checkout__cards__details__product__info__total-price">
                              €1.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkout__cards__details__product__box">
                      <p className="checkout__cards__details__product__producer">
                        Maria Jardim
                      </p>

                      <div className="checkout__cards__details__product__info">
                        <div className="checkout__cards__details__product__info__img-box">
                          <img
                            className="checkout__cards__details__product__info__img-box__img"
                            src="https://api.agromarket.pt/public_images/producer/notices/cnDpkdergVbO0W57qaoDP1wZZ8nH5OpmXLe6LBNI.jpg"
                            alt="product"
                          />
                        </div>

                        <div>
                          <div className="checkout__cards__details__product__info__details">
                            <p className="checkout__cards__details__product__info__details__name">
                              Üzvi salsa
                            </p>
                            <p>
                              <Trash2 className="checkout__cards__details__product__info__details__trash-icon" />
                            </p>
                          </div>
                          <p className="checkout__cards__details__product__info__note">
                            Aşağı səhmlər
                          </p>

                          <div className="checkout__cards__details__product__info__quantity">
                            <div className="checkout__cards__details__product__info__quantity-adjuster">
                              <p className="invoicing__address__payment__product__info__decrement">
                                <MinusOutlined />
                              </p>
                              <p className="checkout__cards__details__product__info__quantity-number">
                                1
                              </p>
                              <p className="checkout__cards__details__product__info__increment">
                                <PlusOutlined />
                              </p>
                            </div>
                            <p className="checkout__cards__details__product__info__total-price">
                              €1.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="checkout__cards__details__product__summary">
                    <div className="checkout__cards__details__product__summary__tax">
                      <p className="checkout__cards__details__product__summary__label">
                        ƏDV
                      </p>
                      <p className="checkout__cards__details__product__summary__tax-amount">
                        €0,05
                      </p>
                    </div>
                    <div className="checkout__cards__details__product__summary__tax">
                      <p className="checkout__cards__details__product__summary__label invoicing__address__payment__product__summary__label-small-device">
                        Cəmi :
                      </p>
                      <p className="checkout__cards__details__product__summary__total-amount">
                        €1.00
                      </p>
                    </div>
                  </div>
                  <div className="checkout__cards__details__product__btns">
                    <Link to={'/delivery-method'}>
                      <button className="checkout__cards__details__product__btns__back">
                        Geri qayıt
                      </button>
                    </Link>
                    <Link to={'№'}>
                      <button className="checkout__cards__details__product__btns__go">
                        Ödəmək
                      </button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;
