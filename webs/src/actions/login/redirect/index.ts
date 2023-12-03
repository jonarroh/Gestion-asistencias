'use server';

import { redirect } from 'next/navigation';

export async function redirectTo(formdata: FormData) {
	const url = formdata.get('url') as string;
	redirect(url);
}
