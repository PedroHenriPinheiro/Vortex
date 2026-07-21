import { createContext, useEffect, useState, type ReactNode } from "react";
import type {User} from "../types/User";
import {login as loginService} from "../services/AuthService";
import {getMe} from "../services/UserService";

export const useAuth = () => {
    return useContext(AuthContext);
};

export interface AuthContextData {
    user:               User | null;
    token:              string | null;
    loading:            boolean;
    isAuthenticated:    boolean;

    login: (
        email:      string,
        password:   string
    ) => Promise<void>;

    logout: () => void;
}

export const AuthContext = createContext (
    {} as AuthContextData
)

interface AuthProviderProps{
    children: ReactNode;
}

export function AuthProvider({
    children,
}:  AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    )

    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!token;

    const login = async (
        email:      string,
        password:   string
    ) => {
        const response = await loginService(
            email,
            password
        )

        setUser(response.user)
        setToken(response.token)

        localStorage.setItem(
            "token",
            response.token
        );
    };

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem("token")
    }

    const loadUser = async () => {
        try {
            const user = await getMe();

            setUser(user)
        } catch {
            logout();
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(token) {
            loadUser();
        } else {
            setLoading(false)
        }
    }, [token])

    return(
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )

};