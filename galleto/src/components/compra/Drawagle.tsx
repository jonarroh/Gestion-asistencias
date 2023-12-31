import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import { useCookieStore } from '@/store/cookieStore';
import { useFormState } from '@/store/useFormState';
import { useVentaStore } from '@/store/ventaStore';
import { Pencil, Trash } from 'lucide-react';
import ModalCompra from '@/components/ui/venta-modal';

function Drawagle({
	children,
	pathname
}: {
	children: React.ReactNode;
	pathname?: string;
}) {
	const { setListaGalletas, listaGalletas } = useVentaStore();
	const { setCurrentCookie } = useCookieStore();
	const { setTypeVentas, setCantidades, setIdUpdate, setIsUpdate } =
		useFormState();

	const handleDeleteByIndex = (index: number) => {
		const newState = listaGalletas.slice(0, index);
		newState.push(...listaGalletas.slice(index + 1));
		setListaGalletas(newState);
	};

	const handleEdit = (index: number) => {
		const galletaInfo = listaGalletas[index];
		setCantidades(galletaInfo.cantidad);
		setTypeVentas(galletaInfo.typeVenta);
		setCurrentCookie(galletaInfo.cookie);
		setIdUpdate(index);
		setIsUpdate(true);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="bg-white p-4 rounded-l-2xl shadow-2xl">
				<SheetHeader>
					<SheetTitle>Lista de compras</SheetTitle>
					<SheetDescription className="overscroll-contain overflow-y-auto max-h-[80vh]">
						{listaGalletas.length > 0 ? (
							listaGalletas.map((galleta, index) => (
								<div
									key={index}
									className="flex justify-between items-center">
									<div className="flex items-center">
										<img
											src={galleta.cookie}
											alt="Galleta seleccionada"
											width={50}
											height={50}
										/>
										<span className="text-lg font-bold ml-2">
											{galleta.typeVenta === 'caja' ? (
												<>{galleta.caja}</>
											) : (
												<>
													{galleta.cantidad} {galleta.typeVenta}
												</>
											)}
										</span>
									</div>
									<div className="flex space-x-2">
										<SheetClose asChild>
											<button onClick={() => handleEdit(index)}>
												<Pencil
													size={24}
													className="text-orange-500"
												/>
											</button>
										</SheetClose>
										<button
											onClick={() => handleDeleteByIndex(index)}
											className="text-red-500">
											<Trash size={24} />
										</button>
									</div>
								</div>
							))
						) : (
							<p className="text-center">
								No hay galletas seleccionadas
							</p>
						)}
					</SheetDescription>
				</SheetHeader>
				{pathname ? null : (
					<SheetFooter>
						<div className="flex flex-row justify-between w-full items-center  h-full ">
							<span>
								Total:
								<strong>
									{' '}
									$
									{listaGalletas.reduce(
										(acc, curr) => acc + curr.total,
										0
									)}
								</strong>
							</span>
							<ModalCompra  />
						</div>
					</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	);
}

export default Drawagle;
