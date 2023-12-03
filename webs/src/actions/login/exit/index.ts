'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function ExitAndRedirectToLogin() {
	const cookieStore = cookies();
	cookieStore.delete('user-token');

	redirect('/');
}
