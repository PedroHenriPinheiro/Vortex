import { getMyAds, deleteAd } from "../../services/AdService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import type { Ad } from "../../types/Ad";
import toast from "react-hot-toast";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

export default function MyAds() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const navigate = useNavigate();

    const loadAds = async () => {
        try {
            const response = await getMyAds();
            setAds(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/edit-ad/${id}`);
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir este anúncio?");
        if (!confirmed) return;

        setDeletingId(id);
        try {
            await deleteAd(id);
            setAds((prev) => prev.filter((ad) => ad.id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir anúncio.");
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        loadAds();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <main className="min-h-screen bg-surface flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="font-display text-xl font-bold text-text-primary mb-2">
                        Meus anúncios
                    </h1>
                    <p className="text-sm text-text-secondary">
                        Não foi possível carregar seus anúncios. Tente novamente.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface px-4 sm:px-6 py-10 bottom-safe">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="font-display text-2xl font-bold text-text-primary">
                        Meus anúncios
                    </h1>

                    <button
                        onClick={() => navigate("/create-ad")}
                        className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white bg-brand-royal hover:bg-brand-navy rounded-btn px-4 py-2.5 transition-colors"
                    >
                        <PlusCircle size={16} /> Novo anúncio
                    </button>
                </div>

                {ads.length === 0 ? (
                    <div className="bg-card-bg rounded-card shadow-card p-10 text-center">
                        <p className="text-text-secondary text-sm mb-4">
                            Você ainda não possui anúncios.
                        </p>
                        <button
                            onClick={() => navigate("/create-ad")}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-royal hover:bg-brand-navy rounded-btn px-5 py-2.5 transition-colors"
                        >
                            <PlusCircle size={16} /> Criar meu primeiro anúncio
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ads.map((ad) => (
                            <div
                                key={ad.id}
                                className="bg-card-bg rounded-card shadow-card p-5 flex flex-col"
                            >
                                <span className="text-xs font-medium text-brand-cyan uppercase tracking-wide mb-1">
                                    {ad.category}
                                </span>

                                <h2 className="font-display font-semibold text-text-primary mb-1.5 line-clamp-1">
                                    {ad.title}
                                </h2>

                                <p className="text-sm text-text-secondary line-clamp-2 mb-3 flex-1">
                                    {ad.description}
                                </p>

                                {ad.isDonation ? (
                                    <span className="w-fit text-xs font-semibold text-donation bg-donation-bg px-2.5 py-1 rounded-btn mb-4">
                                        Doação
                                    </span>
                                ) : (
                                    <span className="font-display font-bold text-brand-navy mb-4">
                                        R$ {ad.price}
                                    </span>
                                )}

                                <div className="flex gap-3 pt-3 border-t border-slate-200">
                                    <button
                                        onClick={() => handleEdit(ad.id)}
                                        className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-royal border border-brand-royal/30 rounded-btn py-2 hover:bg-brand-royal/5 transition-colors"
                                    >
                                        <Pencil size={14} /> Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(ad.id)}
                                        disabled={deletingId === ad.id}
                                        className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-danger border border-danger/30 rounded-btn py-2 hover:bg-danger/5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <Trash2 size={14} />
                                        {deletingId === ad.id ? "Excluindo..." : "Excluir"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Botão flutuante - mobile */}
                <button
                    onClick={() => navigate("/create-ad")}
                    className="sm:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-royal text-white shadow-elevated flex items-center justify-center hover:bg-brand-navy transition-colors"
                    aria-label="Criar novo anúncio"
                >
                    <PlusCircle size={24} />
                </button>
            </div>
        </main>
    );
}