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
                isDonation,
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
            <main className="min-h-screen bg-surface flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="font-display text-xl font-bold text-text-primary mb-2">
                        Editar Anúncio
                    </h1>
                    <p className="text-sm text-text-secondary mb-4">
                        Não foi possível carregar este anúncio.
                    </p>
                    <button
                        onClick={() => navigate("/my-ads")}
                        className="text-sm font-semibold text-brand-royal hover:text-brand-navy transition-colors"
                    >
                        ← Voltar para meus anúncios
                    </button>
                </div>
            </main>
        );
    }

    const inputClass =
        "w-full rounded-btn border border-slate-200 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition";

    return (
        <main className="min-h-screen bg-surface px-4 sm:px-6 py-10 bottom-safe">
            <div className="mx-auto max-w-2xl">
                <h1 className="font-display text-2xl font-bold text-text-primary mb-1">
                    Editar anúncio
                </h1>
                <p className="text-sm text-text-secondary mb-6">
                    Atualize as informações do seu item.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-card-bg rounded-card shadow-card p-6 sm:p-8 flex flex-col gap-5"
                >
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-primary">
                            Título
                        </label>
                        <input
                            type="text"
                            placeholder="Título do Anúncio"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-primary">
                            Descrição
                        </label>
                        <textarea
                            placeholder="Descrição do Produto"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">
                                Categoria
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className={`${inputClass} bg-card-bg`}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {!isDonation && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-primary">
                                    Preço (R$)
                                </label>
                                <input
                                    type="number"
                                    placeholder="0,00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    required={!isDonation}
                                    className={inputClass}
                                />
                            </div>
                        )}
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer w-fit">
                        <input
                            type="checkbox"
                            checked={isDonation}
                            onChange={(e) => setIsDonation(e.target.checked)}
                            className="h-4 w-4 rounded accent-brand-royal cursor-pointer"
                        />
                        <span className="text-sm text-text-primary">
                            Produto para doação
                        </span>
                    </label>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-primary">
                            URL da imagem
                        </label>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {imageUrl && (
                        <div className="rounded-btn overflow-hidden border border-slate-200 aspect-video bg-surface">
                            <img
                                src={imageUrl}
                                alt="Pré-visualização"
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-btn bg-brand-royal text-white text-sm font-semibold py-3 hover:bg-brand-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {saving ? "Salvando..." : "Salvar alterações"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/my-ads")}
                            className="w-full rounded-btn border border-slate-200 text-text-secondary text-sm font-semibold py-3 hover:bg-surface transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}