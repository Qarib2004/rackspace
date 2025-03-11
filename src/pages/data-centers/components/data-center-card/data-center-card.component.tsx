import {IDataCenterCardProps} from './data-center-card';
import ButtonComponent from '../../../../core/shared/button/button.component';
import {ArrowRight} from '../../../../assets/images/icons/arrows';
import './data-center-card.component.scss';
import classNames from 'classnames';
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {goTo} from '../../../../router/routes';

function DataCenterCardComponent({name, description, img, disabled, id}: IDataCenterCardProps) {
    const navigate = useNavigate();
    const classesCard = classNames({
        'data-center-card': true,
        'data-center-card--disabled': disabled
    });

    const onClick = useCallback(() => {
           if (!disabled) navigate(goTo('data-centers', id));
    }, [disabled, id, navigate]);

    return (
        <div className={classesCard}>
            <div className={'data-center-card-wrapper'}>
                <div className={'data-center-card__name'}>{name}</div>
                <div className={'data-center-card__location'}>{description}</div>
            </div>
            <div className={'d-flex justify-center'}>
                {
                    !disabled && (
                        <ButtonComponent color={'gray'} classNamesComponent={'data-center-card__btn'} click={onClick}>
                            <>
                                <ArrowRight/>
                                <span className={'wrapper'}>
                        </span>
                            </>
                        </ButtonComponent>
                    )
                }

            </div>
            <img src={img} alt='Data Center Image' className={'img'}/>
        </div>
    );
}

export default DataCenterCardComponent;
