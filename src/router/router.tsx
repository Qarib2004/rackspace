import { createBrowserRouter } from 'react-router-dom';
import PublicComponent from '../core/layouts/public/public.component';
import { Routes } from './routes';
import AuthProtectedComponent from './protected/auth-protected.component';
import HomeComponent from 'pages/home/home.component';
import Store from 'pages/products/store';
import RegisterComponent from 'pages/register/register.component';
import AuthComponent from 'core/layouts/auth/auth.component';
import LoginComponent from 'pages/login/login.component';
import ProfileComponent from 'pages/profile/profile.component';
import PersonalData from 'pages/profile/Profile/PersonalData';
import FavoritesPage from 'pages/wishlist/wishlist.component';
import SidebarBasket from 'pages/basket-sidebar/basketSidebar.component';
import Messages from 'pages/profile/Profile/Messages';
import Addresses from 'pages/profile/Profile/Adresses';
import Orders from 'pages/profile/Profile/Orders';
import DetailsComponent from 'pages/details/details.component';
import HelpComponent from 'pages/help/help.component';
import ProducerDetailsComponent from 'pages/producer-details/producerDetails.component';
import InvoicingAddressComponent from 'pages/checkout/invoicing-address/invoicingAddress.component';
import DeliveryMethodComponent from 'pages/checkout/delivery-method/deliveryMethod.component';
import PaymentComponent from 'pages/checkout/payment/payment.component';
import CheckoutComponent from 'core/layouts/checkout/checkout.component';

const router = createBrowserRouter(
  [
    {
      element: (
        <AuthProtectedComponent layout="public">
          <PublicComponent />
        </AuthProtectedComponent>
      ),
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
            {
              path: Routes.messages,
              element: <Messages />,
            },
            {
              path: Routes.orders,
              element: <Orders />,
            },
            {
              path: Routes.addresses,
              element: <Addresses />,
            },
          ],
        },
        {
          path: Routes.store,
          element: <Store />,
        },
        {
          path: Routes.details,
          element: <DetailsComponent />,
        },
        {
          path: Routes.producer,
          element: <ProducerDetailsComponent />,
        },
        {
          path: Routes.help,
          element: <HelpComponent />,
        },
        {
          path: Routes.wihslist,
          element: <FavoritesPage />,
        },
        {
          path: Routes.basket,
          element: (
            <SidebarBasket
              isOpen={true}
              onClose={() => console.log('Sidebar closed')}
            />
          ),
        },
      ],
    },
    {
      element: (
        <AuthProtectedComponent layout="auth">
          <AuthComponent />
        </AuthProtectedComponent>
      ),
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
    {
      element: (
        <AuthProtectedComponent layout="checkout">
          <CheckoutComponent />
        </AuthProtectedComponent>
      ),
      children: [
        {
          path: Routes.checkout,
          children: [
            {
              path: Routes.invoincingAddress,
              element: <InvoicingAddressComponent />,
            },
            {
              path: Routes.deliveryMethod,
              element: <DeliveryMethodComponent />,
            },
            {
              path: Routes.payment,
              element: <PaymentComponent />,
            },
          ],
        },
      ],
    },
  ],
  { basename: '/' }
);

export default router;