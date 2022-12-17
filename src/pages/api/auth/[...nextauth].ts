import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "../../../server/db/client";

import crypto from "crypto";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      const { user } = token;
      const userData = user as { id: string; email: string };

      session = {
        ...session,
        user: {
          id: userData.id,
          ...session.user,
        },
      };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // Find user
        const user = await prisma.users.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return null;
        }

        // Check password hash
        const provided_password_hash = crypto
          .pbkdf2Sync(
            credentials?.password ?? "",
            process.env.NEXTAUTH_SECRET ?? "",
            1000,
            64,
            "sha512"
          )
          .toString("hex");

        if (user.password_hash === provided_password_hash) {
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
