export interface Student {
  id: string;
  name: string;
}

export interface AttendanceRecord {
  date: string;
  present: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}
