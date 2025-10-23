import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_AT_SECRET!);
const PUBLIC_ROUTES = ['/login', '/signup'];
console.log('SECRET', SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const pathname = req.nextUrl.pathname;

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isPublic) {
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.redirect(new URL('/', req.url));
    } catch (e) {
      const res = NextResponse.next();
      res.cookies.set('accessToken', '', { maxAge: 0 });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/recipe/:path*'],
};
