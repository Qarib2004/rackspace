import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from './store';
import { az } from '../assets/lang/az';
import { en } from '../assets/lang/en';
import { ru } from '../assets/lang/ru';
import { environment } from '../core/configs/app.config';
import { ILang } from '../assets/lang/lang';
import authSlice from './auth.slice';
import { loginApi } from 'pages/login/actions/login.query';

const initialState: IState = {
  loader: false,
  leftMenu: true,
  languages: [
    { id: 1, key: 'az', value: 'Az' },
    { id: 2, key: 'en', value: 'En' },
    { id: 3, key: 'ru', value: 'Ru' },
  ],
  locale: az
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    toggleLeftMenu: (state) => {
      state.leftMenu = !state.leftMenu;
    },
    setLocale: (state, action: PayloadAction<ILang>) => {
      const langMap = { az, en, ru };
      state.locale = langMap[action.payload];
      localStorage.setItem(
        `${environment.applicationName}-locale`,
        action.payload
      );
    },
   
  }
});

const rootReducer = combineReducers({
  root: rootSlice.reducer,
  auth: authSlice,
  [loginApi.reducerPath]: loginApi.reducer, 
});

export type RootState = ReturnType<typeof rootReducer>;

export const {
  setLoader,
  toggleLeftMenu,
  setLocale,
} = rootSlice.actions;

export default rootReducer;
