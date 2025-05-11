import { Navigate } from "react-router-dom";
import { useAuthStore } from "@auth/stores/authStore";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactElement;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { status, user } = useAuthStore();
  const userRole = user?.rol;
  const isAuthenticated = status === "authorized";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole && allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
