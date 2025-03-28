import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '../auth';
import { cookies } from "next/headers";
import Cookies from "js-cookie";

export default  auth((request: NextRequest)=> {
  const myCookies = request.cookies.getAll();
  console.log("============ mes que un club ==========", request.cookies)
  const { pathname } = request.nextUrl;
  console.log(pathname);
  console.log(pathname.startsWith('/login'));
  const cookieStore = cookies();
  console.log("============ mes que un club ==========", request.cookies)
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log({accessToken, myCookies})
  console.log("================ mes que un club ================", Cookies.get("accessToken"));
  // Define the paths that need protection
  if (!accessToken && !pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url));
  }else if(accessToken && !pathname.startsWith('/dashboard')){
    console.log("================ reditect to dashboard item ================",{url:request.url, previous_url: pathname})
    return NextResponse.redirect(new URL('/dashboard', request.url));
    // return NextResponse.next();
  }
  //return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.next();
})



export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 