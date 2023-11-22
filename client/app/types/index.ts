export type role =
	| 'alumno'
	| 'docente'
	| 'directivo'
	| 'padre'
	| 'escolares';

export const roles = [
	'alumno',
	'docente',
	'directivo',
	'padre',
	'escolares'
] as const;

export interface Usuario {
	persona: Persona;
	alumno: Alumno;
}

export interface Alumno {
	clave: number;
}

export interface Persona {
	clave: number;
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	estatus: string;
	role: string;
	public_id: string;
	password: string;
	matricula: string;
}
