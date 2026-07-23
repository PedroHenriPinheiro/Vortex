import { useAuth } from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const {user} = useAuth();

    const navigate = useNavigate();

    return (
        <main>
            <h1>Home</h1>
            <br />
            <h2>Bem-vindo {user?.name}</h2>

            <button onClick={() => {navigate("/profile")}}>Perfil</button>
        </main>
    )
}