import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import { rootReducer } from './root.slice';
import { loginApi } from 'pages/login/actions/login.query';

const combinedReducer = combineReducers({
  root: rootReducer,
  auth: authReducer,
  [loginApi.reducerPath]: loginApi.reducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export { setLoader, toggleLeftMenu, setLocale } from './root.slice';

export default combinedReducer;
