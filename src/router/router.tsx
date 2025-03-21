import { createBrowserRouter } from 'react-router-dom';
import PublicComponent from '../core/layouts/public/public.component';
import { Routes } from './routes';
import AuthProtectedComponent from './protected/auth-protected.component';
import AddDeviceComponent from '../pages/add-device/add-device.component';
import StorageComponent from '../pages/storage/storage.component';
import RoomsComponent from '../pages/rooms/rooms.component';
import HomeComponent from 'pages/home/home.component';
import RegisterComponent from 'pages/register/register.component';
import AuthComponent from 'core/layouts/auth/auth.component';
import LoginComponent from 'pages/login/login.component';

const router = createBrowserRouter([
    {
        element: <AuthProtectedComponent layout="public"><PublicComponent /></AuthProtectedComponent>,

        children: [
            {
                path: Routes.home,
                element: <HomeComponent />,
            },

            {
                path: Routes.storage,
                element: <StorageComponent />,
            },
            {
                path: Routes.addDevice,
                element: <AddDeviceComponent />
            },
            {
                path: Routes.rooms,
                element: <RoomsComponent />
            }
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
