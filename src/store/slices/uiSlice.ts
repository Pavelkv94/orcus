import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  signUpModalOpen: boolean;
  loading: boolean;
}

const initialState: UiState = {
  signUpModalOpen: false,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSignUpModalOpen: (state, action: PayloadAction<boolean>) => {
      state.signUpModalOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSignUpModalOpen, setLoading } = uiSlice.actions;
export default uiSlice.reducer;

