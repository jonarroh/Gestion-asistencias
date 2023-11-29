import { t } from 'elysia';

export const BoduDto = t.Object({
	Docente: t.String(),
	Especialidad: t.String(),
	Materia: t.String(),
	Periodo: t.String(),
	diasClase: t.String(),
	diasDescanso: t.String(),
	diasVacaciones: t.String(),
	horas: t.String(),
	Grupo: t.String()
});
