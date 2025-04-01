import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Routes } from '../routes';
import { IAuthProtectedRouteProps } from './auth-protected';
import { getToken } from '../../core/helpers/get-token';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { setUser } from 'store/store.reducer';

const AuthProtectedComponent = ({ children, layout = 'public' }: IAuthProtectedRouteProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.root.user); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = getToken();
            if (storedToken && !user?.token) {
                dispatch(setUser({ token: storedToken }));
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [dispatch, user?.token]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (layout === 'auth' && user?.token) {
        return <Navigate to={Routes.home} replace />;
    }

    if (layout !== 'auth' && !user?.token) {
        return <Navigate to={Routes.login} replace />;
    }

    return children;
};

export default AuthProtectedComponent;