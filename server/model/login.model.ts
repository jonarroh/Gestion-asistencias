import { eq, sql } from 'drizzle-orm';
import { db } from '../db/db';
import * as schema from '../db/schema';

interface LoginProps {
	matricula: string;
	password: string;
}
interface LoginResponse {
	persona: typeof schema.persona;
	alumno: typeof schema.alumno;
}

export class LoginModel {
	constructor() {
		const dbs = db;
	}

	Loggin = async ({ matricula, password }: LoginProps) => {
		const user = await db
			.select()
			.from(schema.persona)
			.innerJoin(
				schema.alumno,
				eq(schema.alumno.clave_persona, schema.persona.clave)
			)
			.where(sql`matricula = ${matricula}`);

		console.log(user);
		console.log('password');

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
