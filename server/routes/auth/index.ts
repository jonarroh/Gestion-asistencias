import { Elysia, t } from 'elysia';

import { cookie } from '@elysiajs/cookie';
import { jwt } from '@elysiajs/jwt';
import { isModuleBody } from 'typescript';

interface IUser {
	id: string;
	name: string;
	password: string;
}

const SignDTO = t.Object({
	name: t.String(),
	password: t.String()
});

const users = [
	{
		name: 'Jury',
		password: '1234',
		id: '1'
	},
	{
		name: 'Jane',
		password: '5678',
		id: '2'
	},
	{
		name: 'Joe',
		password: '9012',
		id: '3'
	},
	{
		name: 'liz',
		password: 'liz',
		id: '4'
	}
];

export const authApp = new Elysia({ prefix: '/auth' })
	.use(cookie())
	.use(
		jwt({
			name: 'jwt',
			secret: Bun.env
				.SUPER_SECRET_VALUE_DONT_SHARE_OR_SOMEONE_WILL_BE_FIRED as string,
			exp: '7d'
		})
	)
	.post(
		'/login',
		async ({ body, set, setCookie, jwt, cookie }) => {
			const user = users.find(
				user =>
					user.name === body.name && user.password === body.password
			);
			if (!user) {
				set.status = 401;
				return {
					message: 'User not found'
				};
			}
			setCookie(
				'auth',
				await jwt.sign({
					name: user.name
				}),
				{
					httpOnly: true,
					maxAge: 7 * 86400
				}
			);

			return {
				message: 'Logged in',
				cokie: cookie.auth
			};
		},
		{
			body: SignDTO
		}
	)
	.get(
		'/sign/:id',
		async ({ params: { id }, jwt, cookie, setCookie }) => {
			setCookie(
				'auth',
				await jwt.sign({
					secret: Bun.env
						.SUPER_SECRET_VALUE_DONT_SHARE_OR_SOMEONE_WILL_BE_FIRED as string
				}),
				{
					httpOnly: true,
					maxAge: 7 * 86400
				}
			);

			return {
				message: `Hello ${id} ${cookie.auth}`
			};
		}
	)
	.get('/signout', ({ cookie, setCookie }) => {
		setCookie('auth', '', {
			httpOnly: true,
			maxAge: 0
		});
		return {
			message: 'Sign out'
		};
	});
