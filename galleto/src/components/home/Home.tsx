import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { navigate } from 'astro:transitions/client';
function Home() {
	return (
		<>
			<Card className="bg-[#1C020C] p-4">
				<div className="justify-center flex flex-col items-center">
					<h1 className="text-3xl font-bold text-center text-white my-3">
						Bienvenido a la tienda de
					</h1>
					<img
						src="/logo_dg_text.webp"
						width={'auto'}
						alt="Logo Don G"
					/>
				</div>
				<div className="mt-5">
					<h2 className="text-2xl font-bold text-center text-white my-3">
						¿Qué deseas hacer?
					</h2>

					<div className="flex flex-row text-center">
						<div className="flex flex-col items-center">
							<Button
								variant="outline_primary"
								size={'selectorFunction'}
								className="w-[250px] h-auto mx-5"
								onClick={() => navigate('/compra')}>
								<img src="/cart.svg" alt="Galleta seleccionada" />
							</Button>
							<span className="-ml-3 font-bold text-md text-white">
								Compra
							</span>
						</div>

						<div className="flex flex-col items-center">
							<Button
								variant="outline_primary"
								size={'selectorFunction'}
								className="w-[250px] h-auto mx-5">
								<img
									src="/inventroy.svg"
									alt="Galleta seleccionada"
								/>
							</Button>
							<span className="font-bold text-md text-white">
								Inventario
							</span>
						</div>

						<div className="flex flex-col items-center">
							<Button
								variant="outline_primary"
								size={'selectorFunction'}
								className="w-[250px] h-auto mx-5">
								<img src="/profits.svg" alt="Galleta seleccionada" />
							</Button>
							<span className="font-bold text-md text-white">
								Ganancias
							</span>
						</div>
					</div>
				</div>
			</Card>
		</>
	);
}

export default Home;
