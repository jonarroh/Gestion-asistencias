export interface CookieStore {
	currentCookie: Cookie;
	selectedCookie: Cookie;
	placeholder: Cookie;
	setCurrentCookie: (cookie: Cookie) => void;
	setSelectedCookie: (cookie: Cookie) => void;
}
export type Cookie =
	| '/oreo.webp'
	| '/plana.webp'
	| '/rellena_fresa.webp'
	| '/naranja.webp'
	| '/relleno_vainilla.webp'
	| '/relleno_naranja.webp'
	| '/galletas.webp'
	| '/helado.webp'
	| '/oblea.webp'
	| '/chispas_chocolate.webp';
