type dataCookie = {
	nombre: string;
	precio: number;
	url: string;
	precioxgramo: number;
	precioBolsa: number;
	precioCaja: number;
};

export const cookieData = new Map<string, dataCookie>([
	[
		'/galleta_oreo.webp',
		{
			nombre: 'Galleta oreo',
			precio: 10,
			url: '/galleta_oreo.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/galleta(1).png',
		{
			nombre: 'Galleta de plana',
			precio: 10,
			precioxgramo: 0.1,
			url: '/galleta(1).png',
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/galleta(2).png',
		{
			nombre: 'Galleta relleno fresa',
			precio: 10,
			url: '/galleta(2).png',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/galleta(3).png',
		{
			nombre: 'Galleta narajan',
			precio: 10,
			url: '/galleta(3).png',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/galleta(4).png',
		{
			nombre: 'Galleta relleno vainilla',
			precio: 10,
			url: '/galleta(4).png',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/galleta(5).png',
		{
			nombre: 'Galleta relleno naranja',
			precio: 10,
			url: '/galleta(5).png',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/galletas.webp',
		{
			nombre: 'Galleta de decoradas',
			precio: 15,
			url: '/galletas.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/helado.webp',
		{
			nombre: 'Galleta de helado',
			precio: 10,
			url: '/helado.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/oblea.webp',
		{
			nombre: 'Galleta de oblea',
			precio: 10,
			url: '/oblea.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	],
	[
		'/pepitas-de-chocolate.png',
		{
			nombre: 'Galleta de chispas',
			precio: 10,
			url: '/pepitas-de-chocolate.png',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100
		}
	]
]);
