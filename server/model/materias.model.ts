import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';
export class Materias {
	GetMaterias = async () => {
		const materias = await db.select().from(schema.materia);
		return materias;
	};
}
