import Elysia from 'elysia';
import { Docentes } from '../../model/docentes.model';

const docentes = new Elysia({ prefix: '/docentes' });

docentes.get('', () => {
	return new Docentes().GetDocentes();
});

export default docentes;
