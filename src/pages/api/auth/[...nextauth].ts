import { SignIn } from "@/services/auth/services";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge:  24 * 60 * 60, 
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
                const user: any = await SignIn(email);

                if (user) {
                    const passwordConfirm = await bcrypt.compare(password, user.password);
                    if (passwordConfirm) {
                        return user;
                    } else {
                        throw new Error("Invalid password");
                    }
                } else {
                    throw new Error("User not found");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user , profile , account }: any) {
            if (account?.provider === "credentials") {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                

            }
            return token;
        },
        async session({ session, token }: any) {
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }

            if ("id" in token) {
                session.user.id = token.id;
            }

            const accessToken = jwt.sign(token , process.env.NEXTAUTH_SECRET || '' , {
                algorithm : "HS256"
            })

            session.user.accessToken = accessToken

            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);
