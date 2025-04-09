// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { RegisterService } from 'pages/register/actions/register.service'; 
// import { setLoader } from 'store/store.reducer';
// import { setAuthUser } from 'store/auth.slice'; 
// import { setToken } from 'core/helpers/get-token';
// import { IRegisterRequest, IRegisterResponse } from 'pages/register/actions/register'; 
// import { AppDispatch } from 'store/store.config';
// import { loginService } from 'pages/login/actions/login.service';
// import { User } from 'core/utils/IUser'

// ;
// export interface LoginCredentials {
//     email: string;
//     password: string;
//   }
  
//   export const loginUser = createAsyncThunk<
//     { token: string; user: User },
//     LoginCredentials,
//     { rejectValue: string }
//   >('auth/loginUser', async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await loginService(credentials);
//       setToken(response.token, response.user.role);
//       return { token: response.token, user: response.user };
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue('An unknown error occurred during login');
//     }
//   });

// export const registerUser = createAsyncThunk<
//   IRegisterResponse,
//   IRegisterRequest,
//   { dispatch: AppDispatch }
// >('users/signup', async (registerData, { dispatch }) => {
//   try {
//     dispatch(setLoader(true));
//     const response = await RegisterService.register(registerData);

//     if (response && response.token) {
//       setToken(response.token, response.data.user.role);
//       dispatch(setAuthUser({ user: response.data.user, token: response.token }));    }

//     return response;
//   } catch (error) {
//     console.log(error, 'failed registration');
//     throw error;
//   } finally {
//     dispatch(setLoader(false));
//   }
// });
