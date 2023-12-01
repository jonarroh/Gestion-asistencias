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
export interface Docente {
	clave: number;
}
export interface Especialidad {
	clave: number;
	nombre: string;
}

export interface Docentes {
	docente: Docente;
	persona: Persona;
}
export interface Materia {
	clave: number;
	nombre: string;
	clave_periodo: number;
	clave_especialidad: number;
}

export interface Periodo {
	clave: number;
	nombre: string;
	fecha_inicio: Date;
	fecha_fin: Date;
	infoPeriodo: null;
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

export interface Materia {
	clave: number;
	nombre: string;
	clave_periodo: number;
	clave_especialidad: number;
}
export interface Grupo {
	grupo: GrupoClass;
	materia: Materia;
}

export interface GrupoClass {
	clave: number;
	nombre: string;
	clave_especialidad: number;
	id_alumno: null;
	id_maestro: null;
	clave_periodo: null;
}

export interface Materia {}
