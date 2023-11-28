import Elysia from 'elysia';
import { Grupo } from '../../model/grupo.model';
import { GrupoDTO } from '../../dto/Grupo';
import jwt from '@elysiajs/jwt';
import { isLogged } from '../../utils/logged';

const grupos = new Elysia({ prefix: '/grupo' });

grupos

	.use(
		jwt({
			name: 'jwt',
			secret: Bun.env
				.SUPER_SECRET_VALUE_DONT_SHARE_OR_SOMEONE_WILL_BE_FIRED as string,
			exp: '7d'
		})
	)
	.get('', () => {
		return new Grupo().GetGrupo();
	})
	.post(
		'/:idEspecialidad',
		({ body }) => {
			return new Grupo().GetGrupoByEspecialidad(body.idEspecialidad);
		},
		{
			body: GrupoDTO
		}
	);

export default grupos;
