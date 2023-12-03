import { z } from 'zod';
export async function GET(request: Request) {
	return Response.json({ message: 'Hello world' });
}
const bodySchema = z.object({
	matricula: z
		.string()
		.min(5, { message: 'Matricula debe tener al menos 5 caracteres' })
		.refine(data => /^\d+$/.test(data), {
			message: 'Matricula solo puede contener numeros'
		}),
	password: z.string().min(5, {
		message: 'Contraseña debe tener al menos 5 caracteres'
	})
});

function validateBody({
	matricula,
	password
}: {
	matricula: string;
	password: string;
}) {
	return bodySchema.safeParse({ matricula, password });
}

export async function POST(request: Request) {
	const formData = await request.formData();
	const { matricula, password } = Object.fromEntries(formData);
	if (!matricula || !password) {
		return {
			status: 400,
			body: {
				error: 'Faltan datos'
			}
		};
	}
	//coverting to string
	const matriculaString = matricula.toString();
	const passwordString = password.toString();
	const validation = validateBody({
		matricula: matriculaString,
		password: passwordString
	});
	if (!validation.success) {
		return {
			status: 400,
			body: {
				errorMatricula:
					validation.error.issues.length > 0 &&
					validation.error.issues[0].message,
				errorPassword:
					validation.error.issues.length > 1 &&
					validation.error.issues[1].message
			}
		};
	}

	const response = await fetch(`http://localhost:3001/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ matricula, password })
	});

	if (response.status === 200) {
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				'Set-Cookie': `token=${data.cookie}; path=/; HttpOnly;`
			}
		});
	}
}
