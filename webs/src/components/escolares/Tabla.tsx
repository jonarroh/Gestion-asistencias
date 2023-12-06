'use client';

import { format } from 'date-fns';
import {
	Table,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow
} from '../ui/table';
import { Alumno } from '@/app/docente/page';
import { useState } from 'react';

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
			<Table>
				<TableCaption>
					Lista de asistencia para las fechas seleccionadas.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Alumnos</TableHead>
						{fechas.map((fecha, index) => (
							<TableHead key={index}>
								{format(new Date(fecha), 'dd/MM/yyyy')}
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
							{fechas.map((fecha, fechaIndex) => (
								<TableHead
									key={`${alumno.persona[0].clave}-${fecha}-${fechaIndex}`}>
									<select
										value={
											cali[
												`${alumno.persona[0].clave}-${fecha}-${fechaIndex}`
											] || 'na'
										}
										onChange={e =>
											handleSelectChange(
												alumno.persona[0].clave,
												fecha,
												fechaIndex,
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
