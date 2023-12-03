import { Periodo } from '~/types';

export const getPeriodos = async (): Promise<Periodo[]> => {
	const response = await fetch('http://localhost:3001/periodos');
	const data = await response.json();
	return data as Periodo[];
};
