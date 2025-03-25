import { createBrowserRouter } from 'react-router-dom';
import PublicComponent from '../core/layouts/public/public.component';
import { Routes } from './routes';
import AuthProtectedComponent from './protected/auth-protected.component';
import HomeComponent from 'pages/home/home.component';
import RegisterComponent from 'pages/register/register.component';
import AuthComponent from 'core/layouts/auth/auth.component';
import LoginComponent from 'pages/login/login.component';
import ProfileComponent from 'pages/profile/profile.component';
import PersonalData from 'pages/profile/Profile/PersonalData';

const router = createBrowserRouter([
    {
        element: <AuthProtectedComponent layout="public"><PublicComponent /></AuthProtectedComponent>,
        children: [
            {
                path: Routes.home,
                element: <HomeComponent />,
            },
            {
                path: Routes.profile,
                element: <ProfileComponent />,
                children: [
                    {
                        path: Routes.general,
                        element: <PersonalData />,
                    },
                ],
            },
        ],
    },
    {
        element: <AuthProtectedComponent layout="auth"><AuthComponent /></AuthProtectedComponent>,
        children: [
            {
                path: Routes.register,
                element: <RegisterComponent />,
            },
            {
                path: Routes.login,
                element: <LoginComponent />,
            },

        ],
    },


], { basename: '/', });

export default router;
