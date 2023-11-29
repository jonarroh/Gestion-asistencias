import { ActionFunction, LoaderFunction } from '@remix-run/node';
import {
	useLoaderData,
	useNavigate,
	useOutletContext,
	useSubmit
} from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
	console.log('loader');
	return { message: 'Hello' };
};

export const action: ActionFunction = async ({ request }) => {
	const id = await request.json();
	return { message: id };
};

function route() {
	const data = useLoaderData<typeof loader>();
	const actionData = useLoaderData<typeof action>();
	console.log(actionData);
	const submit = useSubmit();
	const context = useOutletContext();
	console.log(context);
	const navigation = useNavigate();
	console.log(data);
	return (
		<>
			<h1>{data.message}</h1>
			<p>Context: {JSON.stringify(context)}</p>
			<button
				onClick={() => {
					submit(context.id, {
						method: 'POST',
						action: '/docente/listas'
					});
				}}>
				clic
			</button>
		</>
	);
}

export default route;
