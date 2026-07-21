import type { User } from "./User";

export interface Login {
    email:      string;

    password:   string;
}


export interface Register {
    name:       string;

    email:      string;

    password:   string;
}


export interface LoginResponse {
    user:   User;

    token:  string;
}