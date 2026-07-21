import {api} from "./Api";
import type {User} from "../types/User";


export const register = async (
    name:       string,
    email:      string,
    password:   string
) => {

    const response = await api.post("/users", {
        name,
        email,
        password
    })

    return response.data;
};


export const getMe = async () : Promise<User> => {
    const response = await api.get<User>("/me");

    return response.data;
}