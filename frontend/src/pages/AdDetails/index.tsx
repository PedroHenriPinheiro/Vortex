import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdById } from "../../services/AdService";
import type { Ad } from "../../types/Ad"; 
import Loading from "../../components/Loading"; 
import toast from "react-hot-toast";

export default function AdDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState(true);

    const loadAd = async () => {
        try {
            if (!id) return;
            const response = await getAdById(id);
            setAd(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAd();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!ad) {
        return (
            <main className="min-h-screen bg-surface flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="font-display text-xl font-bold text-text-primary mb-2">
                        Anúncio não encontrado
                    </h1>
                    <button
                        onClick={() => navigate("/ads-list")}
                        className="text-sm font-semibold text-brand-royal hover:text-brand-navy transition-colors"
                    >
                        ← Voltar para anúncios
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface px-4 sm:px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <button
                    onClick={() => navigate("/ads-list")}
                    className="text-sm font-medium text-text-secondary hover:text-brand-royal transition-colors mb-6"
                >
                    ← Voltar
                </button>

                <div className="bg-card-bg rounded-card shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-surface aspect-video md:aspect-auto md:h-full overflow-hidden">
                        <img
                            src={ad.imageUrl}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col">
                        <span className="text-xs font-medium text-brand-cyan uppercase tracking-wide mb-2">
                            {ad.category}
                        </span>

                        <h1 className="font-display text-2xl font-bold text-text-primary mb-3">
                            {ad.title}
                        </h1>

                        {ad.isDonation ? (
                            <span className="inline-block w-fit text-sm font-semibold text-donation bg-donation-bg px-3 py-1.5 rounded-btn mb-4">
                                Doação
                            </span>
                        ) : (
                            <span className="font-display text-2xl font-bold text-brand-navy mb-4">
                                R$ {ad.price}
                            </span>
                        )}

                        <p className="text-sm text-text-secondary leading-relaxed mb-8">
                            {ad.description}
                        </p>

                        <button
                            className="mt-auto w-full rounded-btn bg-brand-royal text-white text-sm font-semibold py-3 hover:bg-brand-navy transition-colors"
                            onClick={() => toast.success("Feature será adicionada futuramente!")}
                        >
                            Entrar em contato
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}