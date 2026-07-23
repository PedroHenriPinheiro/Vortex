import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export default function UserMenu() {
    const {isAuthenticated, logout} = useAuth();

    if(isAuthenticated) {
        return (
            <div>

                <Link to="/profile">Perfil</Link>

                <button onClick={logout}>Sair</button>
            </div>
        )
    } 

    return (
        <div>

            <Link to="/login">Entrar</Link>

            {" | "}

            <Link to="/register">Cadastrar</Link>
            
        </div>
    )
}