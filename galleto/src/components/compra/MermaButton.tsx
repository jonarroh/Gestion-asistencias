import { Button } from '../ui/button';
import { useVentaStore } from '@/store/ventaStore';
import { useToast } from '../ui/use-toast';
import { useFormState } from '@/store/useFormState';

function MermaButton() {
	const { listaGalletas } = useVentaStore();
	const { setCantidad } = useVentaStore();
	const { toast } = useToast();

	const handleGalletas2 = async () => {
		try {
			listaGalletas.forEach(async galleta => {
				const url = `http://localhost:3001/galletas?id=${galleta.id}`;
				const urlWithParams = new URL(url);

				//obtener el objeto con nombre de la galleta
				const resp = await fetch(urlWithParams);
				let g = await resp.json();

				g[0].sales = Number(galleta.cantidad);
				g[0].fecha = new Date().toISOString();
				g[0].cantidad = String(Number(galleta.cantidad));
				g[0].id = new Date().toISOString() + g[0].id;

				const response = await fetch(
					`http://localhost:3001/perdida`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(g[0])
					}
				);
				const dataResponse = await response.json();
				if (dataResponse) {
					toast({
						title: 'Galleta actualizada',
						description: `Se actualizo la merma de ${g[0].nombre}`
					});

					//limpiar lista de galletas
					useVentaStore.setState({ listaGalletas: [] });
					//limpiar input
					useFormState.setState({
						cantidades: null,
						typeVentas: null,
						idUpdate: -1
					});
				} else {
					toast({
						title: 'Error',
						description: `Ocurrio un error al actualizar la galleta`,
						variant: 'destructive'
					});
				}
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: `Ocurrio un error al actualizar la galleta`,
				variant: 'destructive'
			});
		}
	};

	return (
		<Button
			className="w-1/2 ml-2"
			variant={'secondary'}
			disabled={listaGalletas.length === 0}
			onClick={handleGalletas2}>
			Merma
		</Button>
	);
}

export default MermaButton;
