import './navigation.component.scss';
import ButtonComponent from '../button/button.component';
import {ShevronLeft} from '../../../assets/images/icons/shevron';
import {INavigationTypes} from './navigation';

const NavigationComponent = ({text = ''} : INavigationTypes) => {
    return (
        <div className="navigation">
            <ButtonComponent classNamesComponent={'navigation--button'}><ShevronLeft/></ButtonComponent>
            <p className={'navigation--text'}>{text}</p>
        </div>
    );
};

export default NavigationComponent;