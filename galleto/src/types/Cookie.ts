export interface CookieStore {
	currentCookie: Cookie;
	selectedCookie: Cookie;
	placeholder: Cookie;
	setCurrentCookie: (cookie: Cookie) => void;
	setSelectedCookie: (cookie: Cookie) => void;
}
export type Cookie =
	| '/galleta.png'
	| '/galleta(1).png'
	| '/galleta(2).png'
	| '/galleta(3).png'
	| '/galleta(4).png'
	| '/galleta(5).png'
	| '/galletas.png'
	| '/helado.png'
	| '/oblea.png'
	| '/pepitas-de-chocolate.png';
