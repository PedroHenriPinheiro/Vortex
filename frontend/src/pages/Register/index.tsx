import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {register} from "../../services/UserService"
import Navbar from "../../components/navbar";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
    }>({})

    const validate = () => {
        const newErrors: typeof errors = {};

        if (name.trim().length < 3) {
            newErrors.name = "O nome deve ter pelo menos 3 caracteres.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = "Digite um email válido.";
        }

        if (password.length < 6) {
            newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);

            await register(name, email, password);

            toast.success("Usuário cadastrado com sucesso!");

            navigate("/login");
        } catch (error) {
            console.error(error);

            toast.error("Erro ao cadastrar usuário.");
        } finally {
            setLoading(false);
        }
    };

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

                    <form onSubmit={handleRegister} className="flex flex-col gap-4" noValidate>
                        <div>
                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className={`w-full rounded-btn border px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition ${
                                    errors.name
                                        ? "border-red-400 focus:ring-red-400"
                                        : "border-slate-200 focus:ring-brand-royal"
                                }`}
                            />
                            {errors.name && (
                                <span className="text-xs text-red-500 mt-1 block">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className={`w-full rounded-btn border px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition ${
                                    errors.email
                                        ? "border-red-400 focus:ring-red-400"
                                        : "border-slate-200 focus:ring-brand-royal"
                                }`}
                            />
                            {errors.email && (
                                <span className="text-xs text-red-500 mt-1 block">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className={`w-full rounded-btn border px-4 py-2.5 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition ${
                                        errors.password
                                            ? "border-red-400 focus:ring-red-400"
                                            : "border-slate-200 focus:ring-brand-royal"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {errors.password && (
                                <span className="text-xs text-red-500 mt-1 block">
                                    {errors.password}
                                </span>
                            )}
                        </div>

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
                            <span className="font-medium">Voltar para login</span>
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}