import { rootSlice } from 'store/store.reducer'; 
import { authSlice } from 'store/auth.slice'; 
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  root: rootSlice.reducer,
  auth: authSlice.reducer, 
});

export type RootState = ReturnType<typeof rootReducer>;
