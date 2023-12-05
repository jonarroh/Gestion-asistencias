import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';
import { authApp } from './controller/auth';
import { cors } from '@elysiajs/cors';
import periodos from './controller/periodos';
import materias from './controller/materias';
import docentes from './controller/docentes';
import especialidades from './controller/especialidades';
import grupos from './controller/grupos';
import lista from './controller/listaAsistencia';
import relleno from './controller/relleno';

const app = new Elysia()

	.use(cors())
	.use(swagger({ path: '/docs' }))
	.use(
		jwt({
			name: 'jwt',
			secret: Bun.env
				.SUPER_SECRET_VALUE_DONT_SHARE_OR_SOMEONE_WILL_BE_FIRED as string,
			exp: '7d'
		})
	)
	.use(cookie())
	.use(authApp)
	.use(periodos)
	.use(materias)
	.use(docentes)
	.use(especialidades)
	.use(grupos)
	.use(lista)
	.use(relleno)

	.listen(3001);

console.log('Server is running on port 3000');
