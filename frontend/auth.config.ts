import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
/*     async encode() {},
    async decode() {}, */
  },
  callbacks: {
    async jwt({token, user}) {
        return {...token, ...user};
    },
    async session({session, token, user}) {
        session.user = token as any;
        return session;
    }
  },
} satisfies NextAuthConfig;