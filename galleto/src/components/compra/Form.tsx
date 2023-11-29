import { Label } from '@/components/ui/label';
import {
	RadioGroup,
	RadioGroupItem
} from '@/components/ui/radio-group';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function RadioGroupForm() {
	return (
		<>
			<main className="w-full h-full flex flex-col space-y-4 justify-center items-center">
				<RadioGroup defaultValue="comfortable">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="default" id="r1" />
						<Label htmlFor="r1">Bolsa</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="comfortable" id="r2" />
						<Label htmlFor="r2">Gramaje</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="granel" id="r3" />
						<Label htmlFor="r3">Piezas</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="pesos" id="r4" />
						<Label htmlFor="r4">Dinero</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="caja" id="r5" />
						<Label htmlFor="r5">Caja</Label>
					</div>
				</RadioGroup>
				<div className='w-full'>
					<Label>
						Cantidad
						<Input type="number" placeholder="Cantidad" />
					</Label>
				</div>
				<div className='w-full'>
					<Label>
						Precio
						<Input type="number" placeholder="Precio" />
					</Label>
				</div>

				<div className="flex space-x-4">
					<Button>Añadir </Button>

					<Button variant={'secondary'}>Ver lista</Button>
				</div>
			</main>
		</>
	);
}
