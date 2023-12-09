import Usuario from '@/Layout/Usuario';
import { getDocentes } from '../services/docentes';
import { getEspecialidades } from '../services/especialidad';
import { getMaterias } from '../services/materia';
import { getPeriodos } from '../services/periodos';
import HeaderDatos from '@/components/shared/HeaderDatos';
import PanelCrearLista from '@/components/escolares/PanelCrearLista';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { Card, CardHeader } from '@/components/ui/card';

async function getData() {
	const [docentes, materias, especialidades, periodos] =
		await Promise.all([
			getDocentes(),
			getMaterias(),
			getEspecialidades(),
			getPeriodos()
		]);
	return { docentes, materias, especialidades, periodos };
}

export const getJWT = () => {
	const cookieStore = cookies();
	const userToken = cookieStore.get('user-token');

	if (!userToken) {
		redirect('/');
	}

	try {
		const decoded = jwt.decode(userToken.value) as {
			user: string;
			exp: number;
		};
		if (decoded) {
			const role = JSON.parse(decoded.user).persona.role;
			if (role !== 'escolares') {
				redirect('/');
			}
			return decoded;
		} else {
			redirect('/');
		}
	} catch (error) {
		redirect('/');
	}
};

async function Role() {
	const { docentes, materias, especialidades, periodos } =
		await getData();
	console.log({
		docentes,
		materias,
		especialidades,
		periodos
	});
	let route = getJWT();

	return (
		<>
			<div className="w-screen h-screen grid-cols-18 ">
				<Usuario role="escolares">
					<HeaderDatos
						role={JSON.parse(route.user).persona.role}
						nombre={JSON.parse(route.user).persona.nombre}
						matricula={JSON.parse(route.user).persona.matricula}
					/>
					<Card>
						<CardHeader className="flex flex-col  w-full">
							<div className="flex flex-row items-center justify-between w-full">
								<p className="text-2xl font-bold">Bienvenido</p>
								<p className="text-xl text-gray-500">
									<span>
										{' '}
										{JSON.parse(route.user).persona.nombre}
									</span>
								</p>
								<p>Crea tus listas de asistencia para los docentes</p>
							</div>
						</CardHeader>
					</Card>
					<PanelCrearLista
						docentes={docentes}
						especialidades={especialidades}
						grupos={[]}
						materias={materias}
						periodos={periodos}
					/>
				</Usuario>
			</div>
		</>
	);
}

export default Role;
