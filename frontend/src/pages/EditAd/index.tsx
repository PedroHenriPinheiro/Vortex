import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../constants/categories";
import { getAdById, updateAd } from "../../services/AdService";
import Loading from "../../components/Loading";

export default function EditAd() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("");

    const [price, setPrice] = useState("");

    const [imageUrl, setImageUrl] = useState("");

    const [isDonation, setIsDonation] = useState(false);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        const loadAd = async () => {
            if (!id) return;

            try {
                const ad = await getAdById(id);

                setTitle(ad.title);
                setDescription(ad.description);
                setCategory(ad.category);
                setPrice(ad.price != null ? String(ad.price) : "");
                setImageUrl(ad.imageUrl ?? "");
                setIsDonation(ad.isDonation ?? false);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadAd();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        const parsedPrice = isDonation ? undefined : Number(price);

        if (!isDonation && (price === "" || Number.isNaN(parsedPrice))) {
            alert("Informe um preço válido.");
            return;
        }

        setSaving(true);

        try {
            await updateAd(id, {
                title,
                description,
                category,
                price: parsedPrice,
                imageUrl,
                isDonation
            });

            alert("Anúncio atualizado");
            navigate("/my-ads");
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar anúncio.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <main>
                <h1>Editar Anúncio</h1>
                <p>Não foi possível carregar este anúncio.</p>
            </main>
        );
    }

    return (
        <main>
            <h1>Editar Anúncio</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título do Anúncio"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <br />

                <textarea
                    placeholder="Descrição do Produto"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {!isDonation && (
                    <input
                        type="number"
                        placeholder="Preço"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required={!isDonation}
                    />
                )}

                <label>
                    <input
                        type="checkbox"
                        checked={isDonation}
                        onChange={(e) => setIsDonation(e.target.checked)}
                    />
                    Produto para doação
                </label>

                <input
                    type="url"
                    placeholder="URL da imagem"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <button type="submit" disabled={saving}>
                    {saving ? "Salvando..." : "Salvar alterações"}
                </button>
            </form>
        </main>
    );
}