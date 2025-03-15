import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

// This is the recommended way to configure auth
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
            return null;
            }

            const user = await prisma.user.findUnique({
            where: { email: credentials.email }
            });

            if (!user || !user.password) {
            return null;
            }

            const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
            );

            if (!passwordMatch) {
            return null;
            }

            return {
            id: user.id,
            email: user.email,
            name: user.name,
            };
        }
        })
        // Add other providers here if needed
    ],
    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
        }
        return token;
        },
        async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id;
        }
        return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});