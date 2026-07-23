import {api} from "./Api"
import type { Ad, CreateAd } from "../types/Ad";


export const createAd = async (
    data: CreateAd
): Promise<Ad> => {

    const response = await api.post<Ad>(
        "/ads",
        data
    );

    return response.data;
};


export const getAds = async (): Promise<Ad[]> => {

    const response = await api.get<Ad[]>(
        "/ads"
    );

    return response.data;
};