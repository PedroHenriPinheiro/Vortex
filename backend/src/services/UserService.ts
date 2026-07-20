import {prisma} from "../config/Prisma.js";
import bcrypt from "bcrypt";

export const createUserService = async(data:any) => {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        }
    })
    return user;
};

export const getUserService = async() => {
    return await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        }
    });
}