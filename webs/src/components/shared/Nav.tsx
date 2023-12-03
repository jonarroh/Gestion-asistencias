import { CalendarDays, FileSpreadsheet, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ExitAndRedirectToLogin } from '@/actions/login/exit';

function Nav({ role, path }: { role: string; path: string }) {
	if (role === 'docente') {
		return (
			<>
				<nav className="text-white">
					<ul>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200">
							<form action={ExitAndRedirectToLogin}>
								<Button className="flex items-center bg-transparent hover:bg-transparent">
									<LogOut size={24} className="me-4" /> Cerrar sesión
								</Button>
							</form>
						</li>
					</ul>
				</nav>
			</>
		);
	}

	if (role === 'escolares') {
		return (
			<>
				<nav className="text-white">
					<ul className="flex flex-col w-full justify-start items-start">
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200 flex-row">
							<Link href="/escolares">
								<FileSpreadsheet size={24} className="my-4" /> Crear
								lista
							</Link>
						</li>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200 flex-row">
							<Link href="/escolares/lista">
								<CalendarDays size={24} className="my-4" /> Revisar
								listas
							</Link>
						</li>
						<li className="flex items-center rounded-md hover:bg-blue-950  transition-colors duration-200">
							<form action={ExitAndRedirectToLogin}>
								<Button className="flex items-center bg-transparent hover:bg-transparent m-0 p-0">
									<LogOut size={24} className="my-4" /> Cerrar sesión
								</Button>
							</form>
						</li>
					</ul>
				</nav>
			</>
		);
	}

	return (
		<>
			<nav></nav>
		</>
	);
}

export default Nav;
