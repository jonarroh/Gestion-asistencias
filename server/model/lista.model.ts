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
}
