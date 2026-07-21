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

        if(!user){
            return res.status(409).json({
                message: "email já cadastrado."
            });
        }

        return res.status(201).json(user);
    } catch(error){
        res.status(500).json({
            message: "Error interno.",
            error
        })
    }
};
