import Elysia from 'elysia';
import { Periodo } from '../../model/periodo.model';

const periodos = new Elysia({ prefix: '/periodos' });

periodos.get('', () => {
	return new Periodo().GetPeriodos();
});

export default periodos;
