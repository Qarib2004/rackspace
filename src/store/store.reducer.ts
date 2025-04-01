import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from './store';
import { az } from '../assets/lang/az';
import { en } from '../assets/lang/en';
import { ru } from '../assets/lang/ru';
import { environment } from '../core/configs/app.config';
import { ILang } from '../assets/lang/lang';
import { registerUser } from 'pages/register/actions/register.mutation';
import authSlice from './auth.slice';
import { loginUser } from 'pages/login/actions/login.mutation';
import { loginApi } from 'pages/login/actions/login.query';

const initialState: IState = {
  loader: false,
  leftMenu: true,
  languages: [
    { id: 1, key: 'az', value: 'Az' },
    { id: 2, key: 'en', value: 'En' },
    { id: 3, key: 'ru', value: 'Ru' },
  ],
  locale: az,
  user: null,
  isAuthenticated: false,
  registerError: null,
  isLoggingIn: false,
  loginError: null,
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
    setUser: (state, action: PayloadAction<any>) => {
        console.log('Setting user in Redux:', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearErrors: (state) => {
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loader = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loader = false;
        state.registerError = action.error.message || 'Registration failed';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.loginError = (action.payload as string) || 'Login failed';
      });
  },
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
  setUser,
  logout,
  clearErrors,
} = rootSlice.actions;

export default rootReducer;
