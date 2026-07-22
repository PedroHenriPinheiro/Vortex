import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

interface ProtectedRoutesProps {
    children: React.ReactNode
}

export function ProtectedRoutes({
    children,
}: ProtectedRoutesProps) {
    const {isAuthenticated, loading} = useAuth();

    if(loading){
        return <h1>Carregando a página...</h1>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }

    return children;
}