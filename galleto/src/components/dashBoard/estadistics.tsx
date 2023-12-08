import { Card, Grid, Metric, Text, Col } from '@tremor/react';
import { CardTremor } from '../ui/card-tremor';
import { useEffect, useState } from 'react';
import { useDayStore } from '@/store/dayStore';
import { filterDataByDate, type VentaData } from './dashFunctions';
import type { Inventario } from '@/pages/inventario/index.astro';
import { CircleDollarSign } from 'lucide-react';

const stadistic = [
	{
		title: 'Perdida',
		metric: '0.5'
	},
	{
		title: 'Galleta mas vendida',
		metric: '0.5'
	},
	{
		title: 'Ganancia',
		metric: '0.5'
	}
];
const getVentas = async () => {
	const res = await fetch('http://localhost:3001/venta');
	const data = await res.json();
	return data as Promise<VentaData[]>;
};
async function getInventario() {
	const res = await fetch('http://localhost:3001/galletas');
	const inventario = await res.json();
	return inventario as Promise<Inventario[]>;
}

function Estadistics() {
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));
	const today = new Date();
	const filtro = SelectedDate();
	const [Stadistics, setStadistics] = useState(stadistic);

	const infoVentas: {
		nombre: string;
		ganancias: number;
		cantidad: number;
	}[] = [];

	useEffect(() => {
		let maxName: { title: string; sales: number } = {
			title: '',
			sales: 0
		};
		fetch('http://localhost:3001/perdida')
			.then(res => res.json())
			.then(data => {
				getInventario().then(data2 => {
					const dataFiltered = filterDataByDate(data, filtro, today);
					//tomar el valor con mayor perdida y el nombre de la galleta
					const max = Math.max(
						//@ts-ignore
						...dataFiltered.map(item => item.sales)
					);
					const maxNames = dataFiltered.find(
						//@ts-ignore
						item => item.sales === max
					);
					if (dataFiltered.length > 0)
						maxName = {
							title: `Perdida de ${maxNames!.nombre}`,
							sales: max
						};
					else maxName = { title: 'No hay perdidas', sales: 0 };
					let galletaAgotada = data2.find(item => item.stock <= 10);
					let ganancias = 0;
					data2.forEach(item => {
						getVentas().then(data => {
							const dataFiltered2 = filterDataByDate(
								data,
								filtro,
								today
							);

							ganancias = dataFiltered2.reduce(
								(acc, venta) => acc + venta.total,
								0
							);
							infoVentas.push({
								nombre: item.nombre,
								ganancias: ganancias,
								cantidad: item.stock
							});
							setStadistics([
								{
									title: 'Ganancias',
									metric: `${ganancias}`
								},
								{
									title: `${maxName.title}`,
									metric: `${maxName.sales}`
								},
								{
									title: 'Galleta por agotarse o agotada',
									metric: `${
										galletaAgotada?.nombre ??
										'No hay galletas agotadas'
									}`
								}
							]);
						});
					});
				});
			});
	}, [SelectedDate()]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 '>
			<div className='col-start-1 col-span-12 md:col-start-1 md:col-span-12 '>
				<div className="flex flex-row md:flex-row md:flex">
					<Grid numItemsSm={3} numItemsLg={3} numItemsMd={3} className="w-full gap-4">
						{Stadistics.map(item => (
							<Card key={item.title}>
								<Text>{item.title}</Text>
								<Metric>{item.metric}</Metric>
							</Card>
						))}
					</Grid>
				</div>
			</div>
		</div>
	);
}

export default Estadistics;
