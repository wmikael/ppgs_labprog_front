import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

export default function FiltrosDocente({
  docentes,
  anoIni,
  anoFim,
  onFiltrosChange,
}) {
  const [selectedDocente, setSelecteddocente] = useState(null);
  const [inputAnoIni, setInputAnoIni] = useState(anoIni);
  const [inputAnoFim, setInputAnoFim] = useState(anoFim);

  const styleFiltrosContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  };

  const styleInputContainer = {
    marginLeft: "10px",
    marginRight: "10px",
  };

  const docenteOptions = docentes.map((docente) => ({
    label: docente.nome,
    value: docente.id,
  }));

  return (
    <div style={styleFiltrosContainer}>
      <div>
        <h4>Filtros:</h4>
      </div>
      <div style={styleInputContainer}>
        <Dropdown
          value={selectedDocente}
          options={docenteOptions}
          onChange={(e) => {
            setSelecteddocente(e.value);
            onFiltrosChange(e.value, inputAnoIni, inputAnoFim);
          }}
          placeholder="Seleciona o docente"
          className="w-full md:w-14rem"
        />
      </div>
      <div style={styleInputContainer}>
        <InputText
          keyfilter="int"
          placeholder="Ano Inicial"
          value={inputAnoIni}
          onChange={(e) => {
            setInputAnoIni(e.target.value);
            onFiltrosChange(selectedDocente, e.target.value, inputAnoFim);
          }}
        />
      </div>
      <div style={styleInputContainer}>
        <InputText
          keyfilter="int"
          placeholder="Ano Final"
          value={inputAnoFim}
          onChange={(e) => {
            setInputAnoFim(e.target.value);
            onFiltrosChange(selectedDocente, inputAnoIni, e.target.value);
          }}
        />
      </div>
    </div>
  );
}
