import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store.reducer';
import { useSelector } from 'react-redux';
import { RootState } from './store.reducer';
import { loginApi } from '../pages/login/actions/login.query';

export const store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(loginApi.middleware),
});

export const useStore = <T extends keyof RootState>(key: T) => {
    const data = useSelector((state: RootState) => state[key]);
    return data;
};

export type AppDispatch = typeof store.dispatch;