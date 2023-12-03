import {
	Card,
	Flex,
	Metric,
	ProgressBar,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Text
} from '@tremor/react';

interface CardTremorProps {
	title: string;
	metric: string;
	gallera1: string;
	gallera2: string;
	gallera3: string;
	moneyGalleta1: string;
	moneyGalleta2: string;
	moneyGalleta3: string;
	porcentajeGalleta1: string;
	porcentajeGalleta2: string;
	porcentajeGalleta3: string;
}

interface CardTremor {
	contenido: CardTremorProps;
}

export const CardTremor = ({ contenido }: CardTremor) => {
	return (
		<Card>
			<Text>{contenido.title}</Text>
			<Metric>{contenido.metric}</Metric>
			<TabGroup>
				<TabList className="mt-8">
					<Tab>Día</Tab>
					<Tab>Semana</Tab>
					<Tab>Mes</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<div className="mt-10">
							<Flex className="mt-4">
								<Text className="w-full">{contenido.gallera1}</Text>
								<Flex className="space-x-2" justifyContent="end">
									<Text>{contenido.moneyGalleta1}</Text>
									<Text>{contenido.porcentajeGalleta1}</Text>
								</Flex>
							</Flex>
							<ProgressBar
								value={parseInt(contenido.porcentajeGalleta1)}
								className="mt-2"
							/>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="mt-10">
							<Flex className="mt-4">
								<Text className="w-full">{contenido.gallera2}</Text>
								<Flex className="space-x-2" justifyContent="end">
									<Text>{contenido.moneyGalleta2}</Text>
									<Text>{contenido.porcentajeGalleta2}</Text>
								</Flex>
							</Flex>
							<ProgressBar
								value={parseInt(contenido.porcentajeGalleta2)}
								className="mt-2"
							/>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="mt-10">
							<Flex className="mt-4">
								<Text className="w-full">{contenido.gallera3}</Text>
								<Flex className="space-x-2" justifyContent="end">
									<Text>{contenido.moneyGalleta3}</Text>
									<Text>{contenido.porcentajeGalleta3}</Text>
								</Flex>
							</Flex>
							<ProgressBar value={30} className="mt-2" />
						</div>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</Card>
	);
};
