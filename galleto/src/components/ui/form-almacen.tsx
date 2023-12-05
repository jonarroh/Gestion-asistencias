import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FormAlmacen() {
    return (
		<>
			<form 
				className="w-full h-full flex flex-col space-y-4 justify-center items-center">
                <div className="w-full">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        type="number"
                        placeholder="Cantidad"
                        name="cantidad"
                    />
                </div>
				<div className="space-x-3 grid grid-columns-2 w-full">
                    <div className="col-start-1 w-full">
                        <Button className="w-full" type="submit">Añadir</Button>
                    </div>
                    <div className="col-start-2">
                        <Button variant={'secondary'} type={"submit"} className="w-full">Eliminar</Button>
                    </div>
				</div>

			</form> 
		</>
	);
} 

export default FormAlmacen;