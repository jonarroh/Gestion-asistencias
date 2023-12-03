import * as jwt from 'jsonwebtoken';
interface TokenPayload {
	user: string;
}

// Función para parsear cookies
export const parseCookies = (
	cookiesHeader: string | null
): { [key: string]: string } | null => {
	if (!cookiesHeader) return null;

	return cookiesHeader.split(';').reduce((acc, cookie) => {
		const [name, value] = cookie.trim().split('=');
		// @ts-ignore-next-line
		acc[name] = value;
		return acc;
	}, {});
};

// Función para verificar el token y obtener el payload
export const verifyTokenAndGetPayload = (
	token: string,
	secret: string
): TokenPayload => {
	return jwt.verify(token, secret) as TokenPayload;
};
