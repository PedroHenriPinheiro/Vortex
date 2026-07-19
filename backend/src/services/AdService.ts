import {prisma} from "../config/Prisma.js";

export const createAdService = async (data: any) => {
    const ad = await prisma.ads.create({
        data: {
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            imageUrl: data.imageUrl,
            isDonation: data.isDonation,
            userId: data.userId
        }
    });

    return ad;
};


export const getAdsService = async () => {
    return await prisma.ads.findMany();
};

export const getAdServiceById = async (id: string) => {
    return await prisma.ads.findUnique({
        where: {
            id
        }
    });
};

export const deleteAdService = async(id: string) => {
    return await prisma.ads.findUnique({
        where: {
            id
        }
    })
};

