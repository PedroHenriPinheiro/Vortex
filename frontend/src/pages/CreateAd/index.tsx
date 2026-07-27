import { useState } from "react";
import { categories } from "../../constants/categories";
import { createAd } from "../../services/AdService";
import { useNavigate } from "react-router-dom";

export default function CreateAd() {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("");

    const [price, setPrice] = useState("");

    const [imageUrl, setImageUrl] = useState("");

    const [isDonation, setIsDonation] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedPrice = isDonation ? undefined : Number(price);

        if (!isDonation && (price === "" || Number.isNaN(parsedPrice))) {
            alert("Informe um preço válido.");
            return;
        }

        setLoading(true);

        try {
            await createAd({
                title,
                description,
                category,
                price: parsedPrice,
                imageUrl,
                isDonation,
            });

            alert("Anúncio criado");
            navigate("/my-ads");
        } catch (error) {
            console.error(error);
            alert("Erro ao criar anúncio.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-btn border border-slate-200 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition";

    return (
        <main className="min-h-screen bg-surface px-4 sm:px-6 py-10 bottom-safe">
            <div className="mx-auto max-w-2xl">
                <h1 className="font-display text-2xl font-bold text-text-primary mb-1">
                    Criar anúncio
                </h1>
                <p className="text-sm text-text-secondary mb-6">
                    Preencha os dados do item que você quer anunciar.
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
                            placeholder="Ex: Jaleco branco tamanho M"
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
                            placeholder="Descreva o produto: estado de conservação, tamanho, etc."
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
                            Este produto é para doação
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-btn bg-brand-royal text-white text-sm font-semibold py-3 mt-2 hover:bg-brand-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Criando..." : "Criar anúncio"}
                    </button>
                </form>
            </div>
        </main>
    );
}