import type { Cookie, CookieStore } from '@/types/Cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCookieStore = create(
	persist<CookieStore>(
		(set, get) => ({
			currentCookie: '/galleta_oreo.webp',
			selectedCookie: '/galleta_oreo.webp',
			placeholder: '/galleta_oreo.webp',
			setCurrentCookie: (cookie: Cookie) =>
				set({ currentCookie: cookie }),
			setSelectedCookie: (cookie: Cookie) =>
				set({ selectedCookie: cookie })
		}),

		{
			name: 'cookie-store',
			skipHydration: true
		}
	)
);
