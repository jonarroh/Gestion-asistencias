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

function ModalCompra() {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button className="w-1/2 ml-2" variant={'default'}>
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
