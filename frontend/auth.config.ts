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
    },
    /* authorized({ auth, request: { nextUrl } }) {
      return !!auth;
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log("=============== mes que un club");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/login', nextUrl)); // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }else{
        return Response.redirect(new URL('/login', nextUrl)); 
      }
      return true;
    }, */
  },
} satisfies NextAuthConfig;