import axios from 'axios';
import { API_URL } from 'core/utils/base-url'; 
import { environment } from 'core/configs/app.config'; 
import { getToken, setToken } from 'core/helpers/get-token'; 
import { LoginCredentials, LoginResponse } from './login.mutation';


export const loginService = async (
  credentials: LoginCredentials
): Promise<{token: string; user: any}> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/users/login`,
      credentials
    );
    console.log('API Response:', response.data);
    setToken(response.data.token);
    console.log('Stored token:', response.data.token);
    
    return {
        token: response.data.token,
        user: response.data.data.user 
      };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 
          'Authentication failed. Please check your credentials.'
        );
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error setting up request: ' + error.message);
      }
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};


export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};


export const logoutService = (): void => {
  localStorage.removeItem(`${environment.applicationName}-token`);
  localStorage.removeItem('token');
  sessionStorage.removeItem('info');
};

