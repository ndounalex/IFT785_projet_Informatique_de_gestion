import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '../auth';

export default auth((request: NextRequest)=> {
  //console.log("============ mes que un club ==========")
  const { pathname } = request.nextUrl;
  console.log(pathname);
  console.log(pathname.startsWith('/login'));
  
  // Define the paths that need protection
  if (!pathname.startsWith('/login')) {
    console.log("============= barcelona")
    const token = request.cookies.get('auth_token'); // Check for auth token in cookies
    // If the token is not present, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }else{
    console.log("============= madrid1111111 ")
    return NextResponse.next();
  }
  //return NextResponse.redirect(new URL('/login', request.url))
  const response = NextResponse.next()
  if (pathname.startsWith('/dashboard')) {
    console.log("============before cookies ===========")
    const token = request.cookies.get('auth_token'); // Check for auth token in cookies
    // If the token is not present, redirect to the login page
    console.log("============== after cookies ============")
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  // If the user is authenticated, continue with the request
  return response;
})



export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 