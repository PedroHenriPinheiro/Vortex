import {z} from "zod";

export const createUserSchema = z.object({
    
    name: z.string().min(3, "O nome deve possuir pelo menos 3 caracteres."),

    email: z.string().email("Email está inválido."),
})