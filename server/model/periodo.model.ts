import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';
export class Periodo {
	GetPeriodos = async () => {
		const periodos = await db.select().from(schema.periodo);
		return periodos;
	};
}
