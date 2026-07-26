import { useEffect, useState } from "react";
import { getAds } from "../../services/AdService";
import { useNavigate } from "react-router-dom";
import type { Ad } from "../../types/Ad"; 
import Loading from "../../components/Loading"; 

export default function AdsList() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loadAds = async () => {
        try {
            const response = await getAds();
            setAds(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAds();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="min-h-screen bg-surface px-4 sm:px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <h1 className="font-display text-2xl font-bold text-text-primary mb-8">
                    Explorar Anúncios
                </h1>

                {ads.length === 0 ? (
                    <p className="text-text-secondary text-sm">
                        Nenhum anúncio encontrado no momento.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ads.map((ad) => (
                            <div
                                key={ad.id}
                                className="bg-card-bg rounded-card shadow-card overflow-hidden flex flex-col hover:shadow-elevated transition-shadow"
                            >
                                <div className="aspect-video bg-surface overflow-hidden">
                                    <img
                                        src={ad.imageUrl}
                                        alt={ad.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <span className="text-xs font-medium text-brand-cyan uppercase tracking-wide mb-1">
                                        {ad.category}
                                    </span>

                                    <h2 className="font-display font-semibold text-text-primary mb-2 line-clamp-1">
                                        {ad.title}
                                    </h2>

                                    <div className="mt-auto flex items-center justify-between gap-3">
                                        {ad.isDonation ? (
                                            <span className="text-xs font-semibold text-donation bg-donation-bg px-2.5 py-1 rounded-btn">
                                                Doação
                                            </span>
                                        ) : (
                                            <span className="font-display font-bold text-brand-navy">
                                                R$ {ad.price}
                                            </span>
                                        )}

                                        <button
                                            onClick={() => navigate(`/ads/${ad.id}`)}
                                            className="text-sm font-semibold text-brand-royal hover:text-brand-navy transition-colors"
                                        >
                                            Ver anúncio →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}