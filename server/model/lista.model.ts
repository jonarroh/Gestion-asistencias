import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';

type Lista_asistencia = typeof schema.lista_asistencia._.inferInsert;

export class Lista {
	async insertarLista(lista: Lista_asistencia) {
		console.log(lista);
		console.log('insertarLista');
		try {
			await db.insert(schema.lista_asistencia).values(lista);
		} catch (error) {
			console.log(error);
			return { error: error };
		}
		return { message: 'Lista creada correctamente en bd' };
	}

	async getListaByMaestro(clave: string) {
		try {
			const lista = await db
				.select()
				.from(schema.lista_asistencia)
				.where(
					eq(schema.lista_asistencia.clave_docente, Number(clave))
				);

			//hacer la union de las tablas para obtener los datos de la lista
			//unir clave docente con la clave de la tabla docente y persona

			const docentePersona = await db
				.select()
				.from(schema.docente)
				.innerJoin(
					schema.persona,
					eq(schema.docente.clave, schema.persona.clave)
				)
				.where(eq(schema.docente.clave, Number(clave)));

			const materia = await db
				.select()
				.from(schema.materia)
				.where(
					eq(schema.materia.clave, Number(lista[0].clave_materia))
				);

			const periodo = await db
				.select()
				.from(schema.periodo)
				.where(
					eq(schema.periodo.clave, Number(lista[0].clave_periodo))
				);

			const grupo = await db
				.select()
				.from(schema.grupo)
				.where(eq(schema.grupo.clave, Number(lista[0].clave_grupo)));

			console.log(
				lista[0].clave_grupo,
				'clave grupo del grupo',
				lista[0].clave_grupo
			);

			//sacar los alumnos del grupo
			const grupoAlumnos = await db
				.select()
				.from(schema.grupo_alumno)
				.where(
					eq(
						schema.grupo_alumno.clave_grupo,
						Number(lista[0].clave_grupo)
					)
				);

			console.log(grupoAlumnos, 'grupo alumnos');
			const alumnos = [];
			//sacar los datos de los alumnos y personas
			for (let i = 0; i < grupoAlumnos.length; i++) {
				const alumno = await db
					.select()
					.from(schema.alumno)
					.where(
						eq(
							schema.alumno.clave,
							Number(grupoAlumnos[i].clave_alumno)
						)
					);
				const persona = await db
					.select()
					.from(schema.persona)
					.where(
						eq(schema.persona.clave, Number(alumno[0].clave_persona))
					);
				alumnos.push({ alumno: alumno, persona: persona });
			}

			console.log(alumnos, 'alumnos');
			const especialidad = await db
				.select()
				.from(schema.especialidad)
				.where(
					eq(
						schema.especialidad.clave,
						Number(lista[0].clave_especialidad)
					)
				);

			const listaCompleta = {
				lista: lista,
				docentePersona: docentePersona,
				materia: materia,
				periodo: periodo,
				grupo: grupo,
				especialidad: especialidad,
				alumnos: alumnos
			};

			return listaCompleta;
		} catch (error) {
			console.log(error);
			return { error: error };
		}
	}
}
