import {
	differenceInDays,
	addDays,
	isSunday,
	parse,
	isWithinInterval,
	isSameDay,
	subDays,
	format
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

interface FechaHabil {
	fechaInicio: string;
	fechaFin: string;
	diasVacaciones: string[];
	diasDescanso: string[];
	diasClase: string[];
	horasClase: number[];
	id?: number;
}

export function obtenerFechasHabiles({
	fechaInicio,
	fechaFin,
	diasVacaciones,
	diasDescanso,
	diasClase,
	horasClase
}: FechaHabil) {
	const fechasHabiles = [];

	// Crear un rango de fechas entre fechaInicio y fechaFin
	const rangoFechas = [];
	let fechaActual = parse(fechaInicio, 'yyyy-MM-dd', new Date());
	const fechaFinDate = parse(fechaFin, 'yyyy-MM-dd', new Date());

	while (fechaActual <= fechaFinDate) {
		rangoFechas.push(fechaActual);
		fechaActual = addDays(fechaActual, 1);
	}

	// Filtrar fechas excluyendo domingos, días de vacaciones y días de descanso
	for (const fecha of rangoFechas) {
		if (
			!isSunday(fecha) &&
			!diasVacaciones.some(vacacion =>
				isSameDay(parse(vacacion, 'yyyy-MM-dd', new Date()), fecha)
			) &&
			!diasDescanso.some(descanso =>
				isSameDay(parse(descanso, 'yyyy-MM-dd', new Date()), fecha)
			)
		) {
			const diaSemana = format(fecha, 'EEEE'); // Obtener el nombre del día de la semana
			if (diasClase.includes(diaSemana)) {
				// Agregar solo las fechas con clases y horas de clase
				fechasHabiles.push({
					fecha: format(fecha, 'yyyy-MM-dd'),
					horasClase: horasClase[diasClase.indexOf(diaSemana)],
					keys: uuidv4().toString(),
					estado: 's'
				});
			}
		}
	}

	return {
		id: 0,
		fechasHabiles
	};
}

// Ejemplo de uso
const fechaInicio = '2023-01-01';
const fechaFin = '2023-06-30';
const diasVacaciones = [
	'2022-01-20T06:00:00.000Z',
	'2022-01-24T06:00:00.000Z'
];
const diasDescanso = [
	'2023-11-14T06:00:00.000Z',
	'2023-11-01T06:00:00.000Z'
];
const diasClase = ['Wednesday', 'Friday']; // Por ejemplo, lunes, miércoles y viernes
const horasClase = [2, 3]; // Horas de clase correspondientes a los días de la semana

const fechasHabiles = obtenerFechasHabiles({
	id: 0,
	fechaInicio,
	fechaFin,
	diasVacaciones,
	diasDescanso,
	diasClase,
	horasClase
});

console.log('Fechas hábiles:', fechasHabiles);
