import {environment} from '../configs/app.config';

export const getToken = (): string | null => {
    // return localStorage.getItem(`${environment.applicationName}-token`);
    return localStorage.getItem('token');
};

export const setToken = (token: string) => {
    localStorage.setItem(`${environment.applicationName}-token`, token);
};

export const getPosition = (): string | null => {
    return sessionStorage.getItem('info');
};

export const getBaseUrl = (): string | null => {
    return localStorage.getItem('sima-access-base-url');
};