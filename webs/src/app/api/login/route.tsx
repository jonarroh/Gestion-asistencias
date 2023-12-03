import { validateBody } from '@/schemas/login';

export async function POST(request: Request) {
	const formData = await request.formData();
	const { matricula, password } = Object.fromEntries(formData);
	console.log({ matricula, password });
	if (!matricula || !password) {
		return new Response(
			JSON.stringify({
				error: 'Matricula y contraseña son requeridos'
			}),
			{
				status: 400
			}
		);
	}
	//coverting to string
	const matriculaString = matricula.toString();
	const passwordString = password.toString();
	const validation = validateBody({
		matricula: matriculaString,
		password: passwordString
	});
	if (!validation.success) {
		return new Response(
			JSON.stringify({
				errorMatricula:
					validation.error.issues.length > 0 &&
					validation.error.issues[0].message,
				errorPassword:
					validation.error.issues.length > 1 &&
					validation.error.issues[1].message
			}),
			{
				status: 400
			}
		);
	}

	const response = await fetch(`http://localhost:3001/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ matricula, password })
	});
	const data = await response.json();
	if (data.cookie) {
		console.log(data);
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				'Set-Cookie': `user-token=${data.cookie}; path=/; HttpOnly;`
			}
		});
	}
}
