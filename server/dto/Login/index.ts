import { t } from 'elysia';

export const SignDTO = t.Object({
	matricula: t.String(),
	password: t.String()
});
