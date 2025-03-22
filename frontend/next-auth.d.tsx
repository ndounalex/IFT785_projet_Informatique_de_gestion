import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        access_token: string;
        refresh_token: string;
        expires_on: number;
        exp: number;
        iat: number;
        jti: string;
    }
    interface Session extends DefaultSession {
        user: User;
        expires_in: string;
        error: string;
    }
}