import Elysia from 'elysia';
import { Especialidades } from '../../model/especialidades.model';

const especialidades = new Elysia({ prefix: '/especialidades' });

especialidades.get('', () => {
	return new Especialidades().GetEspecialidades();
});

export default especialidades;
