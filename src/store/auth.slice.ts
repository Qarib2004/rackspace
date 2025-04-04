import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from 'pages/register/actions/register.mutation';
import { loginUser } from '../pages/login/actions/login.mutation';
import { logoutService } from '../pages/login/actions/login.service';
import { User } from 'core/utils/IUser';
interface AuthState {
  isAuthenticated: boolean;
  isRegistering: boolean;
  isLoggingIn: boolean;
  registerError: string | null;
  loginError: string | null;
  user: User |any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isRegistering: false,
  isLoggingIn: false,
  registerError: null,
  loginError: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      logoutService();
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearRegisterError: (state) => {
      state.registerError = null;
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.loginError = (action.payload as string) || 'Login failed';
      });
  },
});

export const { logout, clearLoginError, clearRegisterError } =
  authSlice.actions;
export default authSlice.reducer;
