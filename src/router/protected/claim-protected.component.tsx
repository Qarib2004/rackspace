import {Navigate} from 'react-router-dom';
import {Routes} from '../routes';
import {IAuthProtectedRouteProps} from './auth-protected.component.d';
import { useSelector, useStore } from 'react-redux';

const ClaimProtectedComponent = ({children}: IAuthProtectedRouteProps) => {
    const user = useSelector((state: any) => state.user); 

    if (!user) {
        return <Navigate to={Routes.auth} replace />;
    }

    return children;
};

