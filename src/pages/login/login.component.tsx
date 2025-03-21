import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import './login.component.scss';
import { Link } from 'react-router-dom';

const images = [
  'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80'
];

function LoginComponent() {
  const [currentImage, setCurrentImage] = useState(0);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__left">
          <Link to="/" className="login__back">
            <ArrowLeft />
            Back
          </Link>

          <div className="login__header">
            <h1>Welcome to</h1>
            <h2>Agromarket</h2>
          </div>

          <form className="login__form">
            <div className="login__field">
              <label>
                User <span>*</span>
              </label>
              <input type="text" required />
            </div>

            <div className="login__field">
              <label>
                Password <span>*</span>
              </label>
              <div className="login__password">
                <input type={showPassword ? 'text' : 'password'} required />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login__toggle-password"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="login__options">
              <label className="login__stay-logged">
                <input
                  type="checkbox"
                  checked={stayLoggedIn}
                  onChange={() => setStayLoggedIn(!stayLoggedIn)}
                />
                <span>Stay logged in</span>
              </label>
              <a href="#" className="login__forgot-password">
                Forgot your password?
              </a>
            </div>

            <button type="submit" className="login__submit">
              Log in
            </button>

            <p className="login__signup">
              Don't have an account at Agromarket yet?{' '}
              <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>

        <div className="login__right">
          <div className="login__slider">
            <img src={images[currentImage]} alt="Agriculture" />
            <div className="login__dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`login__dot ${currentImage === index ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="login__footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;