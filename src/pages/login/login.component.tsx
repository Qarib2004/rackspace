import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import './login.component.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormProps, Input, notification } from 'antd';
import { ILoginCredentials } from './login';
import { useLoginUser } from './actions/login.mutation';

const { useNotification } = notification;

const images = [
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80'
];

function LoginComponent() {
    const [currentImage, setCurrentImage] = useState(0);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [api, contextHolder] = useNotification();

    const { mutate: loginFn, isLoading, error } = useLoginUser();

    const changeImage = useCallback(() => {
        setCurrentImage((current) => (current + 1) % images.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(changeImage, 5000);
        return () => clearInterval(timer);
    }, [changeImage]);

    useEffect(() => {
        if (error) {
            api.error({
                message: 'Xəta baş verdi',
                description: error.message || 'Daxil etdiyiniz məlumatlar yanlışdır. Zəhmət olmasa yenidən cəhd edin.',
                placement: 'topRight',
                duration: 4.5
            });
        }
    }, [error, api]);

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/forgot-password');
    };

    const onFinish: FormProps<ILoginCredentials>['onFinish'] = (values: any) => {
        loginFn(values, {
            onSuccess: () => {
                api.success({
                    message: 'Daxil oldunuz',
                    description: 'Uğurla hesabınıza daxil oldunuz!',
                    placement: 'topRight',
                    duration: 3
                });
                setTimeout(() => navigate('/'), 2000); 
            },
            onError: (error) => {
                console.error('Giriş hatası:', error);
            }
        });
    };

    useEffect(() => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);


    return (
        <div className="login">
            {contextHolder}
            <div className="login__content">
                <div className="login__left">
                    <Link to="/" className="login__back">
                        <ArrowLeft />
                        Geri
                    </Link>

                    <div className="login__header">
                        <h1>Xoş Gəlmisiniz</h1>
                        <h2>LankMark</h2>
                    </div>

                    <Form
                        className="login__form"
                        form={form}
                        onFinish={onFinish}
                        onError={() => {
                            api.error({
                                message: 'Form xətası',
                                description: 'Zəhmət olmasa bütün məlumatları düzgün daxil edin.',
                                placement: 'topRight',
                                duration: 4
                            });
                        }}
                    >
                        <div className="login__field">
                            <label>
                                Email
                                <span>*</span>
                            </label>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'E-poçt tələb olunur!'
                                    },
                                    {
                                        type: 'email',
                                        message: 'Etibarlı e-poçt ünvanını daxil edin!',
                                    },
                                ]}
                                validateFirst
                            >
                                <Input type="email" disabled={isLoading} />
                            </Form.Item>
                        </div>

                        <div className="login__field">
                            <label>
                                Şifrə <span>*</span>
                            </label>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Şifrə tələb olunur'
                                    },
                                ]}
                                validateFirst
                            >
                                <Input.Password disabled={isLoading} />
                            </Form.Item>
                        </div>

                        <div className="login__options">
                            <label className="login__stay-logged">
                                <input
                                    type="checkbox"
                                    checked={stayLoggedIn}
                                    onChange={() => setStayLoggedIn(!stayLoggedIn)}
                                    disabled={isLoading}
                                />
                                <span>Yaddaşda saxla</span>
                            </label>
                            <a
                                href="#"
                                className="login__forgot-password"
                                onClick={handleForgotPassword}
                            >
                                Şifrənizi unutmusunuz?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="login__submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Yüklənir...' : 'Daxil ol'}
                        </button>

                        <p className="login__signup">
                            LanMark-da hələ də hesabınız yoxdur?{' '}
                            <Link to="/register">Qeydiyyatdan keçin</Link>
                        </p>
                    </Form>
                </div>

                <div className="login__right">
                    <div className="login__slider">
                        <img
                            src={images[currentImage]}
                            alt="Agriculture"
                            key={currentImage}
                        />
                        <div className="login__dots">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`login__dot ${currentImage === index ? 'active' : ''}`}
                                    type="button"
                                    disabled={isLoading}
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
