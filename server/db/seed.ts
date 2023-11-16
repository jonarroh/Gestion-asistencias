import { db } from "./db";
import * as schema from "./schema";

// Insertar personas en la tabla 'persona'
await db.insert(schema.persona).values([
	{
		nombre: "Jorge",
		apellidoMaterno: "Gonzalez",
		apellidoPaterno: "Perez",
		estatus: "activo",
		role: "alumno",
	},
	{
		nombre: "Maria",
		apellidoMaterno: "Rodriguez",
		apellidoPaterno: "Lopez",
		estatus: "activo",
		role: "docente",
	},
	{
		nombre: "Pedro",
		apellidoMaterno: "Martinez",
		apellidoPaterno: "Gomez",
		estatus: "activo",
		role: "directivo",
	},
	{
		nombre: "Ana",
		apellidoMaterno: "Hernandez",
		apellidoPaterno: "Diaz",
		estatus: "activo",
		role: "padre",
	},
	{
		nombre: "Carlos",
		apellidoMaterno: "Fernandez",
		apellidoPaterno: "Gutierrez",
		estatus: "activo",
		role: "escolares",
	},
]);

// Insertar en la tabla 'asistencia'
await db.insert(schema.asistencia).values({
	fecha: "2023-11-16",
	asistencia: '{"asistencia": "presente"}',
	clave_persona: 1,
});

// Insertar en la tabla 'alumno'
await db.insert(schema.alumno).values({
	matricula: "12345",
	materia: "Matemáticas",
	clave_materia: "Materia1",
	periodo: "Periodo1",
	grupo: "Grupo1",
	clave_persona: 1,
});

// Insertar en la tabla 'padre'
await db.insert(schema.padre).values({
	clave_persona: 4,
	clave_alumno: 1,
});

// Insertar en la tabla 'directivo'
await db.insert(schema.directivo).values({
	clave_persona: 3,
});

// Insertar en la tabla 'docente'
await db.insert(schema.docente).values({
	clave_persona: 2,
});

// Insertar en la tabla 'materias'
await db.insert(schema.materia).values({
	nombre: "Física",
	periodo: "Periodo1",
	clave_especialidad: "Especialidad1",
});

// Insertar en la tabla 'especialidad'
await db.insert(schema.especialidad).values({
	nombre: "Ingeniería",
});

// Insertar en la tabla 'periodo'
await db.insert(schema.periodo).values({
	nombre: "Semestre 1",
	fecha_inicio: "2023-01-01",
	fecha_fin: "2023-06-30",
});

// Insertar en la tabla 'grupo'
await db.insert(schema.grupo).values({
	nombre: "Grupo1",
	clave_especialidad: "Especialidad1",
	id_alumno: 1,
	id_maestro: 1,
	periodo: "Periodo1",
});

// Insertar en la tabla 'materias_grupo'
await db.insert(schema.materias_grupo).values({
	clave_grupo: 1,
	horas: 3.5,
});
