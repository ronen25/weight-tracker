import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "../../../server/db/client";

import crypto from "crypto";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  pages: {
    signIn: "/login",
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
          return user;
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
