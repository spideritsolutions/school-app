import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './studentSlice';
import attendanceReducer from './attendanceSlice';
import resultReducer from './resultSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    attendance: attendanceReducer,
    results: resultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;