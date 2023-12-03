import { Docentes } from '@/types';

export const getDocentes = async (): Promise<Docentes[]> => {
	const response = await fetch('http://localhost:3001/docentes');
	const data = await response.json();
	return data as Docentes[];
};
