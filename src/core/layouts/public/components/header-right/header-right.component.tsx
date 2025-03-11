import avatar from 'assets/images/statics/avatar.png';
import './header-right.component.scss';
import ButtonComponent from '../../../../shared/button/button.component';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const HeaderRightComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    return (
        <div className={'header-right'}>
            <ul className={'header-right__items'}>
                {
                    location.pathname !== '/' && (
                        <>
                            <li><ButtonComponent

                                classNamesComponent={'add-device-form--button table-modal-footer--button_left'}>Soraqçalar
                            </ButtonComponent>
                            </li>
                            <li><ButtonComponent
                                click={() => navigate(`/data-centers/${id}/storage`)}

                                classNamesComponent={'add-device-form--button table-modal-footer--button_left'}>Anbar
                            </ButtonComponent>
                            </li>
                            <li><ButtonComponent

                                classNamesComponent={'add-device-form--button table-modal-footer--button_left'}>Hesabatlar
                            </ButtonComponent>
                            </li>
                        </>
                    )
                }
                <li>
                    <span className={'header-right__name'}>Zakir Rəsulov</span>
                    <span className={'header-right__position'}>Vəzifəsi</span>
                </li>
                <li>
                    <img src={avatar} alt="" className={'header-right__avatar'}/>
                </li>
            </ul>
        </div>


    );
};

export default HeaderRightComponent;
