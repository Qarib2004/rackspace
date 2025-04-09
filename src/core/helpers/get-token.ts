import {environment} from '../configs/app.config';

export const getToken = (): string | null => {
    const token  = localStorage.getItem('token');
    return token;
};


export const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  


export const getPosition = (): string | null => {
    return sessionStorage.getItem('info');
};
