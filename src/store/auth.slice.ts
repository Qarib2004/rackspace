import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from 'pages/register/actions/register.mutation';

interface AuthState {
  isAuthenticated: boolean;
  isRegistering: boolean;
  registerError: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isRegistering: false,
  registerError: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegistering = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistering = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistering = false;
        state.registerError = action.error.message || 'Registration failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;