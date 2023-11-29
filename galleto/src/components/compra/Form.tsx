import { Label } from '@/components/ui/label';
import {
	RadioGroup,
	RadioGroupItem
} from '@/components/ui/radio-group';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Drawagle from './Drawagle';
import { useVentaStore } from '@/store/ventaStore';
import { useTypeVenta } from '@/store/useTypeVenta';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';
import { useCookieStore } from '@/store/cookieStore';
import { useFormState } from '@/store/useFormState';
import { ConfigLegacyKey } from 'node_modules/astro/dist/core/errors/errors-data';
import { useRef } from 'react';

export function RadioGroupForm() {
	const { typeVenta, setTypeVenta } = useTypeVenta();
	const { currentCookie } = useCookieStore();
	const { cantidades, typeVentas, isUpdate, idUpdate, setIsUpdate } =
		useFormState();
	const { setListaGalletas } = useVentaStore();

	type dataCookie = {
		nombre: string;
		precio: number;
		url: string;
	};

	const cookieData = new Map<string, dataCookie>([
		[
			'/galleta.png',
			{ nombre: 'Galleta oreo', precio: 10, url: '/galleta.png' }
		],
		[
			'/galleta(1).png',
			{
				nombre: 'Galleta de plana',
				precio: 10,
				url: '/galleta(1).png'
			}
		],
		[
			'/galleta(2).png',
			{
				nombre: 'Galleta relleno fresa',
				precio: 10,
				url: '/galleta(2).png'
			}
		],
		[
			'/galleta(3).png',
			{
				nombre: 'Galleta narajan',
				precio: 10,
				url: '/galleta(3).png'
			}
		],
		[
			'/galleta(4).png',
			{
				nombre: 'Galleta relleno vainilla',
				precio: 10,
				url: '/galleta(4).png'
			}
		],
		[
			'/galleta(5).png',
			{
				nombre: 'Galleta relleno naranja',
				precio: 10,
				url: '/galleta(5).png'
			}
		],
		[
			'/galletas.png',
			{
				nombre: 'Galleta de decoradas',
				precio: 15,
				url: '/galletas.png'
			}
		],
		[
			'/helado.png',
			{ nombre: 'Galleta de helado', precio: 10, url: '/helado.png' }
		],
		[
			'/oblea.png',
			{ nombre: 'Galleta de oblea', precio: 10, url: '/oblea.png' }
		],
		[
			'/pepitas-de-chocolate.png',
			{
				nombre: 'Galleta de chispas',
				precio: 10,
				url: '/pepitas-de-chocolate.png'
			}
		]
	]);

	const formRef = useRef<HTMLFormElement>(null);

	const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isUpdate) {
			const data = new FormData(e.currentTarget);
			const json = Object.fromEntries(data.entries());
			//en base a la cookie seleccionada, se obtiene el precio
			const precio = cookieData.get(currentCookie)?.precio;

			//en base al precio y la cantidad se obtiene el total
			const total = precio! * Number(json.cantidad);
			const nomnbre = cookieData.get(currentCookie)?.nombre;
			//se agrega el total al json
			const jsonTotal = { ...json, total, precio, nombre: nomnbre };
			//se agrega el json al store
			setListaGalletas([
				...useVentaStore.getState().listaGalletas,
				jsonTotal
			]);
		} else {
			const data = new FormData(e.currentTarget);
			const json = Object.fromEntries(data.entries());
			//en base a la cookie seleccionada, se obtiene el precio
			const precio = cookieData.get(currentCookie)?.precio;

			//en base al precio y la cantidad se obtiene el total
			const total = precio! * Number(json.cantidad);
			const nomnbre = cookieData.get(currentCookie)?.nombre;
			//se agrega el total al json
			const jsonTotal = { ...json, total, precio, nombre: nomnbre };
			//se agrega el json al store
			const lista = useVentaStore.getState().listaGalletas;
			lista[idUpdate!] = jsonTotal;
			setListaGalletas(lista);
			setIsUpdate(false);
		}
		//limpiar el formulario
		formRef.current?.reset();
		//limpiar el store de form
		useFormState.setState({
			cantidades: null,
			typeVentas: null,
			idUpdate: -1
		});
	};

	return (
		<>
			<form
				ref={formRef}
				className="w-full h-full flex flex-col space-y-4 justify-center items-center"
				onSubmit={handleSumit}>
				<input name="cookie" type="hidden" value={currentCookie} />
				<RadioGroup
					defaultValue="bolsa"
					name="typeVenta"
					value={typeVenta ?? 'bolsa'}
					onValueChange={value => {
						console.log(value);
						setTypeVenta(value as any);
					}}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="bolsa" id="bolsa" />
						<Label htmlFor="bolsa">Bolsa</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="granel" id="granel" />
						<Label htmlFor="granel">Gramaje</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="pieza" id="pieza" />
						<Label htmlFor="pieza">Piezas</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="dinero" id="dinero" />
						<Label htmlFor="dinero">Dinero</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="caja" id="caja" />
						<Label htmlFor="caja">Caja</Label>
					</div>
				</RadioGroup>
				<div className="w-full">
					{typeVenta === 'caja' ? (
						<>
							<Label>
								Cantidad
								<Select>
									<SelectTrigger
										className="w-full border-orange-400"
										name="caja"
										value={typeVentas ?? 'kilo'}>
										<SelectValue placeholder="Selecciona la caja" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Selecciona la caja</SelectLabel>
											<SelectItem value="kilo">Un kilo</SelectItem>
											<SelectItem value="1/2kilo">
												Medio kilo
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</Label>
						</>
					) : (
						<>
							<Label>
								Cantidad
								<Input
									type="number"
									placeholder="Cantidad"
									name="cantidad"
									min={1}
									onChange={e => {
										const value = e.currentTarget.value;
										useFormState.setState({
											cantidades: Number(value)
										});
									}}
									value={cantidades ?? 1}
								/>
							</Label>
						</>
					)}
				</div>
				<div className="w-full">
					<Label>
						Precio
						<Input
							type="number"
							placeholder="Precio"
							name="precio"
							readOnly
						/>
					</Label>
				</div>

				<div className="flex space-x-4">
					{isUpdate ? (
						<Button type="submit">Actualizar </Button>
					) : (
						<Button type="submit">Añadir </Button>
					)}
					<Drawagle>
						<Button variant={'secondary'} type="button">
							Ver lista
						</Button>
					</Drawagle>
				</div>
			</form>
		</>
	);
}
