import { createSlice } from '@reduxjs/toolkit';

interface StudentState {
  list: Array<{ id: string; name: string }>;
}

const initialState: StudentState = { list: [] };

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setStudents } = studentSlice.actions;
export default studentSlice.reducer;
