import {environment} from '../configs/app.config';

export const getToken = (): string | null => {
    const token = localStorage.getItem('token') || localStorage.getItem(`${environment.applicationName}-token`);
    console.log('Retrieved token:', token); 
    return token;
};


export const setToken = (token: string) => {
    const tokenKey = localStorage.getItem('token') ? 'token' : `${environment.applicationName}-token`;
    localStorage.setItem(tokenKey, token);
    console.log('Token set:', token, 'using key:', tokenKey);
};


export const getPosition = (): string | null => {
    return sessionStorage.getItem('info');
};

export const getBaseUrl = (): string | null => {
    return localStorage.getItem('sima-access-base-url');
};