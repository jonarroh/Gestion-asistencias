import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const username = formData.get('usuario');
	const password = formData.get('password');

	if (username !== 'admin' || password !== 'admin') {
		return new Response(
			JSON.stringify({
				message: 'Usuario o contraseña incorrectos'
			}),
			{
				status: 401,
				headers: {
					'content-type': 'application/json;charset=UTF-8'
				}
			}
		);
	}

	return redirect('/home', 307);
};
