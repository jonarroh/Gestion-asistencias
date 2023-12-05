import Elysia from 'elysia';
import { Relleno } from '../../model/relleno';
import { rellenoDTO, rellenoPutDTO } from '../../dto/Materia';

const relleno = new Elysia({ prefix: '/relleno' });

relleno.get(':id', ({ params: { id } }) => {
	return new Relleno().getRellenoByLista(Number(id));
});

relleno.post(
	'',
	async ({ body }) => {
		try {
			const { clave_lista, asistencia } = body;
			console.log('insertar relleno', {
				clave_lista: Number(clave_lista),
				asistencia: asistencia
			});
			return await new Relleno().insertarRelleno({
				clave_lista: Number(clave_lista),
				asistencia: asistencia
			});
		} catch (error) {
			console.log(error);
			return { error: error };
		}
	},
	{
		body: rellenoDTO
	}
);

relleno.put(
	'',
	async ({ body }) => {
		const { clave_lista, asistencia, clave } = body;
		return await new Relleno().overWriteRelleno({
			clave_lista: Number(clave_lista),
			asistencia: asistencia,
			clave: Number(clave)
		});
	},
	{
		body: rellenoPutDTO
	}
);

relleno.delete('', async () => {
	return await new Relleno().deleteAllRelleno();
});

export default relleno;
