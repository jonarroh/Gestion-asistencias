import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { role, roles } from '~/types';

export const loader = async ({
	params,
	request
}: LoaderFunctionArgs) => {
	console.log(params);
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

function Route() {
	const { route } = useLoaderData<typeof loader>();

	return (
		<>
			<div>
				<h1>route: {route}</h1>
			</div>
		</>
	);
}

export default Route;
