import { z } from 'zod';

export const bodySchema = z.object({
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

export function validateBody({
	matricula,
	password
}: {
	matricula: string;
	password: string;
}) {
	return bodySchema.safeParse({ matricula, password });
}
