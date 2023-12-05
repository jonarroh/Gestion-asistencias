export interface Listas {
	lista: Lista[];
	docentePersona: DocentePersona[];
	materia: Especialidad[];
	periodo: Periodo[];
	grupo: Grupo[];
	especialidad: Especialidad[];
	alumnos: Alumno[];
}

export interface Alumno {
	alumno: Docente[];
	persona: Persona[];
}

export interface Docente {
	clave: number;
	clave_persona: number;
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
	matricula?: string;
}

export interface DocentePersona {
	docente: Docente;
	persona: Persona;
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
	clave_docente: number;
	clave_especialidad: number;
	clave_materia: number;
	dias_descanso: string;
	dias_Vacaciones: string;
	horas_clase: string;
	dias_clase: string;
	horario_clase: null;
	clave_periodo: number;
	clave_grupo: number;
}

export interface Periodo {
	clave: number;
	nombre: string;
	fecha_inicio: Date;
	fecha_fin: Date;
	infoPeriodo: null;
}
