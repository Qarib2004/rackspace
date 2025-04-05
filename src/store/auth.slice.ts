import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { registerUser } from 'pages/register/actions/register.mutation';
// import { loginUser } from '../pages/login/actions/login.mutation';
import { loginUser, registerUser } from './actions/auth.actions';

import { logoutService } from '../pages/login/actions/login.service';
import { User } from 'core/utils/IUser';

interface AuthState {
  isAuthenticated: boolean;
  isRegistering: boolean;
  isLoggingIn: boolean;
  registerError: string | null;
  loginError: string | null;
  user: User | null;
  token: string | null;
}

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState: AuthState = {
  isAuthenticated: false,
  isRegistering: false,
  isLoggingIn: false,
  registerError: null,
  loginError: null,
  token: token,
  user: user ? JSON.parse(user) : null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      logoutService();
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
    setAuthUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegistering = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.data.user));

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistering = false;
        state.registerError = action.error.message || 'Registration failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
  localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.loginError = (action.payload as string) || 'Login failed';
      });
  },
});

export const { logout, clearLoginError, clearRegisterError, setAuthUser } = authSlice.actions;
export default authSlice.reducer;