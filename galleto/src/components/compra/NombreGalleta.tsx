import { cookieData } from '@/lib/const';
import { useCookieStore } from '@/store/cookieStore';
import { useEffect, useState } from 'react';

function NombreGalleta() {
	const { currentCookie } = useCookieStore();

	const [nombre, setnombre] = useState('Galleta Oreo');

	useEffect(() => {
		const n = cookieData.get(currentCookie)?.nombre;
		if (n) setnombre(n);
	}, [currentCookie]);

	return (
		<p className="text-2xl font-bold text-center text-yellow-950">
			<strong>{nombre}</strong>
		</p>
	);
}

export default NombreGalleta;
