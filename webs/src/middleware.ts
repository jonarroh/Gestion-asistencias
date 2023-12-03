import { NextRequest } from 'next/server';

export const config = {
	matcher: ['/escolares']
};

export function middleware(request: NextRequest) {
	const { cookies } = request;
	// Verificar si la cookie con el JWT está presente
	const jwtCookie = cookies.get('user-token');

	if (!jwtCookie) {
		// Si no hay cookie, respondemos con un error de autenticación
		return Response.redirect('http://localhost:3000/');
	}

	return;
}
