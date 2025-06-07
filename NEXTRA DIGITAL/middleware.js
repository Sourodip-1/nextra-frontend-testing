import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Apply protection only to /dashboard route
  if (url.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('admin-auth')?.value;

    if (token !== process.env.ADMIN_TOKEN) {
      url.pathname = '/login'; // redirect to custom login page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
