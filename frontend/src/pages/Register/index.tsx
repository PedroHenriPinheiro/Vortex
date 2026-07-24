import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {register} from "../../services/UserService"
import Navbar from "../../components/navbar";

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
        <>
            <Navbar />

                <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-surface">

                    <div className="w-full max-w-sm bg-card-bg rounded-card shadow-card p-8">

                        <h1 className="font-display text-2xl font-bold text-text-primary mb-1">
                            Criar conta
                        </h1>

                        <p className="text-sm text-text-secondary mb-6">
                            Preencha os dados para se cadastrar.
                        </p>

                        <form onSubmit={handleRegister} className="flex flex-col gap-4">

                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                                className="w-full rounded-btn border border-slate-200 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition"
                            />

                            <input
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                className="w-full rounded-btn border border-slate-200 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition"
                            />

                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                className="w-full rounded-btn border border-slate-200 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-btn bg-brand-royal text-white text-sm font-semibold py-2.5 mt-2 hover:bg-brand-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </button>

                        </form>

                        <div className="w-full text-center mt-6">

                            <span className="font-medium text-sm text-text-secondary">
                                Já tem conta?
                            </span>

                            <button
                                onClick={() => navigate("/login")}
                                className="text-sm text-brand-royal hover:text-brand-navy transition-colors ml-1"
                            >

                                <span className="font-medium">
                                    Voltar para login
                                </span>

                            </button>

                        </div>

                    </div>

                </main>
                
        </>
    );
}