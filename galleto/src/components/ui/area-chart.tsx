import { useDayStore } from '@/store/dayStore';
import { Card, DonutChart, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { filterDataByDate } from '../dashBoard/dashFunctions';

const cities = [
	{
		name: 'New York',
		sales: 9800
	},
	{
		name: 'Zurich',
		sales: 1398
	}
];

export default function DonutChartUsageExample2() {
	const [valuesChart, setValuesChart] = useState(cities);
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));
	const today = new Date();

	useEffect(() => {
		const filtro = SelectedDate();

		fetch('http://localhost:3001/perdidas')
			.then(res => res.json())
			.then(data => {
				const dataFiltered = filterDataByDate(data, filtro, today);

				// unir los datos en base al nombre de la galleta
				const realData: {
					name: string;
					sales: number;
					date: string;
				}[] = [];

				dataFiltered.forEach((item, index) => {
					const name = item.nombre;
					//@ts-ignore
					const sales = item.sales;

					const indexName = realData.findIndex(
						item => item.name === name
					);

					if (indexName === -1) {
						realData.push({
							date: item.fecha,
							name,
							sales
						});
					} else {
						realData[indexName].sales += sales;
					}
				});

				//@ts-ignore
				setValuesChart(dataFiltered);
			});
	}, [SelectedDate()]);

	return (
		<>
			<Card className="mx-auto h-full flex flex-col items-center justify-center">
				<Title>Perdida de galletas</Title>
				<DonutChart
					className="mt-6 mx-auto w-64 h-64"
					data={valuesChart}
					category="sales"
					index="name"
					colors={[
						'rose',
						'yellow',
						'orange',
						'indigo',
						'blue',
						'emerald',
						'green',
						'pink',
						'purple',
						'violet',
						'cyan',
						'amber'
					]}
				/>
			</Card>
		</>
	);
}
