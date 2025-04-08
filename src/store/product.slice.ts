import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'core/utils/IUser';

export interface Product {
    id: number;
    name: string;
    description?: string;
    image?: string[];
    price: number;
    seller:User; 
    weight: string; 
    quantity?: number;
    isAvailable?: boolean;
    isOrganic?: boolean;
    rating?: number;
  }

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [], };

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
