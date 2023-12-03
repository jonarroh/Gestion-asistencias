const getListasByID = async (id: string) => {
	const response = await fetch(`http://localhost:3001/lista/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ clave: String(id) })
	});
	const data = await response.json();
	return data;
};

async function page({ params }: { params: { id: string } }) {
	const listas = await getListasByID(params.id);
	console.log({ listas });
	return (
		<>
			<h2>{`Docente ${params.id}`}</h2>
			{JSON.stringify(listas)}
		</>
	);
}

export default page;
