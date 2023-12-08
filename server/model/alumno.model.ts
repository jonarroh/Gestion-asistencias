import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';
import { Relleno } from './relleno';

export class Alumno {
	async getAlumnoByClavePersona(clave_persona: number) {
		const alumno = await db
			.select()
			.from(schema.alumno)
			.where(eq(schema.alumno.clave_persona, clave_persona));

		const grupoAlumno = await db
			.select()
			.from(schema.grupo_alumno)
			.where(eq(schema.grupo_alumno.clave_alumno, alumno[0].clave));

		const grupo = await db
			.select()
			.from(schema.grupo)
			.where(
				eq(schema.grupo.clave, Number(grupoAlumno[0].clave_grupo))
			);

		const especialidad = await db
			.select()
			.from(schema.especialidad)
			.where(
				eq(
					schema.especialidad.clave,
					Number(grupo[0].clave_especialidad)
				)
			);

		const materia = await db
			.select()
			.from(schema.materia)
			.where(
				eq(
					schema.materia.clave_especialidad,
					Number(grupo[0].clave_especialidad)
				)
			);
		const periodos = [];
		for (const mat of materia) {
			const periodo = await db
				.select()
				.from(schema.periodo)
				.where(eq(schema.periodo.clave, Number(mat.clave_periodo)));
			periodos.push(periodo[0]);
		}

		const periodo = await db
			.select()
			.from(schema.periodo)
			.where(
				eq(schema.periodo.clave, Number(materia[0].clave_periodo))
			);
		console.log(materia[0].clave_periodo);

		const relleno = await new Relleno().getRellenoByClavePersona(
			clave_persona
		);

		const relleno_alumno = relleno.filter(relleno => {
			if (relleno.key) {
				const [clave, fecha, index] = relleno.key.split('-');
				return clave === String(clave_persona);
			}
		});

		if (!relleno_alumno[0])
			return {
				...alumno[0],
				grupo: grupo,
				especialidad: especialidad[0],
				materia: materia,
				periodo: periodo,
				lista: [],
				relleno: []
			};

		// let lista = await db
		// 	.select()
		// 	.from(schema.lista_asistencia)
		// 	.where(
		// 		eq(
		// 			schema.lista_asistencia.clave_materia,
		// 			Number(
		// 		)
		// 	);

		let listas = [];
		for (const mat of materia) {
			const lista = await db
				.select()
				.from(schema.lista_asistencia)
				.where(
					eq(schema.lista_asistencia.clave_materia, Number(mat.clave))
				);
			listas.push(lista);
		}

		return {
			...alumno[0],
			grupo: grupo,
			especialidad: especialidad[0],
			materia: materia,
			periodo: periodo,
			lista: listas,
			relleno: relleno_alumno
		};
	}
}
