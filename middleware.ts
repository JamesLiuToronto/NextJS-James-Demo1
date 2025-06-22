import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	// Allow access to auth pages
	if (pathname.startsWith('/auth')) {
		return NextResponse.next()
	}

	const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'

	if (!isLoggedIn) {
		const loginUrl = new URL('/auth', request.url)
		return NextResponse.redirect(loginUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next|api|static|favicon.ico).*)'],
} 