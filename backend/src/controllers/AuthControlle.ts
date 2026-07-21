import type {Request, Response} from "express";
import { loginService } from "../services/AuthService.js";

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const {email, password} = req.body

        const response = await loginService(email, password);

        if(!response){
            return res.status(401).json({
                message: "Email ou senha inválidos."
            })
        }

        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({
            massage: "Erro interno."
        })
    }
}