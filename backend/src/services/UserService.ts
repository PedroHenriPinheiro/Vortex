import {prisma} from "../config/Prisma.js";

export const createUserService = async(data:any) => {
    const user = await prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
        }
    })
    return user;
};

export const getUserService = async() => {
    return await prisma.users.findMany();
}