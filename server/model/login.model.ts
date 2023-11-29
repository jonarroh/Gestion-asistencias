import { eq, sql } from 'drizzle-orm';
import { db } from '../db/db';
import * as schema from '../db/schema';

interface LoginProps {
	matricula: string;
	password: string;
}
interface LoginResponse {
	persona: typeof schema.persona;
	alumno: typeof schema.alumno | typeof schema.escolares;
}

export class LoginModel {
	constructor() {
		const dbs = db;
	}

	Loggin = async ({ matricula, password }: LoginProps) => {
		const user = await foundUser({ matricula, password });

		if (!user) {
			return {
				status: false,
				message: 'Usuario no encontrado',
				user: null
			};
		}

		//validar si la contraseña es correcta
		const isValidate = await Bun.password.verify(
			password,
			user[0]!.persona.password as string
		);

		if (!isValidate) {
			return {
				status: false,
				message: 'Contraseña incorrecta',
				user: null
			};
		}

		if (user.length == 0) {
			return {
				status: false,
				message: 'Usuario no encontrado',
				user: null
			};
		}
		return { status: true, message: 'Usuario encontrado', user };
	};
}

async function foundUser({ matricula, password }: LoginProps) {
	console.log(matricula);
	try {
		const [alumnoResult, escolaresResult, docentesResult] =
			await Promise.all([
				db
					.select()
					.from(schema.persona)
					.innerJoin(
						schema.alumno,
						eq(schema.alumno.clave_persona, schema.persona.clave)
					)
					.where(sql`matricula = ${matricula}`),

				db
					.select()
					.from(schema.persona)
					.innerJoin(
						schema.escolares,
						eq(schema.escolares.clave_persona, schema.persona.clave)
					)
					.where(sql`matricula = ${matricula}`),
				db
					.select()
					.from(schema.persona)
					.innerJoin(
						schema.docente,
						eq(schema.docente.clave_persona, schema.persona.clave)
					)
					.where(sql`matricula = ${matricula}`)
			]);

		// Verificar si se encontró algún usuario en la primera consulta
		if (alumnoResult.length > 0) {
			return alumnoResult;
		}

		// Verificar si se encontró algún usuario en la segunda consulta
		if (escolaresResult.length > 0) {
			return escolaresResult;
		}
		console.log(docentesResult);
		// Verificar si se encontró algún usuario en la tercera consulta
		if (docentesResult.length > 0) {
			return docentesResult;
		}

		// Si no se encontró en ninguna de las consultas, puedes manejarlo según tus necesidades
		return null;
	} catch (error) {
		// Manejar errores, por ejemplo, lanzar una excepción o devolver un valor predeterminado
		console.error('Error encontrando usuario:', error);
		throw error;
	}
}
