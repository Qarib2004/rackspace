import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from 'pages/register/actions/register.mutation';
import './register.component.scss';
import { IRegisterRequest } from './actions/register';

const images = [
  'https://agromarket.pt/static/media/slide_3.ec520ee601d256b83969.png',
  'https://agromarket.pt/static/media/slide_4.941b47343743e397730a.png',
  'https://agromarket.pt/static/media/slide_1.311e4b2dd832d982f13b.png',
  'https://agromarket.pt/static/media/slide_2.439d2bfadee6d472c0d0.png',
];

const SLIDE_INTERVAL = 5000;

// Azərbaycan şəhərləri siyahısı
const AZERBAIJAN_CITIES = [
  'Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Şirvan', 'Naxçıvan', 
  'Şəki', 'Yevlax', 'Lənkəran', 'Xankəndi', 'Şuşa', 'Ağdam', 
  'Bərdə', 'Cəlilabad', 'Şamaxı', 'Quba', 'Qusar', 'İsmayıllı'
];

function RegisterComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'bildirmək-istəmirəm',
    phoneNumber: '',
    birthDate: '',
    city: '',
    district: ''
  });

  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     toast.success(
  //       <div>
  //         <h3>Qeydiyyat uğurla tamamlandı!</h3>
  //         <p>Təsdiq linki {formData.email} ünvanına göndərildi.</p>
  //       </div>,
  //       {
  //         autoClose: 5000,
  //         closeOnClick: false,
  //         pauseOnHover: true
  //       }
  //     );
  //     setFormData({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //     gender: 'bildirmək-istəmirəm',
    //     phoneNumber: '',
    //     birthDate: '',
    //     city: '',
    //     district: ''
    //   });
    // }

  //   if (registerError) {
  //     toast.error(registerError, {
  //       autoClose: 4000
  //     });
  //   }
  // }, [isAuthenticated, registerError, formData.email]);

  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'city' && value.length > 1) {
      const filteredCities = AZERBAIJAN_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filteredCities);
      setShowCitySuggestions(filteredCities.length > 0);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.startsWith('994')) {
      formatted = `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
    } else if (cleaned.length > 0) {
      formatted = `+994 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;
    }

    setFormData(prev => ({
      ...prev,
      phoneNumber: formatted.trim()
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warn('Şifrələr eyni deyil!', {
        autoClose: 3000
      });
      return;
    }

    // if (passwordStrength < 3) {
    //   toast.warn('Şifrə kifayət qədər güclü deyil!', {
    //     autoClose: 3000
    //   });
    //   return;
    // }

    // const userData: IRegisterRequest = {
    //   firstname: formData.firstName,
    //   lastname: formData.lastName,
    //   email: formData.email,
    //   password: formData.password,
    //   passwordConfirm: formData.confirmPassword,
    //   gender: formData.gender,
    //   phoneNumber: formData.phoneNumber,
    //   birthDate: formData.birthDate ? new Date(formData.birthDate) : undefined,
    //   city: formData.city,
    //   district: formData.district,
    //   active: true,
    //   role: 'user'
    // };

    // dispatch(registerUser(userData));
  };

  const selectCity = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
    setShowCitySuggestions(false);
  };

  return (
    <div className="register">
      <ToastContainer
        position="top-center"
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
        rtl={false}
      />

      <div className="register__content">
        <div className="register__left">
          <Link to="/" className="register__back">
            <ArrowLeft size={20} /> Geri qayıt
          </Link>

          <div className="register__header">
            <h1>Hesab yaradın</h1>
            <h2>LankMark</h2>
          </div>

          <form className="register__form" onSubmit={handleSubmit}>
            <div className="register__row">
              <div className="register__field">
                <label>
                  Ad <span>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="register__field">
                <label>
                  Soyad <span>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="register__field">
              <label>
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register__field">
              <label>
                Cinsiyyət
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="register__select"
              >
                <option value="prefer-not-to-say">Bildirmək istəmirəm</option>
                <option value="male">Kişi</option>
                <option value="female">Qadın</option>
                <option value="other">Digər</option>
              </select>
            </div>

            <div className="register__field">
              <label>
                Telefon nömrəsi
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+994 XX XXX XX XX"
                pattern="^\+994\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$"
              />
            </div>

            <div className="register__field">
              <label>
                Doğum tarixi
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="register__row">
              <div className="register__field">
                <label>
                  Şəhər
                </label>
                <div className="register__city-input">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onFocus={() => setShowCitySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                  />
                  {showCitySuggestions && (
                    <div className="register__city-suggestions">
                      {citySuggestions.map((city, index) => (
                        <div
                          key={index}
                          className="register__city-suggestion"
                          onClick={() => selectCity(city)}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="register__field">
                <label>
                  Rayon
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="register__field">
              <label>
                Şifrə <span>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
              <div className="register__password-strength">
                <div className={`register__strength-bar ${passwordStrength > 0 ? 'active' : ''}`}></div>
                <div className={`register__strength-bar ${passwordStrength > 1 ? 'active' : ''}`}></div>
                <div className={`register__strength-bar ${passwordStrength > 2 ? 'active' : ''}`}></div>
                <div className={`register__strength-bar ${passwordStrength > 3 ? 'active' : ''}`}></div>
              </div>
            </div>

            <div className="register__field">
              <label>
                Şifrə təkrarı <span>*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            {/*<button*/}
            {/*  type="submit"*/}
            {/*  className="register__submit"*/}
            {/*  disabled={isRegistering}*/}
            {/*>*/}
            {/*  {isRegistering ? 'Hesab yaradılır...' : 'Hesab yarat'}*/}
            {/*</button>*/}
          </form>
        </div>

        <div className="register__right">
          <div className="register__slider">
            <img src={images[currentImage]} alt="Kənd təsərrüfatı" />
            <div className="register__dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`register__dot ${
                    currentImage === index ? 'active' : ''
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