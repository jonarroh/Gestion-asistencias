import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

type status = "activo" | "inactivo";
type role = "alumno" | "docente" | "directivo" | "padre" | "escolares";

export const persona = sqliteTable("persona", {
	clave: integer("clave").primaryKey(),
	nombre: text("nombre"),
	apellidoMaterno: text("apellidoMaterno"),
	apellidoPaterno: text("apellidoPaterno"),
	estatus: text("estatus")
		.$default(() => "activo")
		.$type<status>(),
	role: text("role")
		.$default(() => "alumno")
		.$type<role>(),
});

export const asistencia = sqliteTable("asistencia", {
	clave: integer("clave").primaryKey(),
	fecha: text("fecha"),
	asistencia: text("asistencia", { mode: "json" }),
	clave_persona: integer("clave_persona").references(() => persona.clave),
});

export const materia = sqliteTable("materia", {
	clave: integer("clave").primaryKey(),
	nombre: text("nombre"),
	clave_periodo: integer("clave_periodo").references(() => periodo.clave),
	clave_especialidad: integer("clave_especialidad").references(
		() => especialidad.clave,
	),
});

export const alumno = sqliteTable("alumno", {
	clave: integer("clave").primaryKey(),
	matricula: text("matricula"),
	materia: text("materia"),
	clave_materia: text("clave_materia"),
	clave_periodo: integer("clave_periodo").references(() => periodo.clave),
	grupo: text("grupo"),
	clave_persona: integer("clave_persona").references(() => persona.clave),
});

export const padre = sqliteTable("padre", {
	clave: integer("clave").primaryKey(),
	clave_persona: integer("clave_persona").references(() => persona.clave),
	clave_alumno: integer("clave_alumno").references(() => alumno.clave),
});

export const directivo = sqliteTable("directivo", {
	clave: integer("clave").primaryKey(),
	clave_persona: integer("clave_persona").references(() => persona.clave),
});

export const docente = sqliteTable("docente", {
	clave: integer("clave").primaryKey(),
	clave_persona: integer("clave_persona").references(() => persona.clave),
});

export const especialidad = sqliteTable("especialidad", {
	clave: integer("clave").primaryKey(),
	nombre: text("nombre"),
});

export const periodo = sqliteTable("periodo", {
	clave: integer("clave").primaryKey(),
	nombre: text("nombre"),
	fecha_inicio: text("fecha_inicio").notNull(),
	fecha_fin: text("fecha_fin").notNull(),
});

export const grupo = sqliteTable("grupo", {
	clave: integer("clave").primaryKey(),
	nombre: text("nombre"),
	clave_especialidad: integer("clave_especialidad").references(
		() => especialidad.clave,
	),
	id_alumno: integer("id_alumno").references(() => alumno.clave),
	id_maestro: integer("id_maestro").references(() => docente.clave),
	clave_periodo: integer("clave_periodo").references(() => periodo.clave),
});

export const materias_grupo = sqliteTable("materias_grupo", {
	clave: integer("clave").primaryKey(),
	clave_materia: integer("clave_materia").references(() => materia.clave),
	clave_grupo: integer("clave_grupo").references(() => grupo.clave),
	horas: real("horas"),
});
