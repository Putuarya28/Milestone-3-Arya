import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

type PlatziUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

// Admin credentials Platzi API:
// email: admin@mail.com
// password: admin123

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch('https://api.escuelajs.co/api/v1/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          
          const users: PlatziUser[] = await response.json();
          const user = users.find(user => user.email === credentials.email);

          if (user && user.password === credentials.password) {
            
            const isAdmin = user.email === 'admin@mail.com';
            return {
              id: String(user.id),
              name: user.name,
              email: user.email,
              role: isAdmin ? 'admin' : 'customer',
              image: user.avatar
            };
          }

          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "my-super-secret-key-that-should-be-in-env",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
