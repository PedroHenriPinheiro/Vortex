import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddlewares = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não informado."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token inválido."
        });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET não foi configurado.");
    }

    try {
        const decode = jwt.verify(token, secret);

        (req as any).user = decode;

        next();
    } catch {
        return res.status(401).json({
            message: "Token inválido."
        });
    }
};