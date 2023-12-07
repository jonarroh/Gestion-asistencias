import { useCookieStore } from '@/store/cookieStore';
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
import type { Cookie } from '@/types/Cookie';
const cookies: Cookie[] = [
	'/oreo.webp',
	'/plana.webp',
	'/rellena_fresa.webp',
	'/naranja.webp',
	'/relleno_vainilla.webp',
	'/relleno_naranja.webp',
	'/galletas.webp',
	'/helado.webp',
	'/oblea.webp',
	'/chispas_chocolate.webp'
];

function SelectGalleta() {
	const currentCookie = useCookieStore(state => state.currentCookie);
	const selectedCookie = useCookieStore(
		state => state.selectedCookie
	);

	return (
		<>
			<Dialog>
				<DialogTrigger className="sm:min-w-[120px] md:min-w-auto lg:min-w-[100px]" asChild>
					<Button variant="link" size={'selector'}>
						<img
							src={currentCookie}
							alt="Galleta seleccionada"
							width={"auto"}
							height={'auto'}
						/>
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-center">
							Cambiar galleta
						</DialogTitle>
						<DialogDescription className="text-center">
							Selecciona la galleta a vender
						</DialogDescription>
					</DialogHeader>
					<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4">
						{cookies.map((cookieItem, index) => (
							<div
								key={index}
								className={`flex flex-col items-center px-2 py-4 rounded-md ${
									selectedCookie === cookieItem ? 'bg-selected' : ''
								}`}>
								<Button
									variant={'link'}
									size={'selector2'}
									onClick={() =>
										useCookieStore.setState({
											selectedCookie: cookieItem
										})
									}>
									<img
										src={cookieItem}
										alt="Galleta seleccionada"
										width={75}
										height={75}
									/>
									
								</Button>
							</div>
						))}
					</section>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant={'default'}
								onClick={() =>
									useCookieStore.setState({
										currentCookie: selectedCookie
									})
								}>
								Seleccionar
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button variant="secondary">Cancelar</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default SelectGalleta;
