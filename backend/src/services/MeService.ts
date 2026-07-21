import { tr } from "zod/locales"
import {prisma} from "../config/Prisma.js"

export const getMeService = async (
    userId: string
) => {
    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },

        select: {
            id:         true,
            name:       true,
            email:      true,
            createdAt:  true,
        },
    });
    return user;
}