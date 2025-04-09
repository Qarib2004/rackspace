import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'core/utils/base-url'; 

export interface Product {
  id: number;
  name: string;
  description?: string;
  image?: string[];
  price: number;
  seller:object; 
  weight: string; 
  quantity?: number;
  isAvailable?: boolean;
  isOrganic?: boolean;
  rating?: number;
}

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/products` }),
  endpoints: (builder) => ({
    getAllCards: builder.query<{ data: Product[] }, void>({
      query: () => '/',
    }),
    getCardById: builder.query<Product, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetAllCardsQuery, useGetCardByIdQuery } = cardApi;
