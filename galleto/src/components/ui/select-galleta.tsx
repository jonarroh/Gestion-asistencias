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
	'/galleta.png',
	'/galleta(1).png',
	'/galleta(2).png',
	'/galleta(3).png',
	'/galleta(4).png',
	'/galleta(5).png',
	'/galletas.png',
	'/helado.png',
	'/oblea.png',
	'/pepitas-de-chocolate.png'
];

function SelectGalleta() {
	const currentCookie = useCookieStore(state => state.currentCookie);
	const selectedCookie = useCookieStore(
		state => state.selectedCookie
	);

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="link" size={'selector'}>
						<img
							src={currentCookie}
							alt="Galleta seleccionada"
							width={75}
							height={75}
						/>
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-center">
							Cambiar galleta
						</DialogTitle>
						<DialogDescription className="text-center">
							Selecciona la galleta que quieres usar
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
									size={'selector'}
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
