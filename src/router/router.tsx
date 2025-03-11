import {createBrowserRouter} from 'react-router-dom';
import PublicComponent from '../core/layouts/public/public.component';
import {Routes} from './routes';
import AuthProtectedComponent from './protected/auth-protected.component';
import DataCentersComponent from '../pages/data-centers/data-centers.component';
import AddDeviceComponent from '../pages/add-device/add-device.component';
import StorageComponent from '../pages/storage/storage.component';
import RoomsComponent from '../pages/rooms/rooms.component';
import HomeComponent from 'pages/home/home.component';

const router = createBrowserRouter([
    {
        element: <AuthProtectedComponent layout="public"><PublicComponent/></AuthProtectedComponent>,

        children: [
            {
                path: Routes.home,
                element: <HomeComponent/>,
            },

            {
                path: Routes.storage,
                element: <StorageComponent/>,
            },
            {
                path: Routes.addDevice,
                element: <AddDeviceComponent/>
            },
            {
                path: Routes.rooms,
                element: <RoomsComponent/>
            }
        ],
    },


], {basename: '/',});

export default router;
