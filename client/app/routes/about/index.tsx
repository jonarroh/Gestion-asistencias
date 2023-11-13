import {
	ActionFunction,
	LoaderFunction,
	json
} from '@remix-run/node';
import {
	Form,
	Link,
	useActionData,
	useLoaderData,
	useNavigation
} from '@remix-run/react';

interface User {
	nombre: string;
	apellido: string;
}

const users = [
	{
		nombre: 'Juan',
		apellido: 'Perez'
	},
	{
		nombre: 'Pedro',
		apellido: 'Perez'
	},
	{
		nombre: 'Maria',
		apellido: 'Perez'
	}
];

export const loader: LoaderFunction = async ({ request }) => {
	return json(users, { status: 200 });
};

export const action: ActionFunction = async ({ request }) => {
	const body = new URLSearchParams(await request.text());
	const nombre = body.get('nombre');
	const apellido = body.get('apellido');
	if (!nombre || !apellido)
		return json({ error: 'Faltan datos' }, { status: 400 });

	const user = {
		nombre,
		apellido
	};

	users.push(user);

	return json(users, { status: 200 });
};

function index() {
	const data = useLoaderData() as User[];
	const errors = useActionData<typeof action>();
	const navigation = useNavigation();

	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen py-2">
				<h1 className="text-4xl text-center text-red-500"> About</h1>

				<Form
					method="post"
					className="flex flex-row items-center justify-center h-14">
					<label className="block">
						Nombre
						<input
							type="text"
							className="border border-gray-400 p-2 rounded-md"
							name="nombre"
						/>
					</label>

					<label className="block">
						Apellido
						<input
							type="text"
							className="border border-gray-400 p-2 rounded-md"
							name="apellido"
						/>
					</label>
					{errors && (
						<div className="text-red-500">{errors.error}</div>
					)}

					<button
						type="submit"
						className="bg-blue-500 text-white p-2 rounded-md">
						{navigation.state === 'submitting'
							? 'Enviando...'
							: 'Enviar'}
					</button>
				</Form>

				<Link to="/">Home</Link>
				<hr />
				{data.map((user, index) => (
					<div key={index}>
						<p>{user.nombre}</p>
						<p>{user.apellido}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default index;
