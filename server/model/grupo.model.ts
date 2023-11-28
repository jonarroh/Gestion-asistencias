import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';

export class Grupo {
	GetGrupo = async () => {
		return await db
			.select()
			.from(schema.grupo)
			.innerJoin(
				schema.materia,
				eq(schema.grupo.clave, schema.materia.clave)
			);
	};

	GetGrupoByEspecialidad = async (especialidad: number) => {
		return await db
			.select()
			.from(schema.grupo)
			.innerJoin(
				schema.materia,
				eq(schema.grupo.clave, schema.materia.clave)
			)
			.where(eq(schema.grupo.clave_especialidad, especialidad));
	};
}
