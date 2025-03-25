import {Outlet} from 'react-router-dom';
import HeaderComponent from './components/header/header.component';
import Footer from './components/footer/footer.component';

const PublicComponent = () => {
    return (
        <div className={'public'}>
            <div>
                <HeaderComponent/>
                <Outlet/>
                <Footer/>
            </div>
        </div>
    );
};


export default PublicComponent;

