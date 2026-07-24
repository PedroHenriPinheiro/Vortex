import { useEffect, useState } from "react";
import { getAds } from "../../services/AdService";
import { useNavigate } from "react-router-dom";
import type { Ad } from "../../types/Ad"; // adjust path to wherever Ad is defined
import Loading from "../../components/Loading"; // adjust path

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

    if (ads.length === 0) {
        return <h1>Anúncio não encontrado.</h1>;
    }

    return (
        <main>
            <h1>Explorar Anúncios</h1>

            {ads.map((ad) => (
                <div key={ad.id}>
                    <h2>{ad.title}</h2>
                    <p>{ad.category}</p>
                    <p>{ad.isDonation ? "Doação" : `R$: ${ad.price}`}</p>

                    <button onClick={() => navigate(`/ads/${ad.id}`)}>
                        Ver anúncio
                    </button>
                </div>
            ))}
        </main>
    );
}