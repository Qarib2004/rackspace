import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Routes } from '../routes';
import { useEffect, useState } from 'react';
import { getToken } from '../../core/helpers/get-token';
import { RootAppState } from 'store/store.d';

interface AuthProtectedProps {
    children: React.ReactNode;
    layout?: 'public' | 'auth';
}

const AuthProtectedComponent = ({ children, layout = 'public' }: AuthProtectedProps): JSX.Element => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootAppState) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = getToken();
            if (storedToken) {
                // Предположительно, здесь нужно выполнить проверку токена
                // Например, запросить с сервера информацию о пользователе
                // dispatch(fetchUserDetails(storedToken)); // Если у вас есть такая логика
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [dispatch]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (layout === 'auth' && isAuthenticated) {
        return <Navigate to={Routes.home} replace />;
    }

    if (layout !== 'auth' && !isAuthenticated) {
        return <Navigate to={Routes.login} replace />;
    }

    return <>{children}</>;  
};

export default AuthProtectedComponent;



// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Routes } from '../routes';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getToken } from '../../core/helpers/get-token';
// import { RootAppState } from 'store/store.d';

// interface AuthProtectedProps {
//     children: React.ReactNode;
//     layout?: 'public' | 'auth';
//   }

// const AuthProtectedComponent = ({ children, layout = 'public' }:AuthProtectedProps) => {
//     const dispatch = useDispatch();
//     const { isAuthenticated, user } = useSelector((state: RootAppState) => state.auth);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const checkAuth = async () => {
//             const storedToken = getToken();
//             if (storedToken && !user) {
//                 //bilmirem
                
//             }
//             setIsLoading(false);
//         };

//         checkAuth();
//     }, [dispatch, user]);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (layout === 'auth' && isAuthenticated) {
//         return <Navigate to={Routes.home} replace />;
//     }

//     if (layout !== 'auth' && !isAuthenticated) {
//         return <Navigate to={Routes.login} replace />;
//     }

//     return children;
// };

// export default AuthProtectedComponent;

