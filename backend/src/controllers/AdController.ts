import type {Request, Response} from "express";
import { getAdsService, getAdServiceById, deleteAdService} from "../services/AdService.js";

export const createAd = async (
    req:Request, 
    res:Response
) => {
    try{
        res.status(201).json({
            message:"Anuncio criado com sucesso."
        });
    } catch(error) {
        res.status(500).json({
            message:"Erro interno."
        });
    }
}


export const getAds = async (
    req: Request,
    res: Response
) => {
    const ads = await getAdsService();

    return res.json(ads);
}


export const getAdById = async(
    req: Request,
    res: Response
) => {
    const {id} = req.params;

    const ad = await getAdServiceById(id);

    return res.json(ad);
}

export const deleteAd = async (
    req: Request,
    res: Response
) => {

    const { id } = req.params;

    await deleteAdService(id);

    return res.json({
        message: "Anúncio removido."
    });

};