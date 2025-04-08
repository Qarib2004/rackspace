import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './actions/auth.actions';
import { environment } from 'core/configs/app.config';
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

const getStoredToken = (): string | null => {
  return (
    localStorage.getItem(`${environment.applicationName}-token`) ||
    localStorage.getItem('token')
  );
};

const getStoredUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isRegistering: false,
  isLoggingIn: false,
  registerError: null,
  loginError: null,
  token: getStoredToken(),
  user: getStoredUser(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem(`${environment.applicationName}-token`);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
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

export const {
  logout,
  clearLoginError,
  clearRegisterError,
  setAuthUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export default authSlice;
