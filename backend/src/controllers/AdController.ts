import type {Request, Response} from "express";
import { getAdsService, getAdServiceById, deleteAdService, createAdService} from "../services/AdService.js";
import { createAdSchema } from "../schema/AdSchema.js";

export const createAd = async (req: Request, res: Response) => {
    try {
        const parsed = createAdSchema.parse(req.body);

        const userId = (req as any).user?.id ?? (req as any).user?.sub;

        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        const ad = await createAdService({
            ...parsed,
            userId
        });

        res.status(201).json({
            message: "Anuncio criado com sucesso.",
            ad
        });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Dados inválidos.",
                errors: error.errors
            });
        }

        console.error(error); 

        res.status(500).json({
            message: "Erro interno.",
        });
    }
};


export const getAds = async (
    req: Request,
    res: Response
) => {
    try{
        const ads = await getAdsService();

        return res.json(ads);
    } catch(error) {
        res.status(500).json({
            message:"Erro interno.",
            error
        });
    }
}


export const getAdById = async(
    req: Request,
    res: Response
) => {
    try{
        const {id} = req.params;

        const ad = await getAdServiceById(id);

        return res.json(ad);
    } catch(error) {
        res.status(500).json({
            message:"Erro interno.",
            error
        });
    }
}

export const deleteAd = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const ad = await deleteAdService(id);

        return res.json({ message: "Anúncio removido", ad });

    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Erro interno." });
    }
};