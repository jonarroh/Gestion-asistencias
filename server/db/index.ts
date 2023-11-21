import { db } from './db';
import { eq, sql } from 'drizzle-orm';
import * as schema from './schema';

const matricula = '12345';
const password = '12345';

const user = await db
	.select()
	.from(schema.persona)
	.innerJoin(sql`alumno`, sql`alumno.clave_persona = persona.clave`)
	.where(sql`matricula = ${matricula}`);

console.log(user);
