import { getMyAds, deleteAd } from "../../services/AdService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import type { Ad } from "../../types/Ad";

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
            alert("Erro ao excluir anúncio.");
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

                    <button onClick={() => handleEdit(ad.id)}>
                        Editar
                    </button>

                    <button
                        onClick={() => handleDelete(ad.id)}
                        disabled={deletingId === ad.id}
                    >
                        {deletingId === ad.id ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            ))}
        </main>
    );
}