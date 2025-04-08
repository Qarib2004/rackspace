import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
  selectedCard: any | null;
}

const initialState: CardState = {
  selectedCard: null,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setSelectedCard(state, action: PayloadAction<any>) {
      state.selectedCard = action.payload;
    },
    clearSelectedCard(state) {
      state.selectedCard = null;
    }
  }
});

export const { setSelectedCard, clearSelectedCard } = cardSlice.actions;
export default cardSlice.reducer;
