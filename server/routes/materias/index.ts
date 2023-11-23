import Elysia from 'elysia';
import { Materias } from '../../model/materias.model';

const materias = new Elysia({ prefix: '/materias' });

materias.get('', () => {
	return new Materias().GetMaterias();
});

export default materias;
