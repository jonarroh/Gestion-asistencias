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
						<Label htmlFor="r1">Default</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="comfortable" id="r2" />
						<Label htmlFor="r2">Comfortable</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="compact" id="r3" />
						<Label htmlFor="r3">Compact</Label>
					</div>
				</RadioGroup>
				<div>
					<Label>
						Cantidad
						<Input type="number" placeholder="Cantidad" />
					</Label>
				</div>
				<div>
					<Label>
						Precio
						<Input type="number" placeholder="Precio" />
					</Label>
				</div>

				<div className="flex space-x-4">
					<Button>Añadir </Button>

					<Button>ver lista</Button>
				</div>
			</main>
		</>
	);
}
