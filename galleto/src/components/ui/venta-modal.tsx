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
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

async function saveVenta(galleta: any) {
	galleta.fecha = new Date().toISOString();
	//quitar el id
	delete galleta.id;

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

function Tickets() {
	const { lastListaGalletas } = useVentaStore();
	console.log({
		lastListaGalletas
	});
	return (
		<table id="historial_facturacion" style={{ display: 'none' }}>
			<thead>
				<tr>
					<th>Galleta Nombre</th>
					<th>Cantidad</th>
					<th>Tipo de venta</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{lastListaGalletas.map((galleta, index) => (
					<tr key={index}>
						<td>{galleta.nombre}</td>
						<td>{galleta.cantidad}</td>
						<td>{galleta.typeVenta}</td>
						<td>{galleta.total}</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<th>Total</th>
					<td colSpan={3}>
						{lastListaGalletas.reduce(
							(acc, curr) => acc + Number(curr.total),
							0
						)}
					</td>
				</tr>
			</tfoot>
		</table>
	);
}

const handleExport = () => {
	// Fecha y formato
	const dateNow = new Date();
	const dateFormat = format(dateNow, 'yyyy-MM-dd HH:mm');

	// Crear un nuevo documento PDF
	const doc = new jsPDF();

	// Obtener la tabla por su ID o cualquier otro selector
	const table = document.getElementById('historial_facturacion');

	// Generar el PDF a partir de la tabla y su print
	autoTable(doc, { html: '#historial_facturacion' });
	doc.autoPrint();

	// Generar PDF personalizado
	doc.save(`ticket-` + dateFormat + '.pdf');
};

function ModalCompra({ pathname }: ModalCompraProps) {
	const { toast } = useToast();

	const { listaGalletas } = useVentaStore();

	const handleVenta = async () => {
		try {
			// Utilizar map para obtener un array de promesas
			const promises = listaGalletas.map(async galleta => {
				const url = `http://localhost:3001/galletas?id=${galleta.id}`;
				const urlWithParams = new URL(url);

				const resp = await fetch(urlWithParams);
				let g = await resp.json();

				if (Number(g[0].stock) < Number(galleta.cantidad)) {
					toast({
						title: 'Error',
						description: `No hay suficiente stock de ${g[0].nombre}`,
						variant: 'destructive'
					});
					return Promise.reject(
						`No hay suficiente stock de ${g[0].nombre}`
					);
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
				console.log({ data });

				return data;
			});

			// Esperar a que todas las promesas se resuelvan
			const results = await Promise.all(promises);

			// Verificar si todas las ventas fueron exitosas
			if (results.every(result => result)) {
				toast({
					title: 'Venta exitosa',
					description: `Se vendieron ${listaGalletas.length} galletas con éxito`
				});
				console.log('lista limpia');

				// Guardar es lastListaGalletas
				useVentaStore.setState({
					lastListaGalletas: listaGalletas
				});

				// Limpiar lista de galletas
				useVentaStore.setState({ listaGalletas: [] });
				// Limpiar input
				useFormState.setState({
					cantidades: null,
					typeVentas: null,
					idUpdate: -1
				});
			} else {
				toast({
					title: 'Error',
					description: `Ocurrió un error al guardar la venta`,
					variant: 'destructive'
				});
			}
		} catch (error) {
			toast({
				title: 'Error',
				description: `Ocurrió un error al guardar la venta`
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
							<Button className="w-1/2 mx-2" onClick={handleExport}>
								Ticket
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								className="w-1/2 mx-2"
								variant={'outline_primary'}>
								Factura
							</Button>
						</DialogClose>
					</DialogFooter>
					<Tickets />
				</DialogContent>
			</Dialog>
		</>
	);
}

export default ModalCompra;
