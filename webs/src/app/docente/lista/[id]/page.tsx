import AttendanceTable from '@/components/shared/TablaReportes';
import { obtenerFechasHabiles } from '@/lib/dias';
import { Alumno, Listas } from '@/types/listas';
import { id } from 'date-fns/locale';

const getListasByID = async (id: string) => {
	const response = await fetch(`http://localhost:3001/lista/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ clave: String(id) })
	});
	const data = await response.json();
	return data as Promise<Listas>;
};

async function page({ params }: { params: { id: string } }) {
	const listas = await getListasByID(params.id);
	let fechas: {
		fecha: string;
		horasClase: number;
		keys: string;
		estado: string;
		alumnos: Alumno[];
	}[] = [];
	const isNewList = await fetch(
		`http://localhost:3001/relleno/${params.id}`
	).then(res => res.json());

	if (isNewList.length === 0) {
		const { fecha_inicio, fecha_fin } = listas.periodo[0];
		let { dias_descanso, dias_Vacaciones } = listas.lista[0];
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
			listas.lista[0].dias_clase.replace(/'/g, '"')
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
			fechaInicio: fecha_inicio.toString(),
			fechaFin: fecha_fin.toString(),
			horasClase: JSON.parse(
				listas.lista[0].horas_clase.replace(/'/g, '"')
			),
			alumnos: listas.alumnos
		});

		fechaHabiles.id = listas.lista[0].clave;
		fechas = fechaHabiles.fechasHabiles;
		console.log('no existen las fechas');

		const url = 'http://localhost:3001/relleno';

		const requestData = {
			clave_lista: Number(params.id),
			asistencia: JSON.stringify(fechas)
		};

		try {
			const resp = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestData)
			});

			if (!resp.ok) {
				throw new Error(
					`Error en la solicitud: ${resp.status} ya que ${resp.statusText}`
				);
			}

			console.log('Datos insertados correctamente');
		} catch (error) {
			console.error('Error al realizar la solicitud:', error);
		}
	} else {
		fechas = JSON.parse(isNewList[0].asistencia);
		console.log('ya existen las fechas');
	}
	console.log(fechas);
	return (
		<>
			<h2>{`Docente ${params.id}`}</h2>
			<AttendanceTable
				alumnos={listas.alumnos}
				fechasHabiles={fechas}
				claveLista={Number(params.id)}
			/>
		</>
	);
}

export default page;
