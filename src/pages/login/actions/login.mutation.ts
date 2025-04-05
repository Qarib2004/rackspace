import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from './login.service';
import { setToken } from 'core/helpers/get-token';
import { User } from 'core/utils/IUser';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  data: {
    user: User | any;
  };
}

export const loginUser = createAsyncThunk<
  { token: string; user: User },
  LoginCredentials,
  { rejectValue: string }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginService(credentials);
    setToken(response.token, response.user.role);
    return { token: response.token, user: response.user };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred during login');
  }
});



// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { loginService } from './login.service';
// import { setToken } from 'core/helpers/get-token';
// import { setUser } from 'store/store.reducer';
// import { User } from 'core/utils/IUser';
// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface LoginResponse {
//   status: string;
//   token: string;
//   data: {
//     user: User | any;
//   };
// }

// export const loginUser = createAsyncThunk<
//   { token: string; user: User },
//   LoginCredentials,
//   { rejectValue: string }
// >('users/login', async (credentials, { rejectWithValue, dispatch }) => {
//   try {
//     const response = await loginService(credentials);
//     console.log('Login response:', response);

//     const token = response.token;
//     const user = response.user;

//     setToken(token, user.role);
//     dispatch(setUser(user));

//     return { token, user };
//   } catch (error) {
//     if (error instanceof Error) {
//       return rejectWithValue(error.message);
//     }
//     return rejectWithValue('An unknown error occurred during login');
//   }
// });
