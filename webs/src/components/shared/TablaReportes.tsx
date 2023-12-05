'use client';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { Alumno } from '@/types/listas';
import { format, parseISO, addDays, subDays } from 'date-fns';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

type AttendanceTableProps = {
	fechasHabiles: {
		fecha: string;
		horasClase: number;
		keys: string;
		estado: string;
		alumnos: Alumno[];
	}[];
	alumnos: Alumno[];
	claveLista: number;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
	fechasHabiles,
	alumnos,
	claveLista
}) => {
	const fechasOrdenadas = fechasHabiles;
	console.log({
		fechasOrdenadas
	});

	const [currentStartDate, setCurrentStartDate] = useState(
		fechasOrdenadas[0].fecha
	);

	const [renderLista, setrenderLista] = useState(fechasOrdenadas);

	const getColumnDates = (
		fechasOrdenadas: {
			fecha: string;
			horasClase: number;
			keys: string;
			estado: string;
		}[]
	) => {
		const ColumnDates: {
			columnDates: Date;
			id: string;
		}[] = [];

		for (let i = 0; i < 12; i++) {
			ColumnDates.push({
				columnDates: parseISO(fechasOrdenadas[i].fecha),
				id: fechasOrdenadas[i].keys
			});
		}
		return ColumnDates;
	};

	const visibleDates = getColumnDates(fechasOrdenadas);
	//unir visibleDates con fechasOrdenadas

	const handlePrevButtonClick = () => {
		//validar que no se pase de la fecha de inicio
		if (
			visibleDates[0].columnDates <=
			parseISO(fechasOrdenadas[0].fecha)
		) {
			return;
		}
		const newStartDate = subDays(parseISO(currentStartDate), 12);
		setCurrentStartDate(format(newStartDate, 'yyyy-MM-dd'));
	};

	const handleNextButtonClick = () => {
		//validar que no se pase de la fecha de fin
		if (
			visibleDates[visibleDates.length - 1].columnDates >=
			parseISO(fechasOrdenadas[fechasOrdenadas.length - 1].fecha)
		) {
			return;
		}
		const newStartDate = addDays(parseISO(currentStartDate), 12);
		setCurrentStartDate(format(newStartDate, 'yyyy-MM-dd'));
	};

	return (
		<form>
			<Table>
				<TableCaption>
					Lista de asistencia para las fechas seleccionadas.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Nombre</TableHead>
						{visibleDates.map((date, index) => (
							<TableHead key={index}>
								{format(date.columnDates, 'dd/MM/yyyy')}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{alumnos.map((alumno, index) => (
						<TableRow key={alumno.alumno[0].clave}>
							<TableCell className="font-medium">{`${alumno.persona[0].nombre} ${alumno.persona[0].apellidoPaterno}`}</TableCell>
							{visibleDates.map((date, columnIndex) => (
								<TableCell key={date.id}>
									{JSON.stringify(
										renderLista[columnIndex].alumnos[index]
									)}
									<select
										name={alumno.alumno[0].clave_persona + date.id}
										id={alumno.alumno[0].clave_persona + date.id}
										//@ts-ignore
										value={alumno.alumno[0].estado}
										onChange={e => {
											const newLista = renderLista.map(item => {
												if (
													// @ts-ignore
													item.alumnos[index].alumno[
														columnIndex
													].clave_persona ===
													alumno.alumno[columnIndex].clave_persona
												) {
													// Reemplazar el item con el nuevo valo
													// @ts-ignore
													item.alumnos[columnIndex].alumno[
														columnIndex
													].estado = e.target.value;

													console.log({
														item: item.alumnos[columnIndex].alumno[
															columnIndex
														].clave_persona,
														value: e.target.value
													});
												}
												return item;
											});

											setrenderLista(newLista);
										}}>
										<option value="A">A</option>
										<option value="F">F</option>
										<option value="R">R</option>
										<option value="T">T</option>
										<option value="na">NA</option>
									</select>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>

				{/* <TableFooter>
					<TableRow>
						<TableCell colSpan={1}>Total</TableCell>
						{visibleDates.map((date, index) => (
							<TableCell key={uuidv4()}>
								
							</TableCell>
						))}
					</TableRow>
				</TableFooter> */}
			</Table>

			<div>
				<button onClick={handlePrevButtonClick} type="button">
					Anterior
				</button>
				<button onClick={handleNextButtonClick} type="button">
					Siguiente
				</button>
			</div>
		</form>
	);
};

export default AttendanceTable;
