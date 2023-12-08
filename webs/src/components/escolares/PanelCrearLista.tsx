'use client';
import {
	Docentes,
	Especialidad,
	Grupo,
	Materia,
	Periodo
} from '@/types';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { addDays, format, parseISO } from 'date-fns';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import SelectHour from './SelectHour';
import { MultiSelect } from '../ui/multipleSelect';
import { Calendar } from '../ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';
import { DateRange } from 'react-day-picker';
import { es } from 'date-fns/locale';
import SelectHora from './SelectHora';

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
	const [materia, setmateria] = useState<Materia[]>();
	const [grupo, setgrupos] = useState<Grupo[]>();
	const [fechaPeriodo, setFechaPeriodo] = useState<
		[Date, Date] | undefined
	>([
		new Date(periodos[0].fecha_inicio),
		addDays(new Date(periodos[0].fecha_fin), 1)
	]);
	console.log({ fechaPeriodo });
	const { toast } = useToast();

	const handleChangeEspecialidad = async (clave: number) => {
		const urls = [
			`http://localhost:3001/materias/${clave}`,
			`http://localhost:3001/grupo/${clave}`
		];

		const requests = urls.map(url =>
			fetch(url, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					idEspecialidad: clave
				})
			})
		);

		const responses = await Promise.all(requests);

		const jsons = await Promise.all(
			responses.map(response => response.json())
		);
		console.log(jsons);
		setmateria(jsons[0]);
		setgrupos(jsons[1]);
	};

	const [date, setDate] = useState<Date[] | undefined>();
	const [diasVacaciones, setVacaciones] = useState<
		DateRange | undefined
	>({
		from: new Date(periodos[0].fecha_inicio),
		to: addDays(new Date(periodos[0].fecha_fin), 1)
	});

	const [selected, setSelected] = useState<string[]>([]);
	return (
		<>
			<Card className="mt-4 p-4 w-[80vw]">
				<CardContent>
					<form
						className="grid w-full h-full  grid-cols-12  gap-4"
						onSubmit={async e => {
							e.preventDefault();

							const data = new FormData(e.currentTarget);
							data.append('diasDescanso', JSON.stringify(date));
							data.append(
								'diasVacaciones',
								JSON.stringify(diasVacaciones)
							);
							data.append('diasClase', JSON.stringify(selected));
							//sacar de data los item que sean hora-1, hora-2, hora-3, etc
							//y meterlos en un array
							const horas: string[] = [];
							for (const [key, value] of data.entries()) {
								if (key.includes('horas')) {
									horas.push(value.toString());
								}
							}

							for (const [key, value] of data.entries()) {
								if (key.includes('horas')) {
									data.delete(key);
								}
							}

							data.append('horas', JSON.stringify(horas));

							const horarios: string[] = [];
							for (const [key, value] of data.entries()) {
								if (key.includes('horario')) {
									horarios.push(value.toString());
								}
							}

							for (const [key, value] of data.entries()) {
								if (key.includes('horario')) {
									data.delete(key);
								}
							}

							data.append('horarios', JSON.stringify(horarios));

							const rawData = Object.fromEntries(data.entries());

							//validar que las fecha de vacaciones esten dentro del periodo
							//sacar el periodo del valor de data.get(periodo	)
							const a = data.get('Periodo')?.toString().split('#');
							let error = false;
							if (a) {
								const inicio = parseISO(a[1]);
								const fin = parseISO(a[0]);
								if (
									diasVacaciones?.from &&
									diasVacaciones?.to &&
									(diasVacaciones.from < inicio ||
										diasVacaciones.to > fin)
								) {
									toast({
										title: 'Error',
										description: `El rango de vacaciones ${format(
											diasVacaciones.from,
											'PPP',
											{
												locale: es
											}
										)} - ${format(diasVacaciones.to, 'PPP', {
											locale: es
										})} no esta dentro del periodo de las fechas ${format(
											inicio,
											'PPP',
											{
												locale: es
											}
										)} - ${format(fin, 'PPP', {
											locale: es
										})}`,
										variant: 'destructive'
									});
									error = true;
								}
								if (error) return;

								//validar que los Dias de inhábiles esten dentro del periodo
								let errorOccurred = false;
								date?.forEach(d => {
									if (d < inicio || d > fin) {
										toast({
											title: 'Error',
											description: `El dia ${format(d, 'PPP', {
												locale: es
											})} no esta dentro del periodo de las fechas ${format(
												inicio,
												'PPP',
												{
													locale: es
												}
											)} - ${format(fin, 'PPP', {
												locale: es
											})}`,

											variant: 'destructive'
										});
										errorOccurred = true;
									}
								});

								if (errorOccurred) return;

								//validar que las horas del horario no superen las 21 horas
								let errorOccurred2 = false;
								horarios.forEach((h, index) => {
									const hora =
										Number(h.toString().substring(0, 2)) +
										Number(selected[index]);
									console.log({ hora });
									if (hora > 21) {
										toast({
											title: 'Error',
											description: `La hora ${h} no es valida, no puede ser mayor a las 21 horas`,
											variant: 'destructive'
										});
										errorOccurred2 = true;
									}
								});

								if (errorOccurred2) return;

								const resp = await fetch(
									'http://localhost:3001/lista',
									{
										method: 'POST',
										body: JSON.stringify({
											Docente: rawData.Docente,
											Grupo: rawData.Grupo,
											Especialidad: rawData.Especialidad,
											Materia: rawData.Materia,
											Periodo: a[2],
											diasClase: rawData.diasClase,
											diasDescanso: rawData.diasDescanso,
											diasVacaciones: rawData.diasVacaciones,
											horas: rawData.horas,
											horarios: rawData.horarios
										}),
										headers: {
											'Content-Type': 'application/json'
										}
									}
								).then(res => res.json());

								if (resp.message) {
									toast({
										title: 'Lista creada',
										description:
											'La lista se ha creado correctamente',
										type: 'foreground',
										duration: 5000
									});
								} else {
									toast({
										title: 'Error',
										description:
											'La lista no se ha creado correctamente',
										variant: 'destructive'
									});
								}
							}
						}}>
						<div className="col-span-4">
							<Label>Periodo</Label>
							<Select
								name="Periodo"
								onValueChange={e => {
									const a = e.split('#');
									setFechaPeriodo([parseISO(a[1]), parseISO(a[0])]);
									setDate([
										parseISO(a[1]),
										addDays(parseISO(a[0]), 7)
									]);
									setVacaciones({
										from: parseISO(a[1]),
										to: addDays(parseISO(a[0]), 7)
									});
								}}>
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
													value={
														periodo.fecha_fin +
														'#' +
														periodo.fecha_inicio +
														'#' +
														periodo.clave
													}>
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
							<Select
								name="Especialidad"
								onValueChange={e => {
									handleChangeEspecialidad(Number(e));
								}}>
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
														value={especialidad.clave.toString()}>
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
										{!materia
											? materias.map((materia: Materia) => {
													return (
														<SelectItem
															key={materia.clave}
															value={materia.clave.toString()}>
															{materia.nombre}
														</SelectItem>
													);
											  })
											: materia.map((materia: Materia) => {
													return (
														<SelectItem
															key={materia.clave}
															value={materia.clave.toString()}>
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
										{!grupo
											? grupos.map((grupo: Grupo) => {
													return (
														<SelectItem
															key={grupo.grupo.clave}
															value={grupo.grupo.clave.toString()}>
															{grupo.grupo.nombre}
														</SelectItem>
													);
											  })
											: grupo.map((grupo: Grupo) => {
													return (
														<SelectItem
															key={grupo.grupo.clave}
															value={grupo.grupo.clave.toString()}>
															{grupo.grupo.nombre}
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
													value={docente.docente.clave.toString()}>
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
						<div className="col-span-4">
							<Label>Dias de inhábiles</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-full justify-start text-left font-normal',
											diasVacaciones && 'text-muted-foreground'
										)}>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? (
											format(date[0], 'PPP', {
												locale: es
											})
										) : (
											<span>Selecciona los dias de descanso</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="multiple"
										selected={date}
										onSelect={setDate}
										initialFocus
										disabled={d => {
											if (fechaPeriodo) {
												return (
													d < fechaPeriodo[0] || d > fechaPeriodo[1]
												);
											}
											return false;
										}}
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className="col-span-4">
							<Label>Vacaciones</Label>
							<div className={cn('grid gap-2')}>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											id="date"
											variant={'outline'}
											className={cn(
												'w-full justify-start text-left font-normal',
												!date && 'text-muted-foreground'
											)}>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{diasVacaciones?.from ? (
												diasVacaciones.to ? (
													<>
														{format(
															diasVacaciones.from,
															'LLL dd, y',
															{
																locale: es
															}
														)}{' '}
														-{' '}
														{format(diasVacaciones.to, 'LLL dd, y', {
															locale: es
														})}
													</>
												) : (
													format(diasVacaciones.from, 'LLL dd, y', {
														locale: es
													})
												)
											) : (
												<span>Dias de Vacaciones</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start">
										<Calendar
											initialFocus
											mode="range"
											defaultMonth={diasVacaciones?.from}
											selected={diasVacaciones}
											onSelect={setVacaciones}
											numberOfMonths={2}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						<div className="col-span-4">
							<Label>Dias de clase</Label>
							<MultiSelect
								options={[
									{
										value: 'L',
										label: 'Lunes	'
									},
									{
										value: 'Ma',
										label: 'Martes	'
									},
									{
										value: 'Mi',
										label: 'Miercoles	'
									},
									{
										value: 'J',
										label: 'Jueves	'
									},
									{
										value: 'V',
										label: 'Viernes	'
									},
									{
										value: 'S',
										label: 'Sabado	'
									}
								]}
								selected={selected}
								onChange={setSelected}
								className="w-[560px]"
							/>
						</div>
						{selected.map((item, index) => {
							return (
								<div className="col-span-4" key={index}>
									<Label>Horas de la clase {index + 1}</Label>
									<SelectHour k={index + 1} />
								</div>
							);
						})}
						{selected.map((item, index) => {
							return (
								<div className="col-span-4" key={index}>
									<Label>Inicio de la clase {index + 1}</Label>
									<SelectHora k={index + 1} />
								</div>
							);
						})}
						<div className="col-span-12">
							<div className="flex w-full justify-end">
								<Button
									variant="default"
									type="submit"
									size={'lg'}
									className="bg-[#62B595]">
									Crear
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</>
	);
}

export default PanelCrearLista;
