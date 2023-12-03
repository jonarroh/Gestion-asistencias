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
import { format, parseISO, addDays, subDays } from 'date-fns';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Alumno = {
	clave: number;
	persona: {
		clave: number;
		nombre: string;
		apellidoPaterno: string;
		apellidoMaterno: string;
		estatus: string;
		role: string;
		public_id: string;
		password: string;
		matricula: string;
	}[];
};

type AttendanceTableProps = {
	fechasHabiles: {
		fecha: string;
		horasClase: number;
		keys: string;
		estado: string;
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

	const [currentStartDate, setCurrentStartDate] = useState<string>(
		fechasOrdenadas[0].fecha
	);

	const getColumnDates = () => {
		const columnDates: Date[] = [];
		let currentDate = parseISO(currentStartDate);

		for (let i = 0; i < 12; i++) {
			const matchingDate = fechasOrdenadas.find(
				item =>
					parseISO(item.fecha).getTime() === currentDate.getTime()
			);

			if (matchingDate) {
				for (let j = 0; j < matchingDate.horasClase; j++) {
					columnDates.push(currentDate);
				}
			}

			currentDate = addDays(currentDate, 1);
		}

		return columnDates;
	};

	const visibleDates = getColumnDates();
	//unir visibleDates con fechasOrdenadas

	const handlePrevButtonClick = () => {
		const newStartDate = subDays(parseISO(currentStartDate), 12);
		setCurrentStartDate(format(newStartDate, 'yyyy-MM-dd'));
	};

	const handleNextButtonClick = () => {
		const newStartDate = addDays(parseISO(currentStartDate), 12);
		setCurrentStartDate(format(newStartDate, 'yyyy-MM-dd'));
	};

	return (
		<div>
			<Table>
				<TableCaption>
					Lista de asistencia para las fechas seleccionadas.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Nombre</TableHead>
						{visibleDates.map((date, index) => (
							<TableHead
								key={
									fechasOrdenadas.find(
										item =>
											parseISO(item.fecha).getTime() ===
											date.getTime()
									)?.keys + uuidv4()
								}>
								{format(date, 'dd/MM/yyyy')}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<form>
					<TableBody>
						{alumnos.map(alumno => (
							<TableRow key={alumno.clave}>
								<TableCell className="font-medium">{`${alumno.persona[0].nombre} ${alumno.persona[0].apellidoPaterno}`}</TableCell>
								{visibleDates.map((date, index) => (
									<TableCell
										key={
											fechasOrdenadas.find(
												item =>
													parseISO(item.fecha).getTime() ===
													date.getTime()
											)?.keys + uuidv4()
										}>
										<select
											value={
												fechasOrdenadas.find(
													item =>
														parseISO(item.fecha).getTime() ===
														date.getTime()
												)?.estado
											}
											onChange={e => {
												//cambiar el estado de la asistencia en fechasOrdenadas
												const newFechasOrdenadas =
													fechasOrdenadas.map(item => {
														if (
															parseISO(item.fecha).getTime() ===
															date.getTime()
														) {
															return {
																...item,
																estado: e.target.value
															};
														}
														return item;
													});
												//@ts-ignore
												const lista = {
													claveLista: claveLista,
													newFechasOrdenadas
												};
											}}>
											<option value="s">Sin marcar</option>
											<option value="a">Asistencia</option>
											<option value="f">Falta</option>
											<option value="j">Justificación</option>
											<option value="r">Retardo</option>
										</select>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</form>
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
				<button onClick={handlePrevButtonClick}>Anterior</button>
				<button onClick={handleNextButtonClick}>Siguiente</button>
			</div>
		</div>
	);
};

export default AttendanceTable;
