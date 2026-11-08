import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '').split(':')[0];
  if (host === 'links.stephenadei.nl' && req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/en/links', req.url));
  }
  return intl(req);
}

export const config = {
  matcher: '/((?!api|trpc|q|_next|_vercel|.*\\..*).*)',
};
