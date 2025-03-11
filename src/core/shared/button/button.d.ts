import {ReactElement} from 'react';

export interface IButtonTypes {
    classNamesComponent?: string | '';
    children: ReactElement | string;
    type?: string | null;
    click?: () => void;
    color?: 'lightBlue' | 'blue' |  undefined | 'gray';
    htmlType?: 'button' | 'submit' | 'reset' | undefined;
    width?: number | null;
}
