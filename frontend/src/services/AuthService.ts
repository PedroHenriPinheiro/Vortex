import {api} from "./Api";
import type { LoginResponse } from "../types/Auth";

export const login = async (
    email:      string,
    password:   string
): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>(
        "/auth",
        {
            email,
            password,
        }
    );

    return response.data;

};