export const jsonify = <T>(object: T): Response => {
	return new Response(JSON.stringify(object), {
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		}
	});
};
