import {ReactElement} from 'react';

export interface ICardTypes {
    classNamesComponent?: string | '';
    children:ReactElement | ReactElement[],
    color?:'grey',
}
