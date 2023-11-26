import { Periodo } from '~/types';

export const getPeriodos = async (): Promise<Periodo[]> => {
	const response = await fetch('http://localhost:3000/periodos');
	const data = await response.json();
	return data as Periodo[];
};
