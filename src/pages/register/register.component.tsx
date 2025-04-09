import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, DatePicker, message, Card, Row, Col } from 'antd';
import './register.component.scss';
import { IRegisterRequest } from './register';
import { useRegisterUser } from './actions/register.mutation';

const { Option } = Select;
const { Password } = Input;

const images = [
  'https://agromarket.pt/static/media/slide_3.ec520ee601d256b83969.png',
  'https://agromarket.pt/static/media/slide_4.941b47343743e397730a.png',
  'https://agromarket.pt/static/media/slide_1.311e4b2dd832d982f13b.png',
  'https://agromarket.pt/static/media/slide_2.439d2bfadee6d472c0d0.png',
];

const SLIDE_INTERVAL = 5000;

const AZERBAIJAN_CITIES = [
  'Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Şirvan', 'Naxçıvan',
  'Şəki', 'Yevlax', 'Lənkəran', 'Xankəndi', 'Şuşa', 'Ağdam',
  'Bərdə', 'Cəlilabad', 'Şamaxı', 'Quba', 'Qusar', 'İsmayıllı'
];

const GENDER_OPTIONS = [
  { value: 'prefer-not-to-say', label: 'Bildirmək istəmirəm' },
  { value: 'male', label: 'Kişi' },
  { value: 'female', label: 'Qadın' },
  { value: 'other', label: 'Digər' }
];

function RegisterComponent() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { mutate: registerUser, isLoading } = useRegisterUser();

  const changeImage = useCallback(() => {
    setCurrentImage((current) => (current + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(changeImage, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [changeImage]);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  const onFinish = (values: IRegisterRequest) => {
    if (values.password !== values.passwordConfirm) {
      message.warning('Şifrələr eyni deyil!');
      return;
    }

    if (passwordStrength < 3) {
      message.warning('Şifrə kifayət qədər güclü deyil!');
      return;
    }

    registerUser(values, {
      onSuccess: () => {
        message.success(
          <div>
            <h3>Qeydiyyat uğurla tamamlandı!</h3>
            <p>Təsdiq linki {values.email} ünvanına göndərildi.</p>
          </div>,
          5000
        );
        form.resetFields();
      },
      onError: (error) => {
        message.error(error.message || 'Qeydiyyat zamanı xəta baş verdi');
      }
    });
  };

  const handleCitySearch = (value: string) => {
    if (value.length > 1) {
      const filteredCities = AZERBAIJAN_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filteredCities);
    } else {
      setCitySuggestions([]);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.startsWith('994')) {
      formatted = `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
    } else if (cleaned.length > 0) {
      formatted = `+994 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;
    }

    return formatted.trim();
  };

  return (
    <div className="register">
      <div className="register__content">
        <div className="register__left">
          <Link to="/" className="register__back">
            <ArrowLeft size={20} /> Geri qayıt
          </Link>

          <div className="register__header">
            <h1>Hesab yaradın</h1>
            <h2>LankMark</h2>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="register__form"
            initialValues={{ gender: 'prefer-not-to-say' }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label="Ad"
                  rules={[{ required: true, message: 'Ad daxil edilməlidir' }]}
                >
                  <Input placeholder="Adınızı daxil edin" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label="Soyad"
                  rules={[{ required: true, message: 'Soyad daxil edilməlidir' }]}
                >
                  <Input placeholder="Soyadınızı daxil edin" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email daxil edilməlidir' },
                { type: 'email', message: 'Düzgün email daxil edin' }
              ]}
            >
              <Input placeholder="nümunə@mail.com" />
            </Form.Item>

            <Form.Item name="gender" label="Cinsiyyət">
              <Select>
                {GENDER_OPTIONS.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Telefon nömrəsi"
              getValueFromEvent={(e) => formatPhoneNumber(e.target.value)}
            >
              <Input placeholder="+994 XX XXX XX XX" maxLength={19} />
            </Form.Item>

            <Form.Item name="birthDate" label="Doğum tarixi">
              <DatePicker
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="city" label="Şəhər">
                  <Select
                    showSearch
                    placeholder="Şəhər seçin"
                    onSearch={handleCitySearch}
                    filterOption={false}
                    notFoundContent="Nəticə tapılmadı"
                  >
                    {citySuggestions.map(city => (
                      <Option key={city} value={city}>{city}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="district" label="Rayon">
                  <Input placeholder="Rayon daxil edin" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="password"
              label="Şifrə"
              rules={[
                { required: true, message: 'Şifrə daxil edilməlidir' },
                { min: 8, message: 'Şifrə ən azı 8 simvol olmalıdır' }
              ]}
            >
              <Password
                placeholder="Şifrə yaradın"
                onChange={handlePasswordChange}
              />
            </Form.Item>

            <div className="register__password-strength">
              <div className={`register__strength-bar ${passwordStrength > 0 ? 'active' : ''}`}></div>
              <div className={`register__strength-bar ${passwordStrength > 1 ? 'active' : ''}`}></div>
              <div className={`register__strength-bar ${passwordStrength > 2 ? 'active' : ''}`}></div>
              <div className={`register__strength-bar ${passwordStrength > 3 ? 'active' : ''}`}></div>
            </div>

            <Form.Item
              name="passwordConfirm"
              label="Şifrə təkrarı"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Şifrə təkrarı daxil edilməlidir' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Şifrələr eyni deyil!'));
                  },
                }),
              ]}
            >
              <Password placeholder="Şifrəni təkrar edin" />
            </Form.Item>

            <Form.Item>
              <Button
                className="register__submit"
                htmlType="submit"
                loading={isLoading}

              >
                {isLoading ? 'Hesab yaradılır...' : 'Hesab yarat'}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="register__right">
          <div className="register__slider">
            <img
              src={images[currentImage]}
              alt="Kənd təsərrüfatı"
              key={currentImage}
            />
            <div className="register__dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`register__dot ${currentImage === index ? 'active' : ''
                    }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
