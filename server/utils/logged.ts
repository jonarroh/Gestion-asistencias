export function isLogged(token: any, jwt: any) {
	console.log(token);
	if (typeof token === 'undefined') return false;
	const profile = jwt.verify(token);
	if (!profile) return false;
	return true;
}
