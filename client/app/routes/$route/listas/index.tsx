import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
	console.log('loader');
	return { message: 'Hello' };
};

function route() {
	const data = useLoaderData<typeof loader>();
	const context = useOutletContext();
	console.log(context);
	console.log(data);
	return (
		<>
			<h1>{data.message}</h1>
			<p>Context: {JSON.stringify(context)}</p>
		</>
	);
}

export default route;
