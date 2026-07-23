import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export default function Login () {
    const navigate = useNavigate();

    const {login, isAuthenticated} = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate])

    const handleLogin = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        try{
            setLoading(true);

            await login(email, password);

            navigate("/");
        } catch(error) {
            console.error(error)

            alert("Email ou senha inválidos.")
        } finally {
            setLoading(false);
        }
    }

    return(
        <main>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                
                <input 
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    required
                />

                <br />

                <input 
                    type="password"
                    placeholder="Digite seu senha"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    required
                />

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Entrando..."
                        : "Entrar"
                    }
                </button>
                
            </form>

            <br />

            <button
                onClick={() => {
                    navigate("/register")
                }}
            >
                Criar Conta
            </button>

        </main>
    )
}