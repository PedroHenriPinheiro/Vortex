import { Navigate } from "react-router-dom";

export function ProtectedRoutes({children}) {
    if(!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}