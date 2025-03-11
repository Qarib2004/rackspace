import './card.component.scss';
import {ICardTypes} from './card';
import classNames from 'classnames';

const CardComponent = ({classNamesComponent = '', children, color}: ICardTypes) => {

    const styles = classNames({
        ['card']: true,
        [classNamesComponent]: true,
        ['card--grey']: color === 'grey'
    });

    return (
        <div className={styles}>
            {children}
        </div>
    );
};

export default CardComponent;
