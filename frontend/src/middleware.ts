import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '../auth';
import { cookies } from "next/headers";
import Cookies from "js-cookie";

export default  auth((request: NextRequest)=> {
  const myCookies = request.cookies.getAll();
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  // Define the paths that need protection
  if (!accessToken && !pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url));
  }else if(accessToken && (pathname=='/')){
    return NextResponse.redirect(new URL('/dashboard', request.url));
    // return NextResponse.next();
  }
  return NextResponse.next();
})



export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 