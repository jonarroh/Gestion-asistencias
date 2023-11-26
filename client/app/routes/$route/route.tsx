import {
	ActionFunction,
	LoaderFunctionArgs,
	json,
	redirect
} from '@remix-run/node';
import {
	useLoaderData,
	useRouteError,
	isRouteErrorResponse,
	Link,
	useFetchers,
	useNavigation
} from '@remix-run/react';
import {
	type Docentes,
	Usuario,
	role,
	roles,
	Materia,
	Especialidad,
	Periodo
} from '~/types';
import Layout from '~/Layout/Login';
import Footer from '~/components/login/Footer';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import UsuarioLayout from '~/Layout/Usuario';
import HeaderDatos from '~/components/shared/HeaderDatos';

import PanelCrearLista from '~/components/escolares/PanelCrearLista';
import { getEspecialidades } from '~/services/especialidad';
import { getDocentes } from '~/services/docentes';
import { getMaterias } from '~/services/materia';
import { getPeriodos } from '~/services/periodos';
import {
	parseCookies,
	verifyTokenAndGetPayload
} from '~/lib/cookies';

// Función principal del loader
export const loader = async ({
	params,
	request
}: LoaderFunctionArgs) => {
	const cookiesHeader = request.headers.get('Cookie');

	if (!cookiesHeader) return redirect('/');

	const cookies = parseCookies(cookiesHeader);

	if (!cookies || !cookies.token) return redirect('/');
	if (!params.route) return json({ route: 'no route' });
	if (!roles.includes(params.route as role)) {
		throw new Response('Not found', { status: 404 });
	}

	const secret = 'Super secret value';

	try {
		const payload = verifyTokenAndGetPayload(cookies.token, secret);

		const { user } = payload;
		const usuario = JSON.parse(user) as Usuario;
		if (usuario.persona.role !== params.route) return redirect('/');

		const [docentes, materias, especialidades, periodos] =
			await Promise.all([
				getDocentes(),
				getMaterias(),
				getEspecialidades(),
				getPeriodos()
			]);

		return json({
			route: params.route,
			userData: payload,
			docentes: JSON.stringify(docentes),
			materias: JSON.stringify(materias),
			especialidades: JSON.stringify(especialidades),
			periodos: JSON.stringify(periodos)
		});
	} catch (error) {
		// Manejar errores de verificación de token
		console.error(error);
		return redirect('/');
	}
};

export function ErrorBoundary() {
	const caught = useRouteError();

	if (isRouteErrorResponse(caught)) {
		return (
			<>
				<Layout>
					<section className="flex flex-col items-center justify-center w-full h-full ">
						<Card className="w-[400px] h-[400px] md:w-[575px] md:h-[438px]  justify-center flex-row ">
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
								<p className="text-2xl font-bold text-center text-gray-500 ">
									{caught.status === 404
										? 'Pagina no encontrada'
										: 'Error desconocido'}
								</p>
								<p className="text-center ">
									<Link to="/" className="mt-4 text-blue-500  ">
										Regresar al inicio
									</Link>
								</p>
							</CardContent>
						</Card>
					</section>
				</Layout>
				<Footer />
			</>
		);
	}
}

export const action: ActionFunction = async ({ request }) => {
	const body = await request.json();
	console.log(body);
	const resp = await fetch('http://localhost:3000/lista', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	console.log(resp);

	return json({ status: 200 });
};

function Route() {
	const {
		route,
		userData,
		docentes: docentesData,
		materias: materiasData,
		especialidades: especialidadesData,
		periodos: periodosData
	} = useLoaderData() as {
		route: role;
		userData: { user: string };
		especialidades: string | Especialidad[];
		docentes: string | Docentes[];
		materias: string | Materia[];
		periodos: string | Periodo[];
	};

	const navigation = useNavigation();
	console.log(navigation);

	const { user } = userData;
	const usuario = JSON.parse(user) as Usuario;
	const docentes = JSON.parse(docentesData as string);
	const materias = JSON.parse(materiasData as string);
	const especialidades = JSON.parse(especialidadesData as string);
	const periodos = JSON.parse(periodosData as string);

	return (
		<>
			<UsuarioLayout role={route}>
				<HeaderDatos
					role={route}
					nombre={usuario.persona.nombre}
					matricula={usuario.persona.matricula}
				/>
				{route === 'escolares' ? (
					<PanelCrearLista
						docentes={docentes}
						especialidades={especialidades}
						grupos={[]}
						materias={materias}
						periodos={periodos}
					/>
				) : null}
			</UsuarioLayout>
		</>
	);
}

export default Route;
