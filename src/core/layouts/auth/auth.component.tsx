import {Outlet} from 'react-router-dom';

const AuthComponent = () => {
    return (
            <div className={'auth'}>
               <Outlet/>
            </div>
    );
};

export default AuthComponent;
