import type { User } from "../types/User";
import { AuthContext } from "../hooks/UseAuth";
import { useContext } from "react";

export interface AuthContext {
    user:           User | null;

    token:          string | null;

    loading:        boolean;

    isAuthenticated: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    logout: () => void;
}


export const useAuth = () => {
    return useContext(AuthContext);
}