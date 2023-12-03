export const POST = async (request: Request) => {
	const body = await request.json();
	console.log(body);
	const resp = await fetch('http://localhost:3000/lista', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return Response.json({ status: 200 });
};
