import { obtenerFechasHabiles } from '~/lib/dias';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '~/components/ui/table';
import {
	format,
	parseISO,
	eachDayOfInterval,
	addDays,
	subDays
} from 'date-fns';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Alumno = {
	clave: number;
	persona: {
		clave: number;
		nombre: string;
		apellidoPaterno: string;
		apellidoMaterno: string;
		estatus: string;
		role: string;
		public_id: string;
		password: string;
		matricula: string;
	}[];
};

type AttendanceTableProps = {
	fechasHabiles: {
		fecha: string;
		horasClase: number;
	}[];
	alumnos: Alumno[];
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
	fechasHabiles,
	alumnos
}) => {
	const fechasOrdenadas = fechasHabiles;

	const [currentStartDate, setCurrentStartDate] = useState<string>(
		fechasOrdenadas[0].fecha
	);

	const getColumnDates = () => {
		const columnDates: Date[] = [];
		let currentDate = parseISO(currentStartDate);

		for (let i = 0; i < 12; i++) {
			const matchingDate = fechasOrdenadas.find(
				item =>
					parseISO(item.fecha).getTime() === currentDate.getTime()
			);

			if (matchingDate) {
				for (let j = 0; j < matchingDate.horasClase; j++) {
					columnDates.push(currentDate);
				}
			}

			currentDate = addDays(currentDate, 1);
		}

		return columnDates;
	};

	const visibleDates = getColumnDates();

	const handlePrevButtonClick = () => {
		const newStartDate = subDays(parseISO(currentStartDate), 12);
		setCurrentStartDate(format(newStartDate, 'yyyy-MM-dd'));
	};

	const handleNextButtonClick = () => {
		const newStartDate = addDays(parseISO(currentStartDate), 12);
		setCurrentStartDate(format(newStartDate, 'yyyy-MM-dd'));
	};

	return (
		<div>
			<Table>
				<TableCaption>
					Lista de asistencia para las fechas seleccionadas.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Nombre</TableHead>
						{visibleDates.map((date, index) => (
							<TableHead key={uuidv4()}>
								{format(date, 'dd/MM/yyyy')}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{alumnos.map(alumno => (
						<TableRow key={alumno.clave}>
							<TableCell className="font-medium">{`${alumno.persona[0].nombre} ${alumno.persona[0].apellidoPaterno}`}</TableCell>
							{visibleDates.map((date, index) => (
								<TableCell key={uuidv4()}>
									{/* Aquí puedes mostrar el estado de la asistencia para este alumno y fecha */}
									{/* Puedes usar las fechas de asistencia proporcionadas y verificar si el alumno asistió */}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={1}>Total</TableCell>
						{visibleDates.map((date, index) => (
							<TableCell key={uuidv4()}>
								{/* Puedes mostrar aquí el total de asistencias para cada fecha */}
							</TableCell>
						))}
					</TableRow>
				</TableFooter>
			</Table>

			<div>
				<button onClick={handlePrevButtonClick}>Anterior</button>
				<button onClick={handleNextButtonClick}>Siguiente</button>
			</div>
		</div>
	);
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
	const attendanceData = MockAttendanceData.alumnos;
	const { fecha_inicio, fecha_fin } = MockAttendanceData.periodo[0];
	let { dias_descanso, dias_Vacaciones } =
		MockAttendanceData.lista[0];
	dias_descanso = dias_descanso.replace(/'/g, '"');
	dias_Vacaciones = dias_Vacaciones.replace(/'/g, '"');

	// Ahora, diasDescansoArray debería ser un array de objetos Date
	console.log(JSON.parse(dias_descanso));
	// convertir el objeto de dias vacaciones a un array string
	const diasVacacionesArray = Object.keys(
		JSON.parse(dias_Vacaciones)
	).map(key => {
		return JSON.parse(dias_Vacaciones)[key];
	});

	//el array de diasClase convertir 'L' a 'Monday', 'Ma' a 'Tuesday' etc
	const diasClaseArray = JSON.parse(
		MockAttendanceData.lista[0].dias_clase.replace(/'/g, '"')
	).map(dia => {
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
	console.log(diasClaseArray);

	console.log(diasVacacionesArray);
	console.log({
		fecha_fin,
		fecha_inicio
	});

	const fechaHabiles = obtenerFechasHabiles({
		diasClase: diasClaseArray,
		diasDescanso: JSON.parse(dias_descanso.replace(/'/g, '"')),
		diasVacaciones: diasVacacionesArray,
		fechaInicio: fecha_inicio,
		fechaFin: fecha_fin,
		horasClase: JSON.parse(
			MockAttendanceData.lista[0].horas_clase.replace(/'/g, '"')
		)
	});
	console.log(fechaHabiles);

	return (
		<div>
			<h1>Lista de Asistencia</h1>
			<AttendanceTable
				alumnos={MockAttendanceData.alumnos}
				fechasHabiles={fechaHabiles}
			/>
		</div>
	);
};

export default App;
