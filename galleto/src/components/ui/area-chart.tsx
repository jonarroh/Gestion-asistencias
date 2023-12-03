import { AreaChart, Card, Flex, Switch, Title } from '@tremor/react';
import { useState } from 'react';

const chartdata3 = [
	{
		date: 'Dic 23',
		Oreo: 124,
		Plana: 145,
		'Relleno de fresa': 175,
		Naranja: 75,
		'Relleno de vainilla': 140,
		'Relleno de naranja': 125,
		Decorada: 105,
		'De helado': 110,
		'De oblea': 165,
		'De chispas': 100
	},
	{
		date: 'Dic 24',
		Oreo: 110,
		Plana: 140,
		'Relleno de fresa': 120,
		Naranja: 90,
		'Relleno de vainilla': 50,
		'Relleno de naranja': 80,
		Decorada: 90,
		'De helado': 120,
		'De oblea': 150,
		'De chispas': 110
	},
	{
		date: 'Dic 25',
		Oreo: 150,
		Plana: 110,
		'Relleno de fresa': 130,
		Naranja: 100,
		'Relleno de vainilla': 90,
		'Relleno de naranja': 120,
		Decorada: 110,
		'De helado': 130,
		'De oblea': 160,
		'De chispas': 120
	},
	{
		date: 'Dic 26',
		Oreo: 130,
		Plana: 150,
		'Relleno de fresa': 170,
		Naranja: 140,
		'Relleno de vainilla': 130,
		'Relleno de naranja': 160,
		Decorada: 150,
		'De helado': 170,
		'De oblea': 200,
		'De chispas': 130
	},
	{
		date: 'Dic 27',
		Oreo: 140,
		Plana: 160,
		'Relleno de fresa': 180,
		Naranja: 150,
		'Relleno de vainilla': 140,
		'Relleno de naranja': 170,
		Decorada: 160,
		'De helado': 180,
		'De oblea': 210,
		'De chispas': 140
	},
	{
		date: 'Dic 28',
		Oreo: 150,
		Plana: 170,
		'Relleno de fresa': 190,
		Naranja: 160,
		'Relleno de vainilla': 150,
		'Relleno de naranja': 180,
		Decorada: 170,
		'De helado': 190,
		'De oblea': 220,
		'De chispas': 150
	}
];

export const AreaChartCompoment = () => {
	const [value, setValue] = useState(true);
	return (
		<Card className="mx-auto p-0">
			<div className="p-6">
				<AreaChart
					className="h-[25.95rem]  mt-4"
					data={chartdata3}
					index="date"
					categories={[
						'Oreo',
						'Plana',
						'Relleno de fresa',
						'Naranja',
						'Relleno de vainilla',
						'Relleno de naranja',
						'Decorada',
						'De helado',
						'De oblea',
						'De chispas'
					]}
					colors={[
						'neutral',
						'indigo',
						'rose',
						'orange',
						'emerald',
						'blue',
						'yellow',
						'green',
						'red',
						'pink'
					]}
					yAxisWidth={30}
					enableLegendSlider={value}
				/>
			</div>
			<div className="p-6 bg-gray-50 border-t flex items-center space-x-3 rounded-b-lg">
				<Switch
					id="switch"
					checked={value}
					onChange={() => setValue(!value)}
				/>
				<label className="text-sm text-slate-500" htmlFor="switch">
					Habilitar deslizador de leyenda
				</label>
			</div>
		</Card>
	);
};
