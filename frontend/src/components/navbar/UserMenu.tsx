import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export default function UserMenu() {
    const { isAuthenticated, logout } = useAuth();

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-4">
                <Link
                    to="/profile"
                    className="text-sm font-medium text-text-secondary hover:text-brand-royal transition-colors"
                >
                    Perfil
                </Link>

                <button
                    onClick={logout}
                    className="text-sm font-medium px-4 py-2 rounded-btn bg-brand-navy text-white hover:bg-brand-royal transition-colors"
                >
                    Sair
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Link
                to="/login"
                className="text-sm font-medium text-text-secondary hover:text-brand-royal transition-colors"
            >
                Entrar
            </Link>

            <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-btn bg-brand-royal text-white hover:bg-brand-navy transition-colors"
            >
                Cadastrar
            </Link>
        </div>
    );
}