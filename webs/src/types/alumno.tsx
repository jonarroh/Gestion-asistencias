export interface InfoAlumno {
	clave: number;
	clave_persona: number;
	grupo: Grupo[];
	especialidad: Especialidad;
	materia: Especialidad[];
	periodo: Periodo[];
	lista: Lista[];
	relleno: Lista[];
}

export interface Especialidad {
	clave: number;
	nombre: string;
	clave_periodo: number | null;
	clave_especialidad?: number;
}

export interface Grupo {
	clave: number;
	nombre: string;
	clave_especialidad: number;
	id_alumno: null;
	id_maestro: null;
	clave_periodo: null;
}

export interface Lista {
	clave: number;
	clave_lista: number;
	estado: Estado;
	key: string;
}

export enum Estado {
	A = 'a',
	F = 'f',
	R = 'r',
	J = 'j'
}

export interface Periodo {
	clave: number;
	nombre: string;
	fecha_inicio: Date;
	fecha_fin: Date;
	infoPeriodo: null;
}
