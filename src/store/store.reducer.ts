import {combineReducers, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IState} from './store';
import {az} from '../assets/lang/az';
import {en} from '../assets/lang/en';
import {ru} from '../assets/lang/ru';
import {environment} from '../core/configs/app.config';
import {ILang} from '../assets/lang/lang';
import { registerUser } from 'pages/register/actions/register.mutation';
import authSlice from './auth.slice';


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
    isAuthenticated: false,
    registerError: null
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
        setUser: (state: IState, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        
        logout: (state: IState) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        clearErrors: (state: IState) => {
            state.registerError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loader = true;
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loader = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loader = false;
                state.registerError = action.error.message || 'Registration failed';
            });
    }
});

const rootReducer = combineReducers({
    root: rootSlice.reducer,  
    auth: authSlice,  
  });

  export type RootState = ReturnType<typeof rootReducer>;

export const {setLoader, toggleLeftMenu, setLocale, setUser,} = rootSlice.actions;

export default rootSlice.reducer;
