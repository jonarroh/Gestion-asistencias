import { Alumno } from '@/types/listas';
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

export interface FechaHabil {
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
				for (
					let i = 0;
					i < horasClase[diasClase.indexOf(diaSemana)];
					i++
				) {
					fechasHabiles.push({
						fecha: format(fecha, 'yyyy-MM-dd'),
						horasClase: 1,
						keys: uuidv4().toString(),
						estado: 'na'
					});
				}
			}
		}
	}

	return {
		id: 0,
		fechasHabiles
	};
}
