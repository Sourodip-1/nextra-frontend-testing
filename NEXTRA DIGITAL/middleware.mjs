// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('admin-auth')?.value;

  if (url.pathname.startsWith('/dashboard')) {
    if (token !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*'],
};
