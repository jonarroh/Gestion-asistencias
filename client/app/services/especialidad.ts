import { Especialidad } from '~/types';

export const getEspecialidades = async (): Promise<
	Especialidad[]
> => {
	const response = await fetch(
		'http://localhost:3000/especialidades'
	);
	const data = await response.json();
	return data as Especialidad[];
};
