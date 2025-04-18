import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IState} from './store';
import {az} from '../assets/lang/az';
import {en} from '../assets/lang/en';
import {ru} from '../assets/lang/ru';
import {environment} from '../core/configs/app.config';
import {ILang} from '../assets/lang/lang';
import jwtDecode from 'jwt-decode';

const initialState: IState = {
  loader: false,
  leftMenu: true,
  languages: [
    {
      id: 1,
      key: 'az',
      value: 'Az'
    }, {
      id: 2,
      key: 'en',
      value: 'En'
    },
    {
      id: 3,
      key: 'ru',
      value: 'Ru'
    }
  ],
  locale: az,
  user: null,
};
export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setLoader: (state: IState, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    toggleLeftMenu: (state: IState) => {
      state.leftMenu = !state.leftMenu;
    },
    setLocale: (state: IState, action: PayloadAction<ILang>) => {
      const lang = {
        az,
        en,
        ru
      };
      state.locale = lang[action.payload];
      localStorage.setItem(`${environment.applicationName}-locale`, action.payload);
    },
    setUser: (state: IState, action) => {
      state.user = jwtDecode(action.payload);
    },
    setLogout: (state) =>{
      localStorage.removeItem('token');
      state.user = null;
      window.location.reload();
    }
  },
});
export const {setLoader, toggleLeftMenu, setLocale, setUser, setLogout} = rootSlice.actions;
export default rootSlice.reducer;