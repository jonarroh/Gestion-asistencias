import { Form, useSubmit } from '@remix-run/react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';
import { Docentes, Especialidad, Materia, Periodo } from '~/types';

interface PanelCrearListaProps {
	periodos: Periodo[];
	especialidades: Especialidad[];
	materias: Materia[];
	grupos: any[];
	docentes: Docentes[];
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
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Periodo</SelectLabel>
										{periodos.map((periodo: Periodo) => {
											return (
												<SelectItem
													key={periodo.clave}
													value={periodo.clave.toString()}>
													{periodo.nombre}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Especialidad</Label>
							<Select name="Especialidad">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona la especialidad" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Especialidad</SelectLabel>
										{especialidades.map(
											(especialidad: Especialidad) => {
												return (
													<SelectItem
														key={especialidad.clave}
														value={especialidad.nombre}>
														{especialidad.nombre}
													</SelectItem>
												);
											}
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className="col-span-4">
							<Label>Materia</Label>
							<Select name="Materia">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona la materia" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Materia</SelectLabel>
										{materias.map((materia: Materia) => {
											return (
												<SelectItem
													key={materia.clave}
													value={materia.nombre}>
													{materia.nombre}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Grupo</Label>
							<Select name="Grupo">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el grupo" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Grupo</SelectLabel>
										{grupos.map((grupo: any) => {
											return (
												<SelectItem key={grupo.id} value={grupo.id}>
													{grupo.nombre}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-4">
							<Label>Docente</Label>
							<Select name="Docente">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona el docente" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Docente</SelectLabel>
										{docentes.map((docente: Docentes) => {
											return (
												<SelectItem
													key={docente.docente.clave}
													value={docente.persona.matricula}>
													{docente.persona.nombre +
														' ' +
														docente.persona.apellidoPaterno +
														' ' +
														docente.persona.apellidoMaterno}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
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
