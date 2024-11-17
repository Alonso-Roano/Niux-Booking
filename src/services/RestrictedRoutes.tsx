import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth/authStore";

interface RestrictedRouteProps {
    redirectPath?: string;
    children: React.ReactElement;
}

const RestrictedRoute = ({ redirectPath = "/", children }: RestrictedRouteProps) => {
    const { status } = useAuthStore();
    const isAuthenticated = status === 'authorized';
    return isAuthenticated ? <Navigate to={redirectPath} replace /> : children;
};

export default RestrictedRoute;
