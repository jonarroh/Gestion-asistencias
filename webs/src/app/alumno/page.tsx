import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as jwt from 'jsonwebtoken';
import { InfoAlumno } from '@/types/alumno';
import Usuario from '@/Layout/Usuario';
import HeaderDatos from '@/components/shared/HeaderDatos';
import BusquedaAlumno from '@/components/docente/BusquedaAlumno';

export const getJWT = () => {
	const cookieStore = cookies();
	const userToken = cookieStore.get('user-token');

	if (!userToken) {
		redirect('/');
	}

	try {
		const decoded = jwt.decode(userToken!.value);
		if (decoded) {
			return decoded as {
				user: string;
				exp: number;
			};
		} else {
			redirect('/');
		}
	} catch (error) {
		redirect('/');
	}
};

export const getInfoAlumnoByClave =
	async (): Promise<InfoAlumno | null> => {
		let route = getJWT();
		const clave = JSON.parse(route.user).persona.clave;
		try {
			const response = await fetch(`http://localhost:3001/alumno`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					clave_persona: String(clave)
				})
			}).then(res => res.json());

			return response;
		} catch (error) {
			console.log('error en getInfoAlumnoByClave');
			console.log({ error });
			return null;
		}
	};

async function page() {
	const infoAlumno = await getInfoAlumnoByClave();
	let route = getJWT();

	const rol = JSON.parse(route!.user).persona.role;
	const nombre = JSON.parse(route!.user).persona.nombre;
	const matricula = JSON.parse(route!.user).persona.matricula;
	return (
		<>
			<Usuario role="alumno">
				<HeaderDatos
					role={rol}
					nombre={nombre}
					matricula={matricula}
				/>
				<BusquedaAlumno info={infoAlumno!} />
			</Usuario>
		</>
	);
}

export default page;
