import {z} from "zod";

export const createUserSchema = z.object({
    
    name: z.string().min(3, "O nome deve possuir pelo menos 3 caracteres."),

    email: z.string().email("Email está inválido."),

    password: z.string().min(8, "A senha deve possuir pelo menos 8 caracteres"),
})