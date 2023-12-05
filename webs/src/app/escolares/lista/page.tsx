import Usuario from '@/Layout/Usuario';
import { cookies } from 'next/headers';
// import { getJWT } from '@/app/escolares/page';
import * as jwt from 'jsonwebtoken';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import HeaderDatos from '@/components/shared/HeaderDatos';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

export interface ListaAsistencia {
	lista: Lista[];
	docentePersona: DocentePersona[];
	materia: Especialidad[];
	periodo: Periodo[];
	grupo: Grupo[];
	especialidad: Especialidad[];
	alumnos: Alumno[];
}

export interface Alumno {
	alumno: Docente[];
	persona: Persona[];
}

export interface Docente {
	clave: number;
	clave_persona: number;
}

export interface Persona {
	clave: number;
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	estatus: string;
	role: string;
	public_id: string;
	password: string;
	matricula?: string;
}

export interface DocentePersona {
	docente: Docente;
	persona: Persona;
}

export interface Especialidad {
	clave: number;
	nombre: string;
	clave_periodo: number | null;
	clave_especialidad?: number;
}

export interface Grupo {
	clave: number;
	nombre: string;
	clave_especialidad: number;
	id_alumno: null;
	id_maestro: null;
	clave_periodo: null;
}

export interface Lista {
	clave: number;
	clave_docente: number;
	clave_especialidad: number;
	clave_materia: number;
	dias_descanso: string;
	dias_Vacaciones: string;
	horas_clase: string;
	dias_clase: string;
	clave_periodo: number;
	clave_grupo: number;
}

export interface Periodo {
	clave: number;
	nombre: string;
	fecha_inicio: Date;
	fecha_fin: Date;
	infoPeriodo: null;
}

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

async function getListasByClave() {
	let route = getJWT();

	console.log({ route });

	const clave = JSON.parse(route!.user).escolares.clave;

	console.log({ clave });

	const response = (await fetch(`http://localhost:3001/lista/3`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ clave: String(clave) })
	}).then(res => res.json())) as Promise<ListaAsistencia>;

	return response;
}

async function Page() {
	const listas = await getListasByClave();

	let route = getJWT();

	console.log({ route });

	const usuario = JSON.parse(route!.user).docente;
	const rol = JSON.parse(route!.user).persona.role;
	const nombre = JSON.parse(route!.user).persona.nombre;
	const matricula = JSON.parse(route!.user).persona.matricula;

	console.log({ usuario });
	return (
		<>
			<Usuario role="docente">
				<HeaderDatos
					role={rol}
					nombre={nombre}
					matricula={matricula}
				/>
				<Card className="w-full h-auto flex flex-col items-center">
					<CardHeader>
						<CardTitle>Lista de asistencia</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-start w-full ">
						{listas.lista == null && (
							<>
								<p className="text-2xl text-center">
									No tienes listas de asistencia
								</p>
								<p className="text-2xl text-center">
									Contacta con escolares para que asigne una lista de
									asistencia
								</p>
							</>
						)}
						{listas.lista?.map((lista, index) => {
							return (
								<div key={index} className="[text-wrap:balance]">
									<Link
										href={`/docente/lista/${lista.clave}`}
										className="mb-2 hover:text-blue-500 transition-colors duration-200">
										<li>
											{' Lista de '}
											{
												listas.materia.find(
													materia =>
														materia.clave === lista.clave_materia
												)?.nombre
											}{' '}
											{
												listas.grupo.find(
													grupo => grupo.clave === lista.clave_grupo
												)?.nombre
											}
											{' periodo '}
											{
												listas.periodo.find(
													periodo =>
														periodo.clave === lista.clave_periodo
												)?.nombre
											}
										</li>
									</Link>
								</div>
							);
						})}
					</CardContent>
				</Card>
			</Usuario>
		</>
	);
}

export default Page;
