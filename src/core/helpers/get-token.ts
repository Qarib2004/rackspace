import {environment} from '../configs/app.config';

export const getToken = (): string | null => {
    const token = localStorage.getItem('token') || localStorage.getItem(`${environment.applicationName}-token`);
    console.log('Retrieved token:', token); 
    return token;
};


export const setToken = (token: string, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); 
  };
  



export const getPosition = (): string | null => {
    return sessionStorage.getItem('info');
};

export const getBaseUrl = (): string | null => {
    return localStorage.getItem('sima-access-base-url');
};