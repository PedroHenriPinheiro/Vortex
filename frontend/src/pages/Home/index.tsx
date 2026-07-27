import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { getAds } from "../../services/AdService";
import type { Ad } from "../../types/Ad";
import Loading from "../../components/Loading";
import { Leaf, PlusCircle, Search, ArrowRight } from "lucide-react";

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAds = async () => {
        try {
            const response = await getAds();
            setAds(response.slice(0, 4));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAds();
    }, []);

    return (
        <main className="min-h-screen bg-surface">
            <section className="bg-brand-navy relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 70% 50%, #00A3E0 0%, transparent 60%)",
                    }}
                />

                <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 md:py-24 relative text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-cyan/20 text-brand-cyan rounded-full px-3 py-1 text-xs font-semibold mb-4 border border-brand-cyan/30">
                        <Leaf size={12} /> Economia Circular no Campus
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                        Compre, venda e doe
                        <br />
                        <span className="text-brand-cyan">na sua universidade</span>
                    </h1>

                    <p className="text-blue-200 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        {user?.name
                            ? `Bem-vindo, ${user.name}! Conecte-se com estudantes para trocar materiais acadêmicos.`
                            : "Conectamos estudantes para troca de materiais acadêmicos, reduzindo gastos e impacto ambiental no campus."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate("/create-ad")}
                            className="font-display bg-brand-cyan hover:bg-[#0090C5] text-white font-bold rounded-btn px-7 py-3.5 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                            <PlusCircle size={18} /> Anunciar Item
                        </button>

                        <button
                            onClick={() => navigate("/ads-list")}
                            className="font-display bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-btn px-7 py-3.5 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                            <Search size={18} /> Explorar Anúncios
                        </button>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl font-bold text-text-primary">
                        Anúncios Recentes
                    </h2>

                    <button
                        onClick={() => navigate("/ads-list")}
                        className="text-sm font-medium text-brand-royal hover:text-brand-navy transition-colors flex items-center gap-1"
                    >
                        Ver todos <ArrowRight size={16} />
                    </button>
                </div>

                {loading ? (
                    <Loading />
                ) : ads.length === 0 ? (
                    <p className="text-text-secondary text-sm">
                        Nenhum anúncio disponível no momento.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ads.map((ad) => (
                            <div
                                key={ad.id}
                                onClick={() => navigate(`/ads/${ad.id}`)}
                                className="bg-card-bg rounded-card shadow-card overflow-hidden flex flex-col cursor-pointer hover:shadow-elevated transition-shadow"
                            >
                                <div className="aspect-video bg-surface overflow-hidden">
                                    <img
                                        src={ad.imageUrl}
                                        alt={ad.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <span className="text-xs font-medium text-brand-cyan uppercase tracking-wide">
                                        {ad.category}
                                    </span>

                                    <h3 className="font-display font-semibold text-text-primary mt-1 mb-2 line-clamp-1">
                                        {ad.title}
                                    </h3>

                                    {ad.isDonation ? (
                                        <span className="text-xs font-semibold text-donation bg-donation-bg px-2.5 py-1 rounded-btn">
                                            Doação
                                        </span>
                                    ) : (
                                        <span className="font-display font-bold text-brand-navy">
                                            R$ {ad.price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}