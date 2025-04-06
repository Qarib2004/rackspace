import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import './login.component.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './actions/login.mutation';
import { useLoginMutation } from './actions/login.query';
import { AppDispatch } from 'store/store.config';
import { RootState } from 'store/store.reducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();
  const auth = useSelector((state: RootState) => state.auth ?? {});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (auth?.loginError) {
      setError(auth.loginError);
      toast.error(auth.loginError, {
        toastId: 'login-error',
        position: 'bottom-right',
        theme: 'light'
      });
    }
  }, [auth?.loginError]);

  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'An unknown error occurred';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      const msg = 'Please enter both email and password';
      setError(msg);
      toast.error(msg, {
        toastId: 'validation-error',
        position: 'bottom-right',
        theme: 'light'
      });
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password }));
      
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Login successful');
        navigate('/');
      } else {
        const errorMsg = getErrorMessage(result.payload);
        toast.error(errorMsg, {
          toastId: 'api-error',
          position: 'bottom-right',
          theme: 'light'
        });
        setError(errorMsg);
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg, {
        toastId: 'exception-error',
        position: 'bottom-right',
        theme: 'light'
      });
      setError(msg);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

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

          <form className="login__form" onSubmit={handleSubmit}>
            {error && <div className="login__error">{error}</div>}
            
            <div className="login__field">
              <label>
                Email <span>*</span>
              </label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login__field">
              <label>
                Password <span>*</span>
              </label>
              <div className="login__password">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
              <a 
                href="#" 
                className="login__forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </a>
            </div>

            <button 
              type="submit" 
              className="login__submit"
              disabled={isLoading || auth.isLoggingIn}
            >
              {isLoading || auth.isLoggingIn ? 'Logging in...' : 'Log in'}
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
                  type="button"
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