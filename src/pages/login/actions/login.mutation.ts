import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from './login.service';
import { setToken } from 'core/helpers/get-token'; 
import { setUser } from 'store/store.reducer'; 
import { User } from 'core/utils/IUser';
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
    status: string;
    token: string;
    data: {
      user:User | any; 
    };
  }

export const loginUser = createAsyncThunk<
{ token: string; user: any },
  LoginCredentials,
  { rejectValue: string }
>(
  'users/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginService(credentials);
      console.log('Login response:', response); 
      setToken(response.token);
      
      dispatch(setUser(response.user));
      
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred during login');
    }
  }
);