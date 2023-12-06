import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './dialog';
import { Button } from './button';
import { useVentaStore } from '@/store/ventaStore';
import { useToast } from './use-toast';
import { useFormState } from '@/store/useFormState';
import { dataMock } from '@/mockData';

async function saveVenta(galleta: any) {
	galleta.fecha = new Date().toISOString();

	const response = await fetch('http://localhost:3001/venta', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(galleta)
	});
	const data = await response.json();
	return data;
}

interface ModalCompraProps {
	pathname?: string;
}

function ModalCompra({ pathname }: ModalCompraProps) {
	const { toast } = useToast();

	const { listaGalletas } = useVentaStore();
	const { setCantidad } = useVentaStore();
	console.log(listaGalletas);
	console.log(listaGalletas.length === 0);

	const handleVenta = () => {
		try {
			listaGalletas.forEach(async galleta => {
				const url = `http://localhost:3001/galletas?id=${galleta.id}`;
				const urlWithParams = new URL(url);

				//obtener el objeto con nombre de la galleta
				const resp = await fetch(urlWithParams);
				let g = await resp.json();
				//validar que la cantidad no sea mayor al stock
				if (Number(g[0].stock) < Number(galleta.cantidad)) {
					toast({
						title: 'Error',
						description: `No hay suficiente stock de ${g[0].nombre}`,
						variant: 'destructive'
					});
					return;
				}

				const newCantidad = g[0].stock - Number(galleta.cantidad);

				g[0].stock = newCantidad;

				const response = await fetch(
					`http://localhost:3001/galletas/${galleta.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(g[0])
					}
				);

				const data = await saveVenta(galleta);

				if (data) {
					toast({
						title: 'Venta exitosa',
						description: `Se vendieron ${listaGalletas.length} galletas con exito`
					});
				} else {
					toast({
						title: 'Error',
						description: `Ocurrio un error al guardar la venta`,
						variant: 'destructive'
					});
				}
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: `Ocurrio un error al guardar la venta`
			});
		}
	};

	const handleGalletas2 = async () => {
		try {
			listaGalletas.forEach(async galleta => {
				const url = `http://localhost:3001/galletas?id=${galleta.id}`;
				const urlWithParams = new URL(url);

				//obtener el objeto con nombre de la galleta
				const resp = await fetch(urlWithParams);
				let g = await resp.json();

				const newCantidad = g[0].stock + Number(galleta.cantidad);

				g[0].stock = newCantidad;

				const response = await fetch(
					`http://localhost:3001/galletas/${galleta.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(g[0])
					}
				);
				const dataResponse = await response.json();
				if (dataResponse) {
					toast({
						title: 'Galleta actualizada',
						description: `Se actualizo la cantidad de ${g[0].nombre} a ${newCantidad}`
					});

					//limpiar lista de galletas
					useVentaStore.setState({ listaGalletas: [] });
					//limpiar input
					useFormState.setState({
						cantidades: null,
						typeVentas: null,
						idUpdate: -1
					});
				} else {
					toast({
						title: 'Error',
						description: `Ocurrio un error al actualizar la galleta`,
						variant: 'destructive'
					});
				}
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: `Ocurrio un error al actualizar la galleta`,
				variant: 'destructive'
			});
		}
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						className="w-1/2 ml-2"
						variant={'default'}
						disabled={listaGalletas.length === 0 ?? true}
						onClick={() => {
							// handleVenta();
							if (pathname == null) {
								handleVenta();
								return;
							}
							handleGalletas2();
						}}>
						{pathname == null ? 'Vender' : 'Guardar'}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
					<DialogHeader>
						<DialogTitle className="text-2xl text-bold text-center">
							Venta
						</DialogTitle>
						<DialogDescription className="text-center">
							Selecciona lo que deseas generar
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button className="w-1/3 mx-2">Generar Ticket</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								className="w-1/3 mx-2"
								variant={'outline_primary'}>
								Factura
							</Button>
						</DialogClose>
						<DialogClose>
							<Button className=" mx-2" variant={'secondary'}>
								Cancelar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default ModalCompra;
