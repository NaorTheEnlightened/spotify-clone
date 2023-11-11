import NextAuth, { type NextAuthOptions } from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'youremail@domain.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '•••••••••',
        },
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
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      user && (token.id = user.id);
      return token;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
