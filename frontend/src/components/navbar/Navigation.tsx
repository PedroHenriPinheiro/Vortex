import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export default function Navigation() {
    const { isAuthenticated } = useAuth();

    const linkClass =
        "text-sm font-medium text-text-secondary hover:text-brand-royal transition-colors";

    return (
        <nav className="flex items-center gap-6">
            <Link to="/ads-list" className={linkClass}>Explorar</Link>
            <Link to="/create-ad" className={linkClass}>Anunciar</Link>

            {isAuthenticated && (
                <Link to="/my-ads" className={linkClass}>Meus Anúncios</Link>
            )}
        </nav>
    );
}