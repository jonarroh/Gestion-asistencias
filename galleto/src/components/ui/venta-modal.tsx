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

function ModalCompra() {
	const { toast } = useToast();
	const { listaGalletas } = useVentaStore();

	const handleVenta = () => {
		try {
			listaGalletas.forEach(async galleta => {
				const data = await saveVenta(galleta);
				console.log({ data });
			});
			toast({
				title: 'Venta exitosa',
				description: `Se vendieron ${listaGalletas.length} galletas con exito`
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: `Ocurrio un error al guardar la venta`
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
						disabled={listaGalletas.length === 0}
						onClick={() => {
							handleVenta();
						}}>
						Vender
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
