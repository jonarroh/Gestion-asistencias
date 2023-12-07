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
			await Promise.all(
				listaGalletas.map(async galleta => {
					const url = `http://localhost:3001/galletas?id=${galleta.id}`;
					const urlWithParams = new URL(url);

					try {
						const resp = await fetch(urlWithParams);
						const g = await resp.json();

						if (Number(g[0].stock) < Number(galleta.cantidad)) {
							throw new Error(
								`La cantidad de merma es mayor a la existencia para ${g[0].nombre}`
							);
						}

						g[0].stock -= Number(galleta.cantidad);

						const urlUpdate = `http://localhost:3001/galletas/${g[0].id}`;
						const urlWithParamsUpdate = new URL(urlUpdate);

						const responseUpdate = await fetch(urlWithParamsUpdate, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(g[0])
						});

						if (!responseUpdate.ok) {
							throw new Error(
								`Ocurrió un error al actualizar la galleta ${g[0].nombre}`
							);
						}

						g[0].fecha = new Date().toISOString();
						g[0].cantidad = String(Number(galleta.cantidad));
						g[0].id = new Date().toISOString() + g[0].id;
						g[0].sales = Number(galleta.cantidad);

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
								description: `Se actualizó la merma de ${g[0].nombre}`
							});

							useVentaStore.setState({ listaGalletas: [] });
							useFormState.setState({
								cantidades: null,
								typeVentas: null,
								idUpdate: -1
							});
						} else {
							throw new Error(
								`Ocurrió un error al actualizar la galleta ${g[0].nombre}`
							);
						}
					} catch (error) {
						toast({
							title: 'Error',
							//@ts-ignore
							description: error.message,
							variant: 'destructive'
						});
					}
				})
			);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Ocurrió un error al actualizar las galletas',
				variant: 'destructive'
			});
		}
	};

	return (
		<Button
			className="w-1/2 ml-2"
			variant={'secondary'}
			type="button"
			disabled={listaGalletas.length === 0}
			onClick={handleGalletas2}>
			Merma
		</Button>
	);
}

export default MermaButton;
