import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './store.reducer';
import {IState} from './store';
import {useSelector} from 'react-redux';
import { RootState } from './store.reducer';


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const useStore = <T extends keyof RootState>(key: T) => {
    const data = useSelector((state: RootState) => state[key]);
    return data;
  };

  export type AppDispatch = typeof store.dispatch;