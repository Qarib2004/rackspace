import './header.component.scss';
import {LogoIcon} from '../../../../../assets/images/icons/logo';
import HeaderRightComponent from '../header-right/header-right.component';
import {Link} from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div className={'header'}>
            <Link to={'/'}>  <LogoIcon/></Link>
            <HeaderRightComponent/>
        </div>
    );
};


export default HeaderComponent;
