import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  const userRole = user?.role?.toUpperCase();

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to='/unauthorized' />;
  }

  return children;
};

export default ProtectedRoute;