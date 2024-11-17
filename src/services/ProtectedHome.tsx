import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth/authStore';


interface ProtectedRouteHomeProps {
    children: React.ReactElement
}

const ProtectedRouteHome = ({ children }:ProtectedRouteHomeProps) => {
  const { status, user } = useAuthStore();
  const isAuthenticated = status === 'authorized';
  const userRole = user?.rol;

  if (!isAuthenticated || userRole === 'Cliente') return <>{children}</>; 

  if (userRole === 'Socio') return <Navigate to="/Dashboard/Empresa" replace />;

  if (userRole === 'Admin') return <Navigate to="/Dashboard" replace />;
};

export default ProtectedRouteHome;
