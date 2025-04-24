import {Outlet} from 'react-router-dom';
import HeaderComponent from '../public/components/header/header.component';

const CheckoutComponent = () => {
    return (
        <div className={'checkout'}>
            <div>
                <HeaderComponent/>
                <Outlet/>
                {/* <Footer/> */}
            </div>
        </div>
    );
};


export default CheckoutComponent;

