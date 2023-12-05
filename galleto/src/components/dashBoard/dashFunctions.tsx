import { isAfter, isSameDay, subMonths, subWeeks } from 'date-fns';

export interface VentaData {
	cookie: string;
	typeVenta: string;
	cantidad: string;
	precio: number;
	total: number;
	nombre: string;
	fecha: string;
	id: number;
}
export interface VentaData2 {
	cookie: string;
	typeVenta: string;
	cantidad: string;
	precio: number;
	sales: number;
	nombre: string;
	fecha: string;
	id: number;
}

export const fetchData = async (): Promise<VentaData[]> => {
	const response = await fetch('http://localhost:3001/venta');
	const data: VentaData[] = await response.json();
	return data;
};

export const filterDataByDate = (
	data: VentaData[],
	date: string,
	today: Date
): VentaData[] => {
	switch (date) {
		case 'hoy':
			return data.filter(element =>
				isSameDay(new Date(element.fecha), today)
			);

		case 'semana':
			const oneWeekAgo = subWeeks(today, 1);
			return data.filter(element => {
				const fecha = new Date(element.fecha);
				return isAfter(fecha, oneWeekAgo);
			});

		case 'mes':
			const oneMonthAgo = subMonths(today, 1);
			return data.filter(element => {
				const fecha = new Date(element.fecha);
				return isAfter(fecha, oneMonthAgo);
			});

		case 'day':
			return data;
	}

	return data;
};

export const sumTotals = (salesData: VentaData[]): any[] => {
	const totales: Record<string, number> = {};
	const dataReal: any[] = [];

	salesData.forEach(element => {
		const { nombre, total, cookie, fecha } = element;

		if (totales[nombre]) {
			totales[nombre] += total;
		} else {
			totales[nombre] = total;
			dataReal.push({
				name: nombre,
				value: total,
				href: '#',
				fecha,
				nombreIcono: cookie,
				icon: () => (
					<img src={cookie} alt={nombre} className="w-5 mr-2" />
				)
			});
		}
	});

	return dataReal;
};
