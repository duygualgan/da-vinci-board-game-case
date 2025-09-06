/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    [key: string]: any;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
}

