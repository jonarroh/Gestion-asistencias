'use server';

import { z } from 'zod';
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

async function validateBody({
	matricula,
	password
}: {
	matricula: string;
	password: string;
}) {
	return bodySchema.safeParse({ matricula, password });
}

export const handleFormAction = async (formData: FormData) => {
	'use server';
	const matricula = formData.get('matricula');
	const password = formData.get('password');

	if (!matricula || !password) {
		return {
			status: 400,
			body: {
				error: 'Faltan datos'
			}
		};
	}
};
