'use client';

import { addDays, format, set } from 'date-fns';
import {
	Table,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow
} from '../ui/table';
import { Alumno } from '@/app/docente/page';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon, Cloud } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Card, CardHeader } from '../ui/card';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';
import { useToast } from '../ui/use-toast';

interface TablaProps {
	fechas: string[];
	alumnos: Alumno[];
	calificaciones?: Calificaciones;
	idLista: string;
	role?: string;
	claveMateria: number;
}
type Calificaciones = Record<string, string>;

function Tabla(props: TablaProps) {
	let {
		fechas,
		alumnos,
		calificaciones,
		idLista,
		role,
		claveMateria
	} = props;
	const { toast } = useToast();
	const icon = useRef(null);
	const [cali, setcali] = useState(calificaciones);
	const [claveMaterias, setClaveMaterias] = useState(claveMateria);
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
	const materias = searchParams.get('materia');
	if (searchAlumno) {
		//si hay un alumno en la url, filtrar la tabla para que solo muestre ese alumno
		alumnos = alumnos.filter(
			alumno => alumno.persona[0].clave === Number(searchAlumno)
		);
	}

	//si hay una materia en la url, agregarlo a claveMaterias sin usar if para que no se rompa el codigo
	useEffect(() => {
		if (materias) {
			setClaveMaterias(Number(materias));
		}
		console.log({ claveMaterias });
	}, []);

	const handleSelectChange = async (
		alumno: number,
		fecha: string,
		fechaIndex: number,
		value: string
	) => {
		// validar que si el valor actual es 'j' no se pueda cambiar a otro valor

		// de icon cambiar el fill a #62B595
		//@ts-ignore
		icon.current.style.fill = '#62B595';

		if (
			cali &&
			cali[`${alumno}-${fecha}-${fechaIndex}-${claveMaterias}`] ===
				'j' &&
			role === 'docente'
		) {
			//remover la el #62B595 del icono
			//@ts-ignore
			icon.current.style.fill = '';
			toast({
				title:
					'No puedes cambiar el valor de una asistencia justificada',
				variant: 'destructive',
				description:
					'Los valores justificados no pueden ser cambiados.'
			});
			return;
		}

		const lista = {
			clave_lista: Number(idLista),
			estado: value,
			key: `${alumno}-${fecha}-${fechaIndex}-${claveMaterias}`
		};

		setcali({
			...cali,
			[`${alumno}-${fecha}-${fechaIndex}-${claveMaterias}`]: value
		});

		const apiUrl = 'http://localhost:3001/relleno/v2';
		await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(lista)
		});

		//remover la el #62B595 del icono
		//@ts-ignore
		icon.current.style.fill = '';
	};
	if (!cali) return null;
	console.log(cali);

	return (
		<Card>
			<CardHeader className="flex flex-col  w-full">
				<div className="flex flex-row items-center justify-between w-full">
					<p className="text-2xl font-bold">Bienvenido</p>
					<p className="text-xl text-gray-500">
						<span>
							Listas de asistencia del{' '}
							{format(new Date(fechas[0]), 'dd/MM/yyyy')} -{' '}
							{format(
								new Date(fechas[fechas.length - 1]),
								'dd/MM/yyyy'
							)}
						</span>
					</p>

					<Cloud
						size={24}
						className="text-gray-500 float-letf"
						ref={icon}
					/>
				</div>
				<div className={cn('grid gap-2')}>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={'outline'}
								className={cn(
									' justify-start text-left font-normal w-11/12 ',
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
					className="bg-[#62B595]"
					onClick={() =>
						setDate({
							from: new Date(fechas[0]),
							to: addDays(new Date(fechas[fechas.length - 1]), 1)
						})
					}>
					Restablecer fecha
				</Button>
			</CardHeader>
			<Table className=" rounded-md w-full overflow-x-scroll">
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
										key={`${alumno.persona[0].clave}-${fecha.fecha}-${fecha.index}-${claveMaterias}`}>
										<Select
											value={
												cali[
													`${alumno.persona[0].clave}-${fecha.fecha}-${fecha.index}-${claveMaterias}`
												] || 'na'
											}
											disabled={true}>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Selecciona un valor" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Agregar valor</SelectLabel>
													<SelectItem value="f">Falta</SelectItem>
													<SelectItem value="a">
														Asistencia
													</SelectItem>
													<SelectItem value="r">Retardo</SelectItem>
													<SelectItem value="j">
														Justificado
													</SelectItem>
													<SelectItem value="na">N/A</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</TableHead>
								))}
						</TableRow>
					))}
				</tbody>
			</Table>
		</Card>
	);
}

export default Tabla;
