import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdById } from "../../services/AdService";
import type { Ad } from "../../types/Ad"; // adjust path
import Loading from "../../components/Loading"; // adjust path

export default function AdDetails() {
    const { id } = useParams();

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
        return <h1>Anúncio não encontrado</h1>;
    }

    return (
        <main>
            <h1>{ad.title}</h1>
            <p>{ad.category}</p>
            <p>{ad.isDonation ? "Doação" : `R$: ${ad.price}`}</p>
            <p>{ad.description}</p>
            <img src={ad.imageUrl} width="500" height="300"/>
        </main>
    );
}