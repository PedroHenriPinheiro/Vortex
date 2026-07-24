import { useEffect, useState } from "react";
import type { Ad } from "../../types/Ad";
import Loading from "../../components/Loading";
import { getMyAds } from "../../services/AdService";

export default function MyAds() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadAds = async () => {
        try {
            const response = await getMyAds();
            setAds(response);
        } catch (error) {
            console.error(error);
            setError(true);
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

    if (error) {
        return (
            <main>
                <h1>Meus anúncios</h1>
                <p>Não foi possível carregar seus anúncios. Tente novamente.</p>
            </main>
        );
    }

    if (ads.length === 0) {
        return (
            <main>
                <h1>Meus anúncios</h1>
                <p>Você ainda não possui anúncios.</p>
            </main>
        );
    }

    return (
        <main>
            <h1>Meus anúncios</h1>

            {ads.map((ad) => (
                <div key={ad.id}>
                    <h2>{ad.title}</h2>
                    <p>{ad.description}</p>
                    <p>{ad.category}</p>
                    <p>{ad.isDonation ? "Doação" : `R$ ${ad.price}`}</p>

                    <button>Editar</button>
                    <button>Excluir</button>
                </div>
            ))}
        </main>
    );
}