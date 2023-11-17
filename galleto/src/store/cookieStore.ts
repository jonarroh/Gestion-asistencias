import type { Cookie, CookieStore } from '@/types/Cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCookieStore = create(
	persist<CookieStore>(
		(set, get) => ({
			currentCookie: '/galleta.png',
			selectedCookie: '/galleta.png',
			setCurrentCookie: (cookie: Cookie) =>
				set({ currentCookie: cookie }),
			setSelectedCookie: (cookie: Cookie) =>
				set({ selectedCookie: cookie })
		}),

		{
			name: 'cookie-store'
		}
	)
);
