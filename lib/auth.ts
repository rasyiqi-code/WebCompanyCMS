import NextAuth, { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { accounts, sessions, users, verificationTokens } from "../db/schema";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" }
            },
            // ... inside provider ...
            async authorize(credentials) {
                console.log("[AUTH] Attempting login:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("[AUTH] Missing credentials");
                    return null;
                }

                const [user] = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);

                if (!user || !user.password) {
                    console.log("[AUTH] User not found or no password:", user ? "No PWD" : "No User");
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

                if (passwordsMatch) {
                    console.log("[AUTH] Success:", user.email, user.role);
                    return user;
                }

                console.log("[AUTH] Password mismatch for:", user.email);
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};
