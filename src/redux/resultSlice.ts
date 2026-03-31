import { createSlice } from '@reduxjs/toolkit';

interface ResultState {
  entries: Array<{ id: string; score: number }>;
}

const initialState: ResultState = { entries: [] };

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(state, action) {
      state.entries = action.payload;
    },
  },
});

export const { setResults } = resultSlice.actions;
export default resultSlice.reducer;
