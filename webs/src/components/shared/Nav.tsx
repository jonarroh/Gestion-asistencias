import { LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ExitAndRedirectToLogin } from '@/actions/login/exit';

function Nav({ role }: { role: string }) {
	if (role === 'escolares') {
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

	return (
		<>
			<nav></nav>
		</>
	);
}

export default Nav;
