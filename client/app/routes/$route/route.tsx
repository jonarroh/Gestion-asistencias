import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import {
	useLoaderData,
	useRouteError,
	isRouteErrorResponse,
	Link
} from '@remix-run/react';
import { role, roles } from '~/types';
import Layout from '~/Layout/Login';
import Footer from '~/components/login/Footer';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

export const loader = async ({
	params,
	request
}: LoaderFunctionArgs) => {
	const cookiesHeader = request.headers.get('Cookie');

	// Parsear las cookies si están presentes
	if (cookiesHeader) {
		const cookies = cookiesHeader.split(';').reduce((acc, cookie) => {
			const [name, value] = cookie.trim().split('=');
			// @ts-ignore-next-line
			acc[name] = value;
			return acc;
		}, {});

		// Ahora 'cookies' es un objeto que contiene las cookies de la solicitud
		//@ts-ignore-next-line
		if (!cookies.token) return redirect('/');
	}

	if (!params.route) return json({ route: 'no route' });

	if (!roles.includes(params.route as role)) {
		throw new Response('Not found', { status: 404 });
	}

	return json({ route: params.route });
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

function Route() {
	const { route } = useLoaderData<typeof loader>();
	const errors = useRouteError();

	return (
		<>
			<div>
				<h1>route: {route}</h1>
			</div>
		</>
	);
}

export default Route;
