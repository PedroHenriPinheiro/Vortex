import type {Request, Response} from "express";
import { getAdsService, getAdServiceById, deleteAdService, createAdService} from "../services/AdService.js";
import { tr } from "zod/locales";

export const createAd = async (
    req:Request, 
    res:Response
) => {
    try{
        const ad = await createAdService(req.body);

        res.status(201).json({
            message:"Anuncio criado com sucesso."
        });
    } catch(error) {
        res.status(500).json({
            message:"Erro interno.",
            error
        });
    }
}


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

export const deleteAd = async (
    req: Request,
    res: Response
) => {
    try{
        const { id } = req.params;

        const ad = await deleteAdService(id);

        return res.json(`Anuncio removido ${ad}`)
    } catch(error) {
        res.status(500).json({
            message:"Erro interno.",
            error
        });
    }
};