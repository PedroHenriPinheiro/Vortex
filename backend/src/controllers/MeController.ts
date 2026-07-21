import type {Request, Response} from "express";
import {getMeService} from "../services/MeService.js";

export const getMe = async (
    req: Request,
    res: Response,
) => {
    try{
        const userId = (req as any).user.id;

        const user = await getMeService(userId);

        return res.status(200).json(user);
    } catch(error) {
        return res.status(500).json({
            message: "Error interno."
        });
    };
};