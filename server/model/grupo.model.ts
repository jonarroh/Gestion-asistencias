import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../db/schema';

// export class Grupo{
//     GetGrupo = async () => {
//         return await db
//             .select()
//             .from(schema.grupo)
//             .innerJoin(
//                 schema.materia,
//                 eq(schema.grupo.clave_materia, schema.materia.clave)
//             );
//     };
// }
