import { Card, CardContent, CardHeader } from '../ui/card';

interface HeaderDatosProps {
	role: string;
	nombre: string;
	matricula: string;
	claveDocente: number;
}

function HeaderDocente({
	role,
	nombre,
	matricula,
	claveDocente
}: HeaderDatosProps) {
	return (
		<Card className="mt-2 w-full">
			<CardHeader>
				<h1 className="text-2xl font-bold text-center text-gray-500">
					Datos de {role} {claveDocente}
				</h1>
			</CardHeader>
			<CardContent className="grid w-full h-full  grid-cols-12 ">
				<div className="col-span-4 ">
					<span className="font-bold text-xl">Matricula:</span>
				</div>
				<div className="col-span-4">
					<span className="text-lg font-medium">{matricula}</span>
				</div>

				<div className="col-span-6">
					<span className="font-bold text-xl">Nombre:</span>
				</div>
				<div className="col-span-6">
					<span className="text-lg font-medium">{nombre}</span>
				</div>
			</CardContent>
		</Card>
	);
}

export default HeaderDocente;
