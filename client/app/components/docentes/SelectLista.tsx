import { useState } from "react"
import { Select, SelectGroup, SelectTrigger, SelectValue,SelectContent } from "../ui/select"

export interface Lista {
  clave:              number;
  clave_docente:      number;
  clave_especialidad: number;
  clave_materia:      number;
  dias_descanso:      string;
  dias_Vacaciones:    string;
  horas_clase:        string;
  dias_clase:         string;
  clave_periodo:      number;
  clave_grupo:        number;
}


function SelectLista() {


  const [grupos, setgrupos] = useState<Lista[]>([])


  return (
    <>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona un grupo"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            grupos.map((grupo) => {
              return (
                // <option key={grupo.clave} value={grupo.clave}>{grupo.nombre}</option>
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>

    </>
  )
}

export default SelectLista