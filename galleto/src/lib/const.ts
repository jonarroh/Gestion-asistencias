type dataCookie = {
	nombre: string;
	precio: number;
	url: string;
	precioxgramo: number;
	precioBolsa: number;
	precioCaja: number;
	id: number;
};

export const cookieData = new Map<string, dataCookie>([
	[
		'/oreo.webp',
		{
			nombre: 'Galleta oreo',
			precio: 10,
			url: '/oreo.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100,
			id: 1
		}
	],
	[
		'/plana.webp',
		{
			nombre: 'Galleta de plana',
			precio: 10,
			precioxgramo: 0.1,
			url: '/plana.webp',
			precioBolsa: 40,
			precioCaja: 100,
			id: 2
		}
	],
	[
		'/rellena_fresa.webp',
		{
			nombre: 'Galleta relleno fresa',
			precio: 10,
			url: '/rellena_fresa.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100,
			id: 3
		}
	],
	[
		'/naranja.webp',
		{
			nombre: 'Galleta narajan',
			precio: 10,
			url: '/naranja.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100,
			id: 4
		}
	],
	[
		'/relleno_vainilla.webp',
		{
			nombre: 'Galleta relleno vainilla',
			precio: 10,
			url: '/relleno_vainilla.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100,
			id: 5
		}
	],
	[
		'/relleno_naranja.webp',
		{
			nombre: 'Galleta relleno naranja',
			precio: 10,
			url: '/relleno_naranja.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100,
			id: 6
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
			precioCaja: 100,
			id: 7
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
			precioCaja: 100,
			id: 8
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
			precioCaja: 100,
			id: 9
		}
	],
	[
		'/chispas_chocolate.webp',
		{
			nombre: 'Galleta de chispas',
			precio: 10,
			url: '/chispas_chocolate.webp',
			precioxgramo: 0.1,
			precioBolsa: 40,
			precioCaja: 100,
			id: 10
		}
	]
]);
