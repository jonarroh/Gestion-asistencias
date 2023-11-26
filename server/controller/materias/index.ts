import Elysia from 'elysia';
import { Materias } from '../../model/materias.model';
import { MateriaDTO } from '../../dto/Materia';

const materias = new Elysia({ prefix: '/materias' });

materias
	.get('', () => {
		return new Materias().GetMaterias();
	})
	.post(
		'/:idEspecialidad',
		({ body }) => {
			return new Materias().GetMateriaByEspecialidad(
				body.idEspecialidad
			);
		},
		{
			body: MateriaDTO
		}
	);

export default materias;
