import { Elysia, t } from 'elysia';

import { cookie } from '@elysiajs/cookie';
import { jwt } from '@elysiajs/jwt';
import { SignDTO } from '../../dto/Login';
import { LoginModel } from '../../model/login.model';

const loginModel = new LoginModel();

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
			try {
				const { message, status, user } = await loginModel.Loggin({
					matricula: body.matricula,
					password: body.password
				});
				if (!user) {
					set.status = 401;
					return {
						message: {
							message,
							status
						}
					};
				}
				const LoggedUser = user[0]!;

				setCookie(
					'auth',
					await jwt.sign({
						user: JSON.stringify(LoggedUser)
					}),
					{
						httpOnly: true,
						maxAge: 7 * 86400
					}
				);

				return {
					message: 'Logged in',
					cookie: cookie.auth,
					user: LoggedUser
				};
			} catch (err) {
				console.log(err);
				set.status = 500;
				return {
					message: 'Internal server error',
					status: 500
				};
			}
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
