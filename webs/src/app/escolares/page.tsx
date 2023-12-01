import Usuario from '@/Layout/Usuario';
import { getDocentes } from '../services/docentes';
import { getEspecialidades } from '../services/especialidad';
import { getMaterias } from '../services/materia';
import { getPeriodos } from '../services/periodos';
// import HeaderDatos from '@/components/shared/HeaderDatos';
import PanelCrearLista from '@/components/escolares/PanelCrearLista';

async function getData() {
	const [docentes, materias, especialidades, periodos] =
		await Promise.all([
			getDocentes(),
			getMaterias(),
			getEspecialidades(),
			getPeriodos()
		]);
	return { docentes, materias, especialidades, periodos };
}

async function Role() {
	const { docentes, materias, especialidades, periodos } =
		await getData();
	return (
		<>
			<div className="w-screen h-screen grid-cols-18 ">
				<Usuario role="escolares">
					{/* <HeaderDatos
							role={route}
							nombre={usuario.persona.nombre}
							matricula={usuario.persona.matricula}
						/> */}
					<PanelCrearLista
						docentes={docentes}
						especialidades={especialidades}
						grupos={[]}
						materias={materias}
						periodos={periodos}
					/>
				</Usuario>
			</div>
		</>
	);
}

export default Role;
