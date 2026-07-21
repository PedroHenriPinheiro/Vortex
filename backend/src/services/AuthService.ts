import {prisma} from '../config/Prisma.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (
    email: string,
    password: string,
) => {
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if(!user){
        return null;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordValid){
        return null;
    }

    const token = jwt.sign(
        {
            id:     user.id,
            email:  user.email
        },

        process.env.JWT_SECRET!,

        {
            expiresIn: "1h",
        }
    );

    return {
        user: {
            id:     user.id,
            name:   user.name,
            email:  user.email
        },
        token,
    };

};


