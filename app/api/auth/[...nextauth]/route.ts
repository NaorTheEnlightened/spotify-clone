import NextAuth, { type NextAuthOptions } from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { db } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'youremail@domain.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // check to see if email and password exist
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // check to see if user exists
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        // check to see if passwords match
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        return passwordsMatch ? user : null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      const user = session.user;

      if (token && user) {
        user.id = token.id;
        user.name = token.name;
        user.email = token.email;
        user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token?.email,
        },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
      };
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
