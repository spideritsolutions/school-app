import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Pages
import MasterDashboard from "../roles/master/pages/MasterDashboard";
import TeacherDashboard from "../roles/teacher/pages/TeacherDashboard";
import StudentDashboard from "../roles/student/pages/StudentDashboard";
import Login from '../pages/Login';
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route 
        path="/admin-dashboard"
        element = {
          <ProtectedRoute allowedRoles={["MASTER", "ADMIN"]}>
            <MasterDashboard />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;