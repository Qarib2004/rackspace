import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, HelpCircle, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { registerUser } from 'pages/register/actions/register.mutation';
import { RootState } from 'store/store.reducer';
import { AppDispatch } from 'store/store.config';
import './register.component.scss';
import { IRegisterRequest } from './actions/register';

const images = [
  'https://agromarket.pt/static/media/slide_3.ec520ee601d256b83969.png',
  'https://agromarket.pt/static/media/slide_4.941b47343743e397730a.png',
  'https://agromarket.pt/static/media/slide_1.311e4b2dd832d982f13b.png',
  'https://agromarket.pt/static/media/slide_2.439d2bfadee6d472c0d0.png',
];

const SLIDE_INTERVAL = 5000;

function RegisterComponent() {
  const [currentImage, setCurrentImage] = useState(0);
  const [accountType, setAccountType] = useState<'customer' | 'producer'>(
    'customer'
  );

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const { isRegistering, user, registerError } = useSelector((state: RootState) => state.auth);
    const { loader } = useSelector((state: RootState) => state.root);

useEffect(() => {
  if (user) {
    console.log('User registered:', user);
  }
  if (registerError) {
    console.log('Registration error:', registerError);
  }
}, [user, registerError]);


  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: IRegisterRequest = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
      active: true,
      role: 'user',
    };

    dispatch(registerUser(userData)); 
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="register">
      <div className="register__content">
        <div className="register__left">
          <Link to="/" className="register__back">
            <ArrowLeft size={20} /> Back
          </Link>

          <div className="register__header">
            <h1>Create an account</h1>
            <h2>Agromarket</h2>
          </div>

          <div className="register__type">
            <label
              className={`register__type-option ${
                accountType === 'customer' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="accountType"
                checked={accountType === 'customer'}
                onChange={() => setAccountType('customer')}
              />
              <span>Customer</span>
            </label>
            <label
              className={`register__type-option ${
                accountType === 'producer' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="accountType"
                checked={accountType === 'producer'}
                onChange={() => setAccountType('producer')}
              />
              <span>Customer and Producer</span>
            </label>
            <HelpCircle size={20} className="register__help" />
          </div>

          <div className="register__profile">
            <p>Add profile picture</p>
            <div className="register__avatar">
              <Camera size={32} />
              <span>Click to change</span>
            </div>
          </div>

          <form className="register__form" onSubmit={handleSubmit}>
            <div className="register__row">
              <div className="register__field">
                <label>
                  First name <span>*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="register__field">
                <label>
                  Last name <span>*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="register__field">
              <label>
                Password <span>*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="register__field">
              <label>
                Confirm Password <span>*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="register__submit"
              disabled={loader}
            >
              {loader ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {registerError && (
            <div className="register__error">{registerError}</div>
          )}
        </div>

        <div className="register__right">
          <div className="register__slider">
            <img src={images[currentImage]} alt="Agriculture" />
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
