import { Card, Grid, Metric, Text } from '@tremor/react';
import { CardTremor } from '../ui/card-tremor';
import { useEffect } from 'react';
import { useDayStore } from '@/store/dayStore';
interface CardTremorProps {
	title: string;
	metric: string;
}
const Stadistics = [
	{
		title: 'Ganacias',
		metric: '0.5'
	},
	{
		title: 'Galleta mas vendida',
		metric: '0.5'
	},
	{
		title: 'Ganancia',
		metric: '0.5'
	},
	{
		title: 'Gananc',
		metric: '0.5'
	}
];

function Estadistics() {
	const { SelectedDate } = useDayStore(store => ({
		SelectedDate: store.SelectedDate
	}));

	useEffect(() => {}, [SelectedDate()]);

	return (
		<div className="flex flex-row space-x-4 justify-center">
			<Grid numItemsSm={4} numItemsLg={4} className="gap-6">
				{Stadistics.map(item => (
					<Card key={item.title}>
						<Text>{item.title}</Text>
						<Metric>{item.metric}</Metric>
					</Card>
				))}
			</Grid>
		</div>
	);
}

export default Estadistics;
