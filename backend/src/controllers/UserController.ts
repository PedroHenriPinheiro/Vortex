import type { Request, Response } from "express";
import { createUserService, getUserService } from "../services/UserService.js";
import { createUserSchema } from "../schema/UserSchema.js";

export const createUser = async(
    req: Request,
    res: Response
) => {
    try{
        const data = createUserSchema.parse(req.body);

        const user = await createUserService(data);

        return res.status(201).json(user);
    } catch(error){
        res.status(501).json({
            message: "Error interno.",
            error
        })
    }
};


export const getUser = async(
    req: Request,
    res: Response
) => {
    try{
        const users = await getUserService();

        return res.json(users);
    } catch(error) {
        res.status(500).json({
            message:"Erro interno.",
            error
        });
    }
}