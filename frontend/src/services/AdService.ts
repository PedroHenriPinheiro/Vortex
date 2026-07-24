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

    const response = await api.get<Ad[]>("/ads");

    return response.data;
};

export const getMyAds = async (): Promise<Ad[]> => {
    const response = await api.get<Ad[]>("/ads/my-ads");
    return response.data;
};

export const getAdById = async (id: string): Promise<Ad> => {
    const response = await api.get<Ad>(`/ads/${id}`);
    return response.data;
};

export const deleteAd = async (id: string): Promise<void> => {
    await api.delete(`/ads/${id}`);
};

export const updateAd = async (id: string, data: Partial<CreateAd>): Promise<Ad> => {
    const response = await api.put<Ad>(`/ads/${id}`, data);
    return response.data;
};