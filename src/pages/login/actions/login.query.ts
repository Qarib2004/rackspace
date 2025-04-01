import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'core/utils/base-url'; 
import { getToken } from 'core/helpers/get-token'; 
import { LoginCredentials, LoginResponse } from './login.mutation';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/users/forgotPassword',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      LoginResponse, 
      { token: string; password: string; passwordConfirm: string }
    >({
      query: ({ token, ...passwordData }) => ({
        url: `/users/resetPassword/${token}`,
        method: 'PATCH',
        body: passwordData,
      }),
    }),
    updatePassword: builder.mutation<
      LoginResponse,
      { currentPassword: string; password: string; passwordConfirm: string }
    >({
      query: (passwordData) => ({
        url: '/users/updatePassword',
        method: 'PATCH',
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = loginApi;

