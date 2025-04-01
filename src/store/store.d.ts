import { User } from 'core/utils/IUser';
import {ILang} from '../assets/lang/lang';

export interface IState {
    loader: boolean;
    leftMenu: boolean;
    languages: ILanguages[];
    locale: any;
    user: User| any | null;
    isAuthenticated: boolean;
    registerError: string | null;
    isLoggingIn: boolean, 
    loginError: string | null, 
}


export interface ILanguages {
    id: number;
    key: ILang;
    value: string;
}

