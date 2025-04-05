import { User } from 'core/utils/IUser';
import {ILang} from '../assets/lang/lang';

export interface IState {
    loader: boolean;
    leftMenu: boolean;
    languages: ILanguages[];
    locale: any;
}


export interface ILanguages {
    id: number;
    key: ILang;
    value: string;
}

export interface RootAppState {
    root: IState;
    auth: {
      isAuthenticated: boolean;
      isRegistering: boolean;
      isLoggingIn: boolean;
      registerError: string | null;
      loginError: string | null;
      user: User | null;
      token: string | null;
    };
  }