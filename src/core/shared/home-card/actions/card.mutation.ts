import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'core/utils/base-url'; 


export const cardMutationApi = createApi({
  reducerPath: 'cardMutationApi',
  baseQuery: fetchBaseQuery({ baseUrl:  `${API_URL}/products` }),
  endpoints: (builder) => ({
    createCard: builder.mutation<any, FormData | object>({
      query: (newCard) => ({
        url: '/',
        method: 'POST',
        body: newCard,
      }),
    }),
    editCard: builder.mutation<any, { id: string, data: object }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteCard: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateCardMutation, useEditCardMutation, useDeleteCardMutation } = cardMutationApi;
