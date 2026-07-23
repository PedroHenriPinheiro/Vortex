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
                isDonation
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

    return (
        <main>
            <h1>Cria Anuncios</h1>

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

                <button type="submit" disabled={loading}>
                    {loading ? "Criando..." : "Criar anúncio"}
                </button>
            </form>
        </main>
    );
}