'use client';

import { addDays, format } from 'date-fns';
import {
	Table,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow
} from '../ui/table';
import { Alumno } from '@/app/docente/page';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

interface TablaProps {
	fechas: string[];
	alumnos: Alumno[];
	calificaciones?: Calificaciones;
	idLista: string;
}
type Calificaciones = Record<string, string>;

function Tabla({
	fechas,
	alumnos,
	calificaciones,
	idLista
}: TablaProps) {
	console.log({
		idLista: Number(idLista)
	});
	const [cali, setcali] = useState(calificaciones);
	const searchParams = useSearchParams();
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(fechas[0]),
		to: addDays(new Date(fechas[fechas.length - 1]), 1)
	});

	const [fechasHabilesWithIndex, setFechasHabilesWithIndex] =
		useState<{ fecha: string; index: number }[]>(
			fechas.map((fecha, index) => ({ fecha, index }))
		);

	const searchAlumno = searchParams.get('alumno');
	if (searchAlumno) {
		//si hay un alumno en la url, filtrar la tabla para que solo muestre ese alumno
		alumnos = alumnos.filter(
			alumno => alumno.persona[0].clave === Number(searchAlumno)
		);
	}
	const handleSelectChange = async (
		alumno: number,
		fecha: string,
		fechaIndex: number,
		value: string
	) => {
		// console.log(alumno, fecha, fechaIndex, value);
		// const calificaciones = {
		// 	[`${alumno}-${fecha}-${fechaIndex}`]: value
		// };
		// console.log(calificaciones);
		// hacer un objeto con las calificaciones de la tabla
		// y enviarlo al backend
		const lista = {
			clave_lista: Number(idLista),
			estado: value,
			key: `${alumno}-${fecha}-${fechaIndex}`
		};

		setcali({ ...cali, [`${alumno}-${fecha}-${fechaIndex}`]: value });

		const apiUrl = 'http://localhost:3001/relleno/v2';
		await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(lista)
		});

		//hacer un objeto con {key:estado}
		//enviarlo al backend
		// const calificaciones = {
		// 	[`${alumno}-${fecha}-${fechaIndex}`]: value
		// };
		// console.log(calificaciones);
	};
	if (!cali) return null;
	console.log(cali);

	return (
		<div>
			<section className="flex flex-row justify-between w-full">
				<p>Filtrar por fecha </p>
				<div className={cn('grid gap-2')}>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={'outline'}
								className={cn(
									'w-[300px] justify-start text-left font-normal',
									!date && 'text-muted-foreground'
								)}>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, 'LLL dd, y')} -{' '}
											{format(date.to, 'LLL dd, y')}
										</>
									) : (
										format(date.from, 'LLL dd, y')
									)
								) : (
									<span>Selecciona un rango de fechas</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={date?.from}
								selected={date}
								onSelect={setDate}
								numberOfMonths={2}
								disabled={date =>
									date > new Date(fechas[fechas.length - 1]) &&
									date < new Date(fechas[0])
								}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<Button
					onClick={() =>
						setDate({
							from: new Date(fechas[0]),
							to: addDays(new Date(fechas[fechas.length - 1]), 1)
						})
					}>
					Restablecer fecha
				</Button>
			</section>
			<Table>
				<TableCaption>
					Lista de asistencia para las fechas seleccionadas.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Alumnos</TableHead>
						{fechasHabilesWithIndex
							.filter(fecha => {
								if (date?.from && date?.to) {
									return (
										new Date(fecha.fecha) >= date.from &&
										new Date(fecha.fecha) <= date.to
									);
								}
							})
							.map((fecha, index) => (
								<TableHead key={index}>
									{format(new Date(fecha.fecha), 'dd/MM/yyyy')}
								</TableHead>
							))}
					</TableRow>
				</TableHeader>
				<tbody>
					{alumnos.map((alumno, alumnoIndex) => (
						<TableRow key={alumno.alumno[0].clave + alumnoIndex}>
							<TableHead>
								{alumno.persona[0].nombre +
									' ' +
									alumno.persona[0].apellidoPaterno}
							</TableHead>
							{fechasHabilesWithIndex
								.filter(fecha => {
									if (date?.from && date?.to) {
										return (
											new Date(fecha.fecha) >= date.from &&
											new Date(fecha.fecha) <= date.to
										);
									}
									return true; // Include all dates if no date range is specified
								})
								.map((fecha, fechaIndex) => (
									<TableHead
										key={`${alumno.persona[0].clave}-${fecha.fecha}-${fecha.index}`}>
										<select
											value={
												cali[
													`${alumno.persona[0].clave}-${fecha.fecha}-${fecha.index}`
												] || 'na'
											}
											onChange={e =>
												handleSelectChange(
													alumno.persona[0].clave,
													fecha.fecha,
													fecha.index,
													e.target.value
												)
											}>
											<option value="f">Falta</option>
											<option value="a">Asistencia</option>
											<option value="r">Retardo</option>
											<option value="j">Justificado</option>
											<option value="na">N/A</option>
										</select>
									</TableHead>
								))}
						</TableRow>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Tabla;
