import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';

export class Especialidades {
	GetEspecialidades = async () => {
		const especialidades = await db
			.select()
			.from(schema.especialidad);
		return especialidades;
	};
}
