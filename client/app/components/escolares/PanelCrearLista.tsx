import { Form, useSubmit } from '@remix-run/react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue } from '../ui/select';

interface PanelCrearListaProps {
	periodos: any[];
	especialidades: any[];
	materias: any[];
	grupos: any[];
	docentes: any[];
}

function PanelCrearLista({
	periodos,
	especialidades,
	materias,
	grupos,
	docentes
}: PanelCrearListaProps) {
	const submmit = useSubmit();
	return (
		<>
			<Card className="mt-4">
				<CardContent>
					<Form
						className="grid w-full h-full  grid-cols-12  gap-4"
						onSubmit={async e => {
							e.preventDefault();
							const data = new FormData(e.currentTarget);
							console.log(data);
							submmit({
								method: 'POST',
								body: e.currentTarget,
								action: '/escolares'
							});
						}}>
						<div className="col-span-4">
							<Label>Nombre</Label>
							<Input
								type="text"
								name="nombre"
								placeholder="Nombre"
								required
							/>
						</div>
						<div className="col-span-4">
							<Label>Periodo</Label>
							<Select name="Periodo">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el periodo" />
								</SelectTrigger>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Especialidad</Label>
							<Select name="Especialidad">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona la especialidad" />
								</SelectTrigger>
							</Select>
						</div>

						<div className="col-span-4">
							<Label>Materia</Label>
							<Select name="Materia">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona la materia" />
								</SelectTrigger>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Grupo</Label>
							<Select name="Grupo">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el grupo" />
								</SelectTrigger>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Docente</Label>
							<Select name="Docente">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el docente" />
								</SelectTrigger>
							</Select>
						</div>

						<button>crear lista</button>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

export default PanelCrearLista;
