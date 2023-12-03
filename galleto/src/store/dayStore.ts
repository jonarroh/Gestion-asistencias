import { create } from 'zustand';

interface DayStore {
	day: boolean;
	semana: boolean;
	mes: boolean;
	SelectedDate: () => string;
	setDay: () => void;
	setSemana: () => void;
	setMes: () => void;
	setDefault: () => void;
}

export const useDayStore = create<DayStore>((set, get) => ({
	day: false,
	semana: false,
	mes: false,
	SelectedDate: () => {
		const { day, semana, mes } = get();
		if (day) return 'hoy';
		if (semana) return 'semana';
		if (mes) return 'mes';
		return 'day';
	},
	setDay: () => set({ day: true, semana: false, mes: false }),
	setSemana: () => set({ day: false, semana: true, mes: false }),
	setMes: () => set({ day: false, semana: false, mes: true }),
	setDefault: () => set({ day: false, semana: false, mes: false })
}));
