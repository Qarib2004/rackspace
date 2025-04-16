import {
  Check,
  Dot,
  EllipsisVertical,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import './deliveryMethod.component.scss';
import { Col, Dropdown, Menu, Radio, Row } from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DeliveryMethodComponent = () => {
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

  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="delivery">
        <div className="delivery__border">
          <div className="delivery__shipping-info">
            <div className="delivery__shipping-info__box">
              <p>
                {' '}
                <Check className="delivery__shipping-info__box__checked" />
              </p>
              <p className="delivery__shipping-info__box__name-bold">
                faktura ünvanı
              </p>
              <span className="delivery__shipping-info__box__tick">
                <Check />
              </span>
            </div>
            <div></div>
            <span className="delivery__shipping-info__line"></span>
            <div className="delivery__shipping-info__box">
              <p className="delivery__shipping-info__box__number-bg">2</p>
              <p className="delivery__shipping-info__box__name">
                çatdırılma üsulu
              </p>
              <span className="delivery__shipping-info__box__circle delivery__shipping-info__box__circle-color">
                <Dot />
              </span>
            </div>
            <span className="delivery__shipping-info__line"></span>
            <div className="delivery__shipping-info__box">
              <p className="delivery__shipping-info__box__number">3</p>
              <p className="delivery__shipping-info__box__name">ödəniş</p>
              <span className="delivery__shipping-info__box__circle"></span>
            </div>
          </div>
        </div>
        <div className="delivery__method">
          <div className="container">
            <Row>
              <Col xs={24} sm={24} md={24} lg={14} xl={15}>
                <div className="delivery__method__details">
                  <div className="delivery__method__details__heading-box">
                    <p className="delivery__method__details__heading">
                      Göndərmə üsulu
                    </p>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <p className="delivery__method__details__heading-icon">
                        <EllipsisVertical />
                      </p>
                    </Dropdown>
                  </div>
                  <div className="delivery__method__details__box">
                    <div className="delivery__method__details__actions">
                      <p></p>
                      <Radio.Group
                        onChange={onChange}
                        value={value}
                        className="custom-radio-group"
                      >
                        <Radio value={1}>Çatdırılma ünvanı</Radio>
                        <Radio value={2}>Toplama nöqtəsi</Radio>
                      </Radio.Group>

                      <div className="delivery__method__details__actions__btns">
                        <button className="delivery__method__details__actions__btns__delivery-address">
                          Çatdırılma ünvanı
                        </button>
                        <button className="delivery__method__details__actions__btns__collection-point">
                          Toplama nöqtəsi
                        </button>
                      </div>
                    </div>

                    <div className="delivery__method__details__info">
                      <div>
                        <div className="delivery__method__details__box__inner-box">
                          <p className="delivery__method__details__box__inner-box__label">
                            ad
                          </p>
                          <p className="delivery__method__details__box__inner-box__value">
                            Nurlan
                          </p>
                        </div>
                        <div className="delivery__method__details__box__inner-box">
                          <p className="delivery__method__details__box__inner-box__label">
                            ölkə
                          </p>
                          <p className="delivery__method__details__box__inner-box__value">
                            Portuqaliya
                          </p>
                        </div>
                        <div className="delivery__method__details__box__inner-box">
                          <p className="delivery__method__details__box__inner-box__label">
                            poçt kodu
                          </p>
                          <p className="delivery__method__details__box__inner-box__value">
                            1000-205
                          </p>
                        </div>
                        <div className="delivery__method__details__box__inner-box">
                          <p className="invoicing__address__details__box__inner-box__label">
                            Telefon
                          </p>
                          <p className="delivery__method__details__box__inner-box__value">
                            0554960633
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="delivery__method__details__box__inner-box">
                          <p className="delivery__method__details__box__inner-box__label">
                            Məişət
                          </p>
                          <p className="delivery__method__details__box__inner-box__value">
                            Sumqayıt
                          </p>
                        </div>
                        <div className="delivery__method__details__box__inner-box">
                          <p className="delivery__method__details__box__inner-box__label">
                            Region
                          </p>
                          <p className="delivery__method__details__box__inner-box__value">
                            Materik Portuqaliya
                          </p>
                        </div>
                        <div className="delivery__method__details__box__inner-box">
                          <p className="delivery__method__details__box__inner-box__label">
                            Məkan
                          </p>
                          <p className="delivery__method__details__box__inner-box__value">
                            dnsadas
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="delivery__method__details__bottom">
                      <p className="delivery__method__details__bottom__edit-info">
                        Redaktə et
                      </p>
                      <p className="delivery__method__details__bottom__edit-info">
                        Ünvanlar
                      </p>
                      <p className="delivery__method__details__bottom__edit-info">
                        Yeni ünvan yaradın
                      </p>
                    </div>

                    <div className="delivery__method__details__warning">
                      <p className="delivery__method__details__warning__message">
                        <span className="delivery__method__details__warning__icon">
                          <WarningOutlined />
                        </span>{' '}
                        İstehsalçı cari ünvanınıza çatdırmır.{' '}
                        <span style={{ fontWeight: '600' }}>
                          Seçimi dəyişdirin.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={10} xl={9}>
                <div className="delivery__method__payment">
                  <div className="delivery__method__payment__box">
                    <p className="delivery__method__payment__box__sum">
                      Xülasə
                    </p>
                    {open ? (
                      <p onClick={() => setOpen(false)}>
                        <Plus className="delivery__method__payment__box__icon" />
                      </p>
                    ) : (
                      <p onClick={() => setOpen(true)}>
                        <Minus className="delivery__method__payment__box__icon" />
                      </p>
                    )}
                  </div>

                  <p className="delivery__method__payment__products">
                    Məhsullar{' '}
                    <span className="delivery__method__payment__number">
                      (2)
                    </span>
                  </p>

                  <div
                    className={`delivery__method__payment__product ${
                      open ? 'open' : ''
                    }`}
                  >
                    <div className="delivery__method__payment__product__box">
                      <p className="delivery__method__payment__product__producer">
                        Maria Jardim
                      </p>

                      <div className="delivery__method__payment__product__info">
                        <div className="delivery__method__payment__product__info__img-box">
                          <img
                            className="delivery__method__payment__product__info__img-box__img"
                            src="https://api.agromarket.pt/public_images/producer/notices/cnDpkdergVbO0W57qaoDP1wZZ8nH5OpmXLe6LBNI.jpg"
                            alt="product"
                          />
                        </div>

                        <div>
                          <div className="delivery__method__payment__product__info__details">
                            <p className="delivery__method__payment__product__info__details__name">
                              Üzvi salsa
                            </p>
                            <p>
                              <Trash2 className="delivery__method__payment__product__info__details__trash-icon" />
                            </p>
                          </div>
                          <p className="delivery__method__payment__product__info__note">
                            Aşağı səhmlər
                          </p>

                          <div className="delivery__method__payment__product__info__quantity">
                            <div className="delivery__method__payment__product__info__quantity-adjuster">
                              <p className="delivery__method__payment__product__info__decrement">
                                <MinusOutlined />
                              </p>
                              <p className="delivery__method__payment__product__info__quantity-number">
                                1
                              </p>
                              <p className="delivery__method__payment__product__info__increment">
                                <PlusOutlined />
                              </p>
                            </div>
                            <p className="delivery__method__payment__product__info__total-price">
                              €1.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="delivery__method__payment__product__box">
                      <p className="delivery__method__payment__product__producer">
                        Maria Jardim
                      </p>

                      <div className="delivery__method__payment__product__info">
                        <div className="delivery__method__payment__product__info__img-box">
                          <img
                            className="delivery__method__payment__product__info__img-box__img"
                            src="https://api.agromarket.pt/public_images/producer/notices/cnDpkdergVbO0W57qaoDP1wZZ8nH5OpmXLe6LBNI.jpg"
                            alt="product"
                          />
                        </div>

                        <div>
                          <div className="delivery__method__payment__product__info__details">
                            <p className="delivery__method__payment__product__info__details__name">
                              Üzvi salsa
                            </p>
                            <p>
                              <Trash2 className="delivery__method__payment__product__info__details__trash-icon" />
                            </p>
                          </div>
                          <p className="delivery__method__payment__product__info__note">
                            Aşağı səhmlər
                          </p>

                          <div className="delivery__method__payment__product__info__quantity">
                            <div className="delivery__method__payment__product__info__quantity-adjuster">
                              <p className="delivery__method__payment__product__info__decrement">
                                <MinusOutlined />
                              </p>
                              <p className="delivery__method__payment__product__info__quantity-number">
                                1
                              </p>
                              <p className="delivery__method__payment__product__info__increment">
                                <PlusOutlined />
                              </p>
                            </div>
                            <p className="delivery__method__payment__product__info__total-price">
                              €1.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="delivery__method__payment__product__summary">
                    <div className="delivery__method__payment__product__summary__tax">
                      <p className="delivery__method__payment__product__summary__label">
                        ƏDV
                      </p>
                      <p className="delivery__method__payment__product__summary__tax-amount">
                        €0,05
                      </p>
                    </div>
                    <div className="delivery__method__payment__product__summary__tax">
                      <p className="delivery__method__payment__product__summary__label delivery__method__payment__product__summary__label-small-device">
                        Cəmi :
                      </p>
                      <p className="delivery__method__payment__product__summary__total-amount">
                        €1.00
                      </p>
                    </div>
                  </div>
                  <div className="delivery__method__payment__product__btns">
                    <Link to={'/invoicing-address'}>
                      <button className="delivery__method__payment__product__btns__back">
                        Geri qayıt
                      </button>
                    </Link>
                    <Link to={'/payment'}>
                      <button className="delivery__method__payment__product__btns__go">
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

export default DeliveryMethodComponent;
