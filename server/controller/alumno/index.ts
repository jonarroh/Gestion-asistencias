import Elysia, { t } from "elysia";
import { Alumno } from "../../model/alumno.model";

const alumno = new Elysia({ prefix: "/alumno" }).post(
	"",
	({ body }) => {
		return new Alumno().getAlumnoByClavePersona(Number(body.clave_persona));
	},
	{
		body: t.Object({
			clave_persona: t.String(),
		}),
	},
);

export default alumno;
