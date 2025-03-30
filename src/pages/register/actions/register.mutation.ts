import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterService } from './register.service';
import { setLoader, setUser } from 'store/store.reducer';
import { setToken } from 'core/helpers/get-token';
import { IRegisterRequest, IRegisterResponse } from './register';
import { AppDispatch } from 'store/store.config';

export const registerUser = createAsyncThunk<
  IRegisterResponse,
  IRegisterRequest,
  { dispatch: AppDispatch }
>('users/signup', async (registerData, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    const response = await RegisterService.register(registerData);

    if (response && response.token) {
      setToken(response.token);
      dispatch(setUser(response));
    }

    return response;
  } catch (error) {
    console.log(error, 'failed registration');
    throw error;
  } finally {
    dispatch(setLoader(false));
  }
});
