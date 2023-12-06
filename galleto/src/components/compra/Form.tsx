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
import { useEffect, useRef } from 'react';
import { cookieData } from '@/lib/const';
import { useToast } from '../ui/use-toast';

export function RadioGroupForm() {
	const { typeVenta, setTypeVenta } = useTypeVenta();
	const { currentCookie } = useCookieStore();
	const {
		cantidades,
		typeVentas,
		isUpdate,
		idUpdate,
		setIsUpdate,
		setTypeVentas,
		precios,
		setPrecios
	} = useFormState();
	const { setListaGalletas } = useVentaStore();

	const formRef = useRef<HTMLFormElement>(null);
	const InputPrecio = useRef<HTMLInputElement>(null);
	const InputVallue = useRef<HTMLInputElement>(null);
	const { toast } = useToast();
	const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const json = Object.fromEntries(data.entries());

		const precio = cookieData.get(currentCookie)?.precio;
		const precioxgramo = cookieData.get(currentCookie)?.precioxgramo;
		const preciobolsa = cookieData.get(currentCookie)?.precioBolsa;
		const precioCaja = cookieData.get(currentCookie)?.precioCaja;

		const nomnbre = cookieData.get(currentCookie)?.nombre;
		let total;

		// Calcular el total de la venta
		switch (json.typeVenta) {
			case 'caja':
				total =
					json.caja === 'kilo'
						? Number(precioCaja) * 1
						: Number(precioCaja) * 0.5;
				break;
			case 'dinero':
				total = Number(precio);
				break;
			case 'pieza':
				total = Number(precio) * Number(json.cantidad);
				break;
			case 'granel':
				total = Number(precioxgramo) * Number(json.cantidad);
				break;
			case 'bolsa':
				total = Number(preciobolsa) * Number(json.cantidad);
				break;
			default:
				total = precio! * Number(json.cantidad);
				break;
		}

		const jsonTotal = { ...json, total, precio, nombre: nomnbre };

		if (!isUpdate) {
			setListaGalletas([
				...useVentaStore.getState().listaGalletas,
				jsonTotal
			]);
			toast({
				title: 'Venta añadida',
				description: 'Se ha añadido una venta a la lista'
			});
		} else {
			const lista = useVentaStore.getState().listaGalletas;
			lista[idUpdate!] = jsonTotal;
			setListaGalletas(lista);
			setIsUpdate(false);
			toast({
				title: 'Venta actualizada',
				description: 'Se ha actualizado una venta de la lista'
			});
		}

		// Limpiar el formulario
		formRef.current?.reset();

		// Limpiar el store de form
		useFormState.setState({
			cantidades: null,
			typeVentas: null,
			idUpdate: -1
		});
	};

	const handlePrecio = () => {
		const value = InputPrecio.current?.value;
		const precio = cookieData.get(currentCookie)?.precio;
		const precioxgramo = cookieData.get(currentCookie)?.precioxgramo;
		const preciobolsa = cookieData.get(currentCookie)?.precioBolsa;
		const precioCaja = cookieData.get(currentCookie)?.precioCaja;

		switch (typeVentas) {
			case 'caja':
				setPrecios(
					value === 'kilo'
						? Number(precioCaja) * 1
						: Number(precioCaja) * 0.5
				);
				break;
			case 'dinero':
				setPrecios(Number(InputVallue.current?.value));
				break;
			case 'pieza':
				setPrecios(
					Number(InputVallue.current?.value) * Number(precio)
				);
				break;
			case 'granel':
				setPrecios(
					Number(precioxgramo) * Number(InputVallue.current?.value)
				);
				break;
			case 'bolsa':
				setPrecios(
					Number(preciobolsa) * Number(InputVallue.current?.value)
				);
				break;
			default:
				setPrecios(
					Number(InputVallue.current?.value) * Number(precio)
				);
				break;
		}
	};

	useEffect(() => {
		handlePrecio();
	}, [typeVentas, cantidades]);
	return (
		<>
			<form
				ref={formRef}
				className="w-full h-full flex flex-col space-y-4 justify-center items-center"
				onSubmit={handleSumit}>
				<input name="cookie" type="hidden" value={currentCookie} />
				<RadioGroup
					defaultValue="granel"
					name="typeVenta"
					value={typeVentas ?? 'pieza'}
					onValueChange={value => {
						setTypeVentas(value as any);
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
					{typeVentas === 'caja' ? (
						<>
							<Label>
								Cantidad
								<Select name="caja">
									<SelectTrigger
										className="w-full border-orange-400"
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
									ref={InputVallue}
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
							name="precioVenta"
							readOnly
							ref={InputPrecio}
							value={precios ?? cookieData.get(currentCookie)?.precio}
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
