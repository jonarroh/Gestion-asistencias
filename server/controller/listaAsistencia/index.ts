import Elysia from 'elysia';
import { t } from 'elysia';
import { Lista } from '../../model/lista.model';

const lista = new Elysia({ prefix: '/lista' });

const BoduDto = t.Object({
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

lista.get('', () => {
	return 'Hola';
});

lista.post(
	'',
	async ({ body }) => {
		const {
			Docente,
			Especialidad,
			Materia,
			Periodo,
			diasClase,
			diasDescanso,
			diasVacaciones,
			horas,
			Grupo
		} = body;

		return await new Lista().insertarLista({
			clave_docente: Number(Docente),
			clave_especialidad: Number(Especialidad),
			clave_materia: Number(Materia),
			clave_periodo: Number(Periodo),
			dias_clase: diasClase,
			dias_descanso: diasDescanso,
			dias_Vacaciones: diasVacaciones,
			horas_clase: horas,
			clave_grupo: Number(Grupo)
		});
	},
	{
		body: BoduDto
	}
);

export default lista;
