import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <nav>

            <Link to="/">Home</Link>

            <Link to="/ads">Anúncios</Link>

            <Link to="/profile">Perfil</Link>

        </nav>
    )
}