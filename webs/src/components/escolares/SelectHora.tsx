'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

function SelectHora({ k }: { k: number }) {
	return (
		<>
			<Select name={`horario-${k}`}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecciona la hora de inicio" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Horas</SelectLabel>
						<SelectItem value="7am">7:00 am</SelectItem>
						<SelectItem value="8am">8:00 am</SelectItem>
						<SelectItem value="9am">9:00 am</SelectItem>
						<SelectItem value="10am">10:00 am</SelectItem>
						<SelectItem value="11am">11:00 am</SelectItem>
						<SelectItem value="12pm">12:00 pm</SelectItem>
						<SelectItem value="13pm">1:00 pm</SelectItem>
						<SelectItem value="14pm">2:00 pm</SelectItem>
						<SelectItem value="15pm">3:00 pm</SelectItem>
						<SelectItem value="16pm">4:00 pm</SelectItem>
						<SelectItem value="17pm">5:00 pm</SelectItem>
						<SelectItem value="18pm">6:00 pm</SelectItem>
						<SelectItem value="19pm">7:00 pm</SelectItem>
						<SelectItem value="20pm">8:00 pm</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	);
}

export default SelectHora;
