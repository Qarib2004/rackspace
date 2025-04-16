import { Col, Dropdown, Menu, Row } from 'antd';
import './invoicingAddress.component.scss';
import { Dot, EllipsisVertical, Minus, Plus, Trash2 } from 'lucide-react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const InvoicingAddressComponent = () => {
  const [open, setOpen] = useState<boolean>(true);
  const menu = (
    <Menu>
      <Menu.Item style={{ fontWeight: 'bold' }} key="1">
        Redaktə et
      </Menu.Item>
      <Menu.Item style={{ fontWeight: 'bold' }} key="2">
        Ünvanlar
      </Menu.Item>
      <Menu.Item
        className="menu-item"
        style={{ color: '#4b7d30', fontWeight: 'bold' }}
        key="3"
      >
        Yeni ünvan yaradın
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="invoicing">
        <div className="invoicing__border">
          <div className="invoicing__shipping-info">
            <div className="invoicing__shipping-info__box">
              <p className="invoicing__shipping-info__box__number-bg">1</p>
              <p className="invoicing__shipping-info__box__name-bold">
                faktura ünvanı
              </p>
              <span className="invoicing__shipping-info__box__circle invoicing__shipping-info__box__circle-color">
                <Dot />
              </span>
            </div>
            <div></div>
            <span className="invoicing__shipping-info__line"></span>
            <div className="invoicing__shipping-info__box">
              <p className="invoicing__shipping-info__box__number">2</p>
              <p className="invoicing__shipping-info__box__name">
                çatdırılma üsulu
              </p>
              <span className="invoicing__shipping-info__box__circle"></span>
            </div>
            <span className="invoicing__shipping-info__line"></span>
            <div className="invoicing__shipping-info__box">
              <p className="invoicing__shipping-info__box__number">3</p>
              <p className="invoicing__shipping-info__box__name">ödəniş</p>
              <span className="invoicing__shipping-info__box__circle"></span>
            </div>
          </div>
        </div>
        <div className="invoicing__address">
          <div className="container">
            <Row>
              <Col xs={24} sm={24} md={24} lg={14} xl={15}>
                <div className="invoicing__address__details">
                  <div className="invoicing__address__details__heading-box">
                    <p className="invoicing__address__details__heading">
                      Fakturaların göndərilməsi üçün məlumatlar
                    </p>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <p className="invoicing__address__details__heading-icon">
                        <EllipsisVertical />
                      </p>
                    </Dropdown>
                  </div>
                  <div className="invoicing__address__details__box">
                    <div>
                      <div className="invoicing__address__details__box__inner-box">
                        <p className="invoicing__address__details__box__inner-box__label">
                          ad
                        </p>
                        <p className="invoicing__address__details__box__inner-box__value">
                          Nurlan
                        </p>
                      </div>
                      <div className="invoicing__address__details__box__inner-box">
                        <p className="invoicing__address__details__box__inner-box__label">
                          ölkə
                        </p>
                        <p className="invoicing__address__details__box__inner-box__value">
                          Portuqaliya
                        </p>
                      </div>
                      <div className="invoicing__address__details__box__inner-box">
                        <p className="invoicing__address__details__box__inner-box__label">
                          poçt kodu
                        </p>
                        <p className="invoicing__address__details__box__inner-box__value">
                          1000-205
                        </p>
                      </div>
                      <div className="invoicing__address__details__box__inner-box">
                        <p className="invoicing__address__details__box__inner-box__label">
                          Telefon
                        </p>
                        <p className="invoicing__address__details__box__inner-box__value">
                          0554960633
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="invoicing__address__details__box__inner-box">
                        <p className="invoicing__address__details__box__inner-box__label">
                          Məişət
                        </p>
                        <p className="invoicing__address__details__box__inner-box__value">
                          Sumqayıt
                        </p>
                      </div>
                      <div className="invoicing__address__details__box__inner-box">
                        <p className="invoicing__address__details__box__inner-box__label">
                          Region
                        </p>
                        <p className="invoicing__address__details__box__inner-box__value">
                          Materik Portuqaliya
                        </p>
                      </div>
                      <div className="invoicing__address__details__box__inner-box">
                        <p className="invoicing__address__details__box__inner-box__label">
                          Məkan
                        </p>
                        <p className="invoicing__address__details__box__inner-box__value">
                          dnsadas
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="invoicing__address__details__bottom">
                    <p className="invoicing__address__details__bottom__edit-info">
                      Redaktə et
                    </p>
                    <p className="invoicing__address__details__bottom__edit-info">
                      Ünvanlar
                    </p>
                    <p className="invoicing__address__details__bottom__edit-info">
                      Yeni ünvan yaradın
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={10} xl={9}>
                <div className="invoicing__address__payment">
                  <div className="invoicing__address__payment__box">
                    <p className="invoicing__address__payment__box__sum">
                      Xülasə
                    </p>
                    {open ? (
                      <p onClick={() => setOpen(false)}>
                        <Plus className="invoicing__address__payment__box__icon" />
                      </p>
                    ) : (
                      <p onClick={() => setOpen(true)}>
                        <Minus className="invoicing__address__payment__box__icon" />
                      </p>
                    )}
                  </div>

                  <p className="invoicing__address__payment__products">
                    Məhsullar{' '}
                    <span className="invoicing__address__payment__number">
                      (2)
                    </span>
                  </p>

                  <div
                    className={`invoicing__address__payment__product ${
                      open ? 'open' : ''
                    }`}
                  >
                    <div className="invoicing__address__payment__product__box">
                      <p className="invoicing__address__payment__product__producer">
                        Maria Jardim
                      </p>

                      <div className="invoicing__address__payment__product__info">
                        <div className="invoicing__address__payment__product__info__img-box">
                          <img
                            className="invoicing__address__payment__product__info__img-box__img"
                            src="https://api.agromarket.pt/public_images/producer/notices/cnDpkdergVbO0W57qaoDP1wZZ8nH5OpmXLe6LBNI.jpg"
                            alt="product"
                          />
                        </div>

                        <div>
                          <div className="invoicing__address__payment__product__info__details">
                            <p className="invoicing__address__payment__product__info__details__name">
                              Üzvi salsa
                            </p>
                            <p>
                              <Trash2 className="invoicing__address__payment__product__info__details__trash-icon" />
                            </p>
                          </div>
                          <p className="invoicing__address__payment__product__info__note">
                            Aşağı səhmlər
                          </p>

                          <div className="invoicing__address__payment__product__info__quantity">
                            <div className="invoicing__address__payment__product__info__quantity-adjuster">
                              <p className="invoicing__address__payment__product__info__decrement">
                                <MinusOutlined />
                              </p>
                              <p className="invoicing__address__payment__product__info__quantity-number">
                                1
                              </p>
                              <p className="invoicing__address__payment__product__info__increment">
                                <PlusOutlined />
                              </p>
                            </div>
                            <p className="invoicing__address__payment__product__info__total-price">
                              €1.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="invoicing__address__payment__product__box">
                      <p className="invoicing__address__payment__product__producer">
                        Maria Jardim
                      </p>

                      <div className="invoicing__address__payment__product__info">
                        <div className="invoicing__address__payment__product__info__img-box">
                          <img
                            className="invoicing__address__payment__product__info__img-box__img"
                            src="https://api.agromarket.pt/public_images/producer/notices/cnDpkdergVbO0W57qaoDP1wZZ8nH5OpmXLe6LBNI.jpg"
                            alt="product"
                          />
                        </div>

                        <div>
                          <div className="invoicing__address__payment__product__info__details">
                            <p className="invoicing__address__payment__product__info__details__name">
                              Üzvi salsa
                            </p>
                            <p>
                              <Trash2 className="invoicing__address__payment__product__info__details__trash-icon" />
                            </p>
                          </div>
                          <p className="invoicing__address__payment__product__info__note">
                            Aşağı səhmlər
                          </p>

                          <div className="invoicing__address__payment__product__info__quantity">
                            <div className="invoicing__address__payment__product__info__quantity-adjuster">
                              <p className="invoicing__address__payment__product__info__decrement">
                                <MinusOutlined />
                              </p>
                              <p className="invoicing__address__payment__product__info__quantity-number">
                                1
                              </p>
                              <p className="invoicing__address__payment__product__info__increment">
                                <PlusOutlined />
                              </p>
                            </div>
                            <p className="invoicing__address__payment__product__info__total-price">
                              €1.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="invoicing__address__payment__product__summary">
                    <div className="invoicing__address__payment__product__summary__tax">
                      <p className="invoicing__address__payment__product__summary__label">
                        ƏDV
                      </p>
                      <p className="invoicing__address__payment__product__summary__tax-amount">
                        €0,05
                      </p>
                    </div>
                    <div className="invoicing__address__payment__product__summary__tax">
                      <p className="invoicing__address__payment__product__summary__label invoicing__address__payment__product__summary__label-small-device">
                        Cəmi :
                      </p>
                      <p className="invoicing__address__payment__product__summary__total-amount">
                        €1.00
                      </p>
                    </div>
                  </div>
                  <div className="invoicing__address__payment__product__btns">
                    <Link to={'/'}>
                      <button className="invoicing__address__payment__product__btns__back">
                        Alış-verişə qayıt
                      </button>
                    </Link>
                    <Link to={'/delivery-method'}>
                      <button className="invoicing__address__payment__product__btns__go">
                        İrəli
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

export default InvoicingAddressComponent;
