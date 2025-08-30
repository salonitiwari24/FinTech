import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
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

        // In a real app, this would query the database
        // For demo purposes, we're using mock data
        const mockUser = {
          id: "1",
          name: "Demo User",
          email: "user@example.com",
          // This would be a hashed password in a real app
          password: "$2a$10$8Ux.1KjM/Jx4SzU4JXwOk.uuJp15P7xAYh/XPIJ.o1rFRDnxmCFfK", // "password123"
        };

        // In a real app, this would be:
        // const user = await prisma.user.findUnique({
        //   where: { email: credentials.email }
        // });

        const user = credentials.email === mockUser.email ? mockUser : null;

        if (!user) {
          return null;
        }

        // Check if password matches
        const passwordMatch = await compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
});

export { handler as GET, handler as POST };