import './button.component.scss';
import {IButtonTypes} from './button';
import {Button} from 'antd';
import classNames from 'classnames';

const ButtonComponent = ({
                             classNamesComponent = '',
                             children,
                             click,
                             color,
                             htmlType = 'button',
                             width
                         }: IButtonTypes) => {

    const styles = classNames({
        'button': true,
        [classNamesComponent]: classNamesComponent,
        ['button--blue']: color === 'blue',
        ['button--lightBlue']: color === 'lightBlue',
        ['button--gray']: color === 'gray',
        ['button--transparent']: !color,
    });


    return (
        <Button
            style={width ? {width: `${width}px`} : {}}
            htmlType={htmlType ? htmlType : 'button'}
            className={styles}
            onClick={() => click ? click() : undefined}>{children}</Button>
    );
};

export default ButtonComponent;
