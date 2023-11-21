import {
	json,
	type ActionFunction,
	type MetaFunction,
	redirect
} from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import Login from '~/Layout/Login';
import Footer from '~/components/login/Footer';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { UserCircle2, Loader2 } from 'lucide-react';
import { z } from 'zod';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Login' },
		{ name: 'description', content: 'Login' }
	];
};

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

export const action: ActionFunction = async ({ request }) => {
	const body = new URLSearchParams(await request.text());
	const matricula = body.get('matricula');
	const password = body.get('password');
	if (!matricula || !password)
		return json({ error: 'Faltan datos' }, { status: 400 });

	const validation = validateBody({ matricula, password });
	if (!validation.success) {
		return json(
			{
				errorMatricula:
					validation.error.issues.length > 0 &&
					validation.error.issues[0].message,
				errorPassword:
					validation.error.issues.length > 1 &&
					validation.error.issues[1].message
			},
			{ status: 400 }
		);
	}
	const response = await fetch(`http://localhost:3000/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ matricula, password })
	});

	if (response.status === 200) {
		const data = await response.json();
		return redirect(`/${data.user.persona.role}`, {
			headers: {
				'Set-Cookie': `token=${data.cookie}; path=/; HttpOnly`
			}
		});
	}
	return json({ error: 'Credenciales incorrectas' }, { status: 400 });
};

export default function Index() {
	const errors = useActionData<typeof action>();

	const navigation = useNavigation();

	return (
		<>
			<Login>
				<div className="flex items-center justify-center w-full h-[80vh] text-white ">
					<Card className="w-[400px] h-[400px] md:w-[575px] md:h-[438px]  justify-center flex-row">
						<CardHeader>
							<img
								src="/logo_utl.png"
								alt="logo"
								className="self-center"
								width={84.12}
								height={100}
							/>
						</CardHeader>
						<CardContent>
							<Form method="POST">
								<div className="my-4">
									<Label htmlFor="matricula" className="font-bold">
										Matricula
									</Label>
									<Input
										type="text"
										name="matricula"
										placeholder="Matricula"
									/>
									{errors && errors.errorMatricula && (
										<div className="text-red-500">
											{errors.errorMatricula}
										</div>
									)}
								</div>
								<div className="my-4">
									<label htmlFor="password" className="font-bold">
										Contraseña
									</label>

									<Input
										type="password"
										name="password"
										placeholder="Contraseña"
									/>
									{errors && errors.errorPassword && (
										<div className="text-red-500">
											{errors.errorPassword}
										</div>
									)}
								</div>
								{errors && errors.error === 'Faltan datos' && (
									<div className="text-red-500">{errors.error}</div>
								)}
								{errors &&
									errors.error === 'Credenciales incorrectas' && (
										<div className="text-red-500">{errors.error}</div>
									)}

								<div className="my-4">
									<Button
										type="submit"
										className="bg-[#62B595] hover:bg-[#468b71] text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full">
										{navigation.state === 'submitting' ? (
											<>
												<Loader2
													size={24}
													className="
												animation-spin
												"
												/>
											</>
										) : (
											<>
												<UserCircle2 size={24} />
												<span className="ms-4">Iniciar Sesión</span>
											</>
										)}
									</Button>
								</div>
							</Form>
						</CardContent>
					</Card>
				</div>
			</Login>
			<Footer />
		</>
	);
}
