import { Optional } from '@sinclair/typebox';
import { t } from 'elysia';

export const MateriaDTO = t.Object({
	idEspecialidad: t.Number()
});

export const rellenoDTO = t.Object({
	clave_lista: t.Number(),
	asistencia: t.String()
});

export const rellenoPutDTO = t.Object({
	clave_lista: t.Number(),
	asistencia: t.String(),
	clave: t.Number()
});
