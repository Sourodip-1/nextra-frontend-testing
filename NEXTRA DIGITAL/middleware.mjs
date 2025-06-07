// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('admin-auth')?.value;

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (token !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
