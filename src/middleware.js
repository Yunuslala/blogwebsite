// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  if (!token) {
    // Redirect to the login page if the token is not present
    return NextResponse.redirect(new URL('/Auth/SignIn', request.url));
  }

  // Continue to the requested page if the token is present
  return NextResponse.next();
}

export const config = {
  matcher: ['/Post', '/Post/:id'], // Add paths you want to protect
};
