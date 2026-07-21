import type { User } from "../types/User";

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
