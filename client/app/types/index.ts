export type role =
	| 'alumno'
	| 'docente'
	| 'directivo'
	| 'padre'
	| 'escolares';

export const roles = [
	'alumno',
	'docente',
	'directivo',
	'padre',
	'escolares'
] as const;
