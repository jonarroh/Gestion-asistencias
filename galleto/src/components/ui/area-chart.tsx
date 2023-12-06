import { useDayStore } from '@/store/dayStore';
import { Card, DonutChart, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { filterDataByDate } from '../dashBoard/dashFunctions';

export default function DonutChartUsageExample2() {
	const [valuesChart, setValuesChart] = useState([]);
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));
	const today = new Date();
	const filtro = SelectedDate();

	useEffect(() => {
		fetch('http://localhost:3001/perdida')
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
	}, [filtro]);

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
