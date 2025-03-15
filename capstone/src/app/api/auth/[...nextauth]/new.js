import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
// import { handlers } from "@/auth"

// export const authOptions = {
export const { auth, handlers, signIn, signOut } = NextAuth({
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
        }),
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/new-user'
    },
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
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    // debug: process.env.NODE_ENV === "development",
    debug: true,
});

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
export const { GET, POST } = handlers;