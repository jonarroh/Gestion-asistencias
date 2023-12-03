import Elysia from 'elysia';
import { Lista } from '../../model/lista.model';
import { BoduDto } from '../../dto/lista';

const lista = new Elysia({ prefix: '/lista' });

lista.get('/docente/:clave', ({ params: { clave } }) => {
	console.log(clave);
	return new Lista().getListaByMaestro(clave);
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

lista.get('/ids', () => new Lista().getIds());

export default lista;
