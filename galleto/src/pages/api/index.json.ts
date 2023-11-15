import { jsonify } from '@/lib/jsonify';
import type { APIRoute } from 'astro';

interface Api {
	message: string;
}

export const GET: APIRoute = ({ params, request }) => {
	return jsonify([
		{
			id: 1,
			name: 'John Doe',
			email: ''
		},
		{
			id: 2,
			name: 'Jane Doe',
			email: ''
		}
	]);
};
