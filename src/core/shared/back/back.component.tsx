import './back.component.scss';
import {ShevronLeft} from '../../../assets/images/icons/shevron';
import ButtonComponent from '../button/button.component';
import {useNavigate} from 'react-router-dom';


const BackComponent = () => {

    let navigate = useNavigate();

    return (
        <>
            <div className="back">
                <ButtonComponent classNamesComponent={'back--button'}
                                 click={() => {
                                     navigate(-1);
                                 }}>
                    <ShevronLeft/>
                </ButtonComponent>
                <p className={'back--text'}>Geri</p>
            </div>
        </>
    );
};

export default BackComponent;
