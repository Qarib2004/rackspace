import {IAuthProtectedRouteProps} from './auth-protected.component.d';

const AuthProtectedComponent = ({children, layout = 'public'}: IAuthProtectedRouteProps) => {
    switch (layout) {
        case 'public':
            return children;
        default:
            return children;
    }
};

export default AuthProtectedComponent;
