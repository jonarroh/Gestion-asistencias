export interface CookieStore {
	currentCookie: Cookie;
	selectedCookie: Cookie;
	placeholder: Cookie;
	setCurrentCookie: (cookie: Cookie) => void;
	setSelectedCookie: (cookie: Cookie) => void;
}
export type Cookie =
	| '/galleta_oreo.webp'
	| '/galleta(1).png'
	| '/galleta(2).png'
	| '/galleta(3).png'
	| '/galleta(4).png'
	| '/galleta(5).png'
	| '/galletas.webp'
	| '/helado.webp'
	| '/oblea.webp'
	| '/pepitas-de-chocolate.png';
