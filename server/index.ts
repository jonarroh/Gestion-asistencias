import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';
import { authApp } from './routes/auth';
import { cors } from '@elysiajs/cors';
import periodos from './routes/periodos';
import materias from './routes/materias';
import docentes from './routes/docentes';
import especialidades from './routes/especialidades';

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

	.get('/home', async ({ jwt, set, cookie: { auth } }) => {
		const profile = await jwt.verify(auth);
		if (!profile) {
			set.status = 401;
			return {
				message: 'Unauthorized'
			};
		}
		return {
			message: 'Hello World from home'
		};
	})
	.get('/', () => {
		return {
			message: 'Hello World'
		};
	})
	.listen(3000);

console.log('Server is running on port 3000');
