import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authSlice from './auth.slice';
import { loginApi } from 'pages/login/actions/login.query';
import { rootSlice } from './root.slice';
import { cardApi } from 'core/shared/home-card/actions/card.query';
import { cardMutationApi } from 'core/shared/home-card/actions/card.mutation';
import productSlice from './product.slice';


const rootReducer = combineReducers({
  root: rootSlice.reducer,
  auth: authSlice,
  product: productSlice,
  [loginApi.reducerPath]: loginApi.reducer, 
  [cardApi.reducerPath]: cardApi.reducer,
  [cardMutationApi.reducerPath]: cardMutationApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const {
  setLoader,
  toggleLeftMenu,
  setLocale,
} = rootSlice.actions;

export default rootReducer;