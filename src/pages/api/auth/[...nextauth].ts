import { SignIn } from "@/services/auth/services";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 hari
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };
                console.log(email, password);
                const user: any = await SignIn(email);
                
                if (!user) {
                    throw new Error("User tidak ditemukan!");
                }
                
                const passwordConfirm = await bcrypt.compare(password, user.password);
                if (!passwordConfirm) {
                    throw new Error("Password salah!");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.email = token.email ?? "";
                session.user.id = token.id ?? "";
            }
            session.accessToken = jwt.sign(
                token,
                process.env.NEXTAUTH_SECRET || "default_secret",
                {
                    algorithm: "HS256",
                    expiresIn: "30d",
                }
            );
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);
