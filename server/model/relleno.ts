import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';

type relleno = typeof schema.relleno_lista.$inferSelect;
type rellenoV2 = typeof schema.listav2.$inferSelect;

export class Relleno {
	async insertarRellenoV2(relleno: {
		clave_lista: number;
		estado: string;
		key: string;
	}) {
		try {
			const insert = await db.insert(schema.listav2).values(relleno);
			return insert;
		} catch (error) {
			console.log(error);
			return { error: error };
		}
	}

	async getRellenoV2() {
		const relleno = await db.select().from(schema.listav2);
		return relleno;
	}

	async getRellenoByLista(clave: number) {
		const relleno = await db
			.select()
			.from(schema.relleno_lista)
			.where(eq(schema.relleno_lista.clave_lista, clave));
		return relleno;
	}

	async insertarRelleno(relleno: {
		clave_lista: number;
		asistencia: string;
	}) {
		try {
			const insert = await db
				.insert(schema.relleno_lista)
				.values(relleno);
			return insert;
		} catch (error) {
			console.log(error);
			return { error: error };
		}
	}

	async overWriteRelleno(relleno: relleno) {
		const update = await db
			.update(schema.relleno_lista)
			.set({
				asistencia: relleno.asistencia
			})
			.where(eq(schema.relleno_lista.clave_lista, relleno.clave));
		return update;
	}

	async deleteAllRelleno() {
		return await db.delete(schema.relleno_lista);
	}
}
