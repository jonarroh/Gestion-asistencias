'use server';

export const listaAction = async (formdata: FormData) => {
	const entry = Object.fromEntries(formdata);
	console.log(entry);
};
