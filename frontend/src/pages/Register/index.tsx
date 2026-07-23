import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {register} from "../../services/UserService"

export default function Register () {
    const navigate = useNavigate();

    const [name, setName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const handleRegister = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        try {
            setLoading(true)

            await register (
                name,
                email,
                password
            );

            alert("Usuário cadastrado com sucesso,.")

            navigate("/login");
        } catch(error) {
            console.error(error)

            alert("Erro ao cadastrar usuário.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main>

            <h1>Cadastro</h1>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                    required
                />

                <br />

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
                    placeholder="Digite sua senha"
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
                        ? "Cadastrando..."
                        : "Cadastrar"    
                    }
                </button>
            </form>

            <br />

            <button
                onClick={() => {navigate("/login")}}
            >
                Voltar para Login
            </button>

        </main>
    )
}