import { createSlice } from '@reduxjs/toolkit';

interface AttendanceState {
  records: Record<string, boolean>;
}

const initialState: AttendanceState = { records: {} };

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendance(state, action) {
      state.records = action.payload;
    },
  },
});

export const { setAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
