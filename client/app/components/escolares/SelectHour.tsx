import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../ui/select';

function SelectHour({ k }: { k: number }) {
	const selectValue = (value: string) => {
		console.log(value);
	};

	return (
		<>
			<Select
				name={`horas-${k}`}
				onValueChange={value => selectValue(value)}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecciona las horas por clase" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Horas</SelectLabel>
						<SelectItem value="1">1 hora</SelectItem>
						<SelectItem value="2">2 horas</SelectItem>
						<SelectItem value="3">3 horas</SelectItem>
						<SelectItem value="4">4 horas</SelectItem>
						<SelectItem value="5">5 horas</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	);
}

export default SelectHour;
