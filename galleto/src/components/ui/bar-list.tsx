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
import { useEffect, useState } from 'react';
import {
	fetchData,
	filterDataByDate,
	sumTotals
} from '../dashBoard/dashFunctions';

export default () => {
	const [valuesChart, setValuesChart] = useState(dataMock);
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));
	const today = new Date();

	useEffect(() => {
		const filtro = SelectedDate();
		console.log(filtro);
		fetchData().then(data => {
			const filteredData = filterDataByDate(data, filtro, today);
			const chartData = sumTotals(filteredData);
			setValuesChart(chartData);
		});
	}, [SelectedDate()]);

	return (
		<Card className="text-center h-full">
			<Title>
				Analisis de ventas{' '}
				{SelectedDate() === 'hoy'
					? 'de hoy'
					: SelectedDate() === 'semana'
					? 'de la semana'
					: SelectedDate() === 'mes'
					? 'del mes'
					: 'generales'}
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
