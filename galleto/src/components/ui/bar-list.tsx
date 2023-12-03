import { dataMock } from '@/mockData';
import { useDayStore } from '@/store/dayStore';
import {
	BarList,
	Bold,
	Card,
	Flex,
	Text,
	Title
} from '@tremor/react';
import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';
import { useEffect, useState } from 'react';

export default () => {
	const [valuesChart, setValuesChart] = useState(dataMock);
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));

	useEffect(() => {
		fetch('http://localhost:3001/venta')
			.then(response => response.json())
			.then(data => {
				//qudar solo con las ventas de hoy
				const hoy = new Date();
				let ventasHoy = null;
				switch (SelectedDate()) {
					case 'hoy':
						ventasHoy = data.filter((element: any) => {
							const fecha = new Date(element.fecha);
							return isSameDay(fecha, hoy);
						});
						break;
					case 'semana':
						ventasHoy = data.filter((element: any) => {
							const fecha = new Date(element.fecha);
							return isSameWeek(fecha, hoy, { weekStartsOn: 1 });
						});
						break;
					case 'mes':
						ventasHoy = data.filter((element: any) => {
							const fecha = new Date(element.fecha);
							return isSameMonth(fecha, hoy);
						});
						break;
					default:
						ventasHoy = data.filter((element: any) => {
							const fecha = new Date(element.fecha);
							return isSameDay(fecha, hoy);
						});
						break;
				}

				ventasHoy = data.filter((element: any) => {
					const fecha = new Date(element.fecha);
					return isSameMonth(fecha, hoy);
				});

				//sumar los totales de cada galleta
				let totales: number[] = [];
				let galletas: string[] = [];
				let galletasIcon: string[] = [];
				let fechaCompra: string[] = [];

				ventasHoy.forEach((element: any) => {
					if (galletas.includes(element.nombre)) {
						totales[galletas.indexOf(element.nombre)] +=
							element.total;
					} else {
						galletas.push(element.nombre);
						totales.push(element.total);
						galletasIcon.push(element.cookie);
						fechaCompra.push(element.fecha);
					}
				});

				//unir los totales con el nombre de la galleta y el icono
				let dataReal: any = [];
				for (let i = 0; i < galletas.length; i++) {
					dataReal.push({
						name: galletas[i],
						value: totales[i],
						href: '#',
						fecha: fechaCompra[i],
						nombreIcono: galletasIcon[i],
						icon: function Icon() {
							return (
								<img
									src={galletasIcon[i]}
									alt={galletas[i]}
									className="w-5 mr-2"
								/>
							);
						}
					});
				}

				setValuesChart(dataReal);
			});
	}, [SelectedDate()]);

	return (
		<Card className="text-center">
			<Title>
				Analisis de ventas{' '}
				{SelectedDate() === 'hoy'
					? 'de hoy'
					: SelectedDate() === 'semana'
					? 'de la semana'
					: 'del mes'}
			</Title>
			<Flex className="mt-4">
				<Text>
					<Bold>Galleta</Bold>
				</Text>
				<Text>
					<Bold>Ventas</Bold>
				</Text>
			</Flex>
			{valuesChart.length === 0 ? (
				<Text>No hay ventas hoy</Text>
			) : (
				<BarList data={valuesChart} className="mt-2" />
			)}
		</Card>
	);
};
