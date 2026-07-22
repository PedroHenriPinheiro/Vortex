import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import Loading from "../components/Loading";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}