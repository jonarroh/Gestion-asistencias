import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AttendanceTable from '~/components/docentes/Tabla';
import { obtenerFechasHabiles } from '~/lib/dias';

export const loader: LoaderFunction = async () => {
	return json(MockAttendanceData);
};

const MockAttendanceData = {
	lista: [
		{
			clave: 1,
			clave_docente: 1,
			clave_especialidad: 2,
			clave_materia: 5,
			dias_descanso:
				"['2023-11-14T06:00:00.000Z','2023-11-01T06:00:00.000Z']",
			dias_Vacaciones:
				"{'from':'2022-01-20T06:00:00.000Z','to':'2022-01-24T06:00:00.000Z'}",
			horas_clase: '[3,4]',
			dias_clase: "['Ma','Mi']",
			clave_periodo: 1,
			clave_grupo: 4
		}
	],
	docentePersona: [
		{
			docente: {
				clave: 1,
				clave_persona: 2
			},
			persona: {
				clave: 1,
				nombre: 'Jorge',
				apellidoMaterno: 'Gonzalez',
				apellidoPaterno: 'Perez',
				estatus: 'activo',
				role: 'alumno',
				public_id: '1f2d92cf-1bb8-4662-9d76-c7ddd37e966b',
				password:
					'$argon2id$v=19$m=65536,t=2,p=1$3btcQwHszZT51yfMJPwUPaH9VOicSyXzZKWDdHDZ0LE$Du77EnTiZTgTbvV69PG4I7J5Ycuh+bCmFGEyu65N2ko'
			}
		}
	],
	materia: [
		{
			clave: 5,
			nombre: 'Química',
			clave_periodo: 1,
			clave_especialidad: 2
		}
	],
	periodo: [
		{
			clave: 1,
			nombre: 'Semestre 1',
			fecha_inicio: '2023-01-01',
			fecha_fin: '2023-06-30',
			infoPeriodo: null
		}
	],
	grupo: [
		{
			clave: 4,
			nombre: 'Grupo 1',
			clave_especialidad: 2,
			id_alumno: null,
			id_maestro: null,
			clave_periodo: null
		}
	],
	especialidad: [
		{
			clave: 2,
			nombre: 'Enfermería',
			clave_periodo: null
		}
	],
	alumnos: [
		{
			alumno: [
				{
					clave: 4,
					clave_persona: 11
				}
			],
			persona: [
				{
					clave: 11,
					nombre: 'uriel',
					apellidoMaterno: 'Fernandez',
					apellidoPaterno: 'Gutierrez',
					estatus: 'activo',
					role: 'alumno',
					public_id: '6d1caf2b-8bec-43ee-9649-e153cde17c78',
					password:
						'$argon2id$v=19$m=65536,t=2,p=1$niDxrc07t9O0+VPfsB4gpZLlctXNK52Whjf2wpmoD4g$XCDXrlPQePO97209I9Xu9uKCypj03ofnyw98OA68doc',
					matricula: '12351'
				}
			]
		},
		{
			alumno: [
				{
					clave: 5,
					clave_persona: 12
				}
			],
			persona: [
				{
					clave: 12,
					nombre: 'diana',
					apellidoMaterno: 'Fernandez',
					apellidoPaterno: 'Gutierrez',
					estatus: 'activo',
					role: 'alumno',
					public_id: 'a86d40da-2bfe-4ede-ad23-0297aacf6e9d',
					password:
						'$argon2id$v=19$m=65536,t=2,p=1$68IOlJTyiJ0+xRMmeK3ig0sQ8mGKWu2n5J4awFkPnpQ$6wCMhb8qcT/s16JTRms0NJT5BCejDye/uuvoMz6j4ws',
					matricula: '12352'
				}
			]
		},
		{
			alumno: [
				{
					clave: 1,
					clave_persona: 1
				}
			],
			persona: [
				{
					clave: 1,
					nombre: 'Jorge',
					apellidoMaterno: 'Gonzalez',
					apellidoPaterno: 'Perez',
					estatus: 'activo',
					role: 'alumno',
					public_id: '1f2d92cf-1bb8-4662-9d76-c7ddd37e966b',
					password:
						'$argon2id$v=19$m=65536,t=2,p=1$3btcQwHszZT51yfMJPwUPaH9VOicSyXzZKWDdHDZ0LE$Du77EnTiZTgTbvV69PG4I7J5Ycuh+bCmFGEyu65N2ko',
					matricula: '12345'
				}
			]
		}
	]
};

const App = () => {
	const data = useLoaderData<typeof MockAttendanceData>();
	console.log('data');
	console.log(data);

	const { fecha_inicio, fecha_fin } = data.periodo[0];
	let { dias_descanso, dias_Vacaciones } = data.lista[0];
	dias_descanso = dias_descanso.replace(/'/g, '"');
	dias_Vacaciones = dias_Vacaciones.replace(/'/g, '"');

	// convertir el objeto de dias vacaciones a un array string
	const diasVacacionesArray = Object.keys(
		JSON.parse(dias_Vacaciones)
	).map(key => {
		return JSON.parse(dias_Vacaciones)[key];
	});

	//el array de diasClase convertir 'L' a 'Monday', 'Ma' a 'Tuesday' etc
	const diasClaseArray = JSON.parse(
		data.lista[0].dias_clase.replace(/'/g, '"')
	).map((dia: string) => {
		switch (dia) {
			case 'L':
				return 'Monday';
			case 'Ma':
				return 'Tuesday';
			case 'Mi':
				return 'Wednesday';
			case 'J':
				return 'Thursday';
			case 'V':
				return 'Friday';
			case 'S':
				return 'Saturday';
			case 'D':
				return 'Sunday';
			default:
				return dia;
		}
	});

	const fechaHabiles = obtenerFechasHabiles({
		diasClase: diasClaseArray,
		diasDescanso: JSON.parse(dias_descanso.replace(/'/g, '"')),
		diasVacaciones: diasVacacionesArray,
		fechaInicio: fecha_inicio,
		fechaFin: fecha_fin,
		horasClase: JSON.parse(
			data.lista[0].horas_clase.replace(/'/g, '"')
		)
	});

	fechaHabiles.id = data.lista[0].clave;
	const fechas = fechaHabiles.fechasHabiles;

	return (
		<div>
			<h1>Lista de Asistencia</h1>
			<AttendanceTable
				//@ts-ignore
				alumnos={data.alumnos}
				fechasHabiles={fechas}
				claveLista={fechaHabiles.id}
			/>
		</div>
	);
};

export default App;
