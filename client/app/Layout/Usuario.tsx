import Nav from '~/components/shared/Nav';

interface UsuarioProps {
	children: React.ReactNode;
	role: string;
}

function Usuario({ children, role }: UsuarioProps) {
	return (
		<>
			<Nav />
			<main className="w-full h-full grid grid-cols-12 gap-4">
				<aside className="col-span-2 bg-[#002D74] h-screen">
					asides
				</aside>
				<section className="col-span-10 bg-white h-screen px-4">
					{children}
				</section>
			</main>
		</>
	);
}

export default Usuario;
