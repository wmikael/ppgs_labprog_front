import { useAuth } from "../utils/useAuth";
import  {SelectProgramas}  from "../components/SelectProgramas";


export  function Docente() {
useAuth();
  return (
    <div>
       <SelectProgramas />
        <h2>DOCENTE</h2>
    </div>
  )
}
