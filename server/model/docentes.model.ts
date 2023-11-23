import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';

export class Docentes {
	GetDocentes = async () => {
		return await db
			.select()
			.from(schema.persona)
			.innerJoin(
				schema.docente,
				eq(schema.docente.clave_persona, schema.persona.clave)
			);
	};
}
