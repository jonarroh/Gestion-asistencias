import Nav from '@/components/shared/Nav';
import { Toaster } from '@/components/ui/toaster';

interface UsuarioProps {
	children: React.ReactNode;
	role: string;
}

function Usuario({ children, role }: UsuarioProps) {
	return (
		<>
			<main className="w-screen h-full grid grid-cols-12 gap-x-4">
				<aside className="col-span-2 bg-[#002D74] h-auto">
					<header className="flex items-center justify-center flex-wrap p-4 flex-col">
						<img src="/utl.png" alt="logo" width={50} height={60} />
						<div className="mt-8">
							<Nav role={role} />
						</div>
					</header>
				</aside>
				<section className="col-span-10 bg-white h-screen px-4">
					{children}
				</section>
				<Toaster />
			</main>
		</>
	);
}

export default Usuario;
