import {Outlet} from 'react-router-dom';
import HeaderComponent from './components/header/header.component';

const PublicComponent = () => {
    return (
        <div className={'public'}>
            <div>
                <HeaderComponent/>
                <Outlet/>
            </div>
        </div>
    );
};


export default PublicComponent;

