import {ReactElement} from 'react';

export interface IModalTypes{
    mainContent?: ReactElement | string | null;
    headerContent?: ReactElement | string | null;
    footerContent?: ReactElement | string | null;
    isOpen: boolean;
    handleOk? : function;
    handleCancel? : function;
    width ? : number;
}