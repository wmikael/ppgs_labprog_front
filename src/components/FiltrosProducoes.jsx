import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

export default function FiltrosProducoes({
  programas,
  fetchDocentesPrograma,
  anoIni,
  anoFim,
  onFiltrosChange,
  onDocenteChange, // Renomeie a propriedade para onDocenteChange
}) {
  const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [inputAnoIni, setInputAnoIni] = useState(anoIni);
  const [inputAnoFim, setInputAnoFim] = useState(anoFim);
  const [docenteOptions, setDocenteOptions] = useState([]);

  useEffect(() => {
    if (selectedPrograma) {
      fetchDocentesPrograma(selectedPrograma).then((docentes) => {
        setDocenteOptions(
          docentes.map((docente) => ({
            label: docente.nome,
            value: docente.id,
          }))
        );
      });
    } else {
      setDocenteOptions([]);
    }
  }, [selectedPrograma, fetchDocentesPrograma]);

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

  const programaOptions = programas.map((programa) => ({
    label: programa.nome,
    value: programa.id,
  }));

  const handleDocenteChange = (e) => {
    setSelectedDocente(e.value);
    onDocenteChange(e.value); // Chame a função de atualização do docente selecionado
  };

  return (
    <div style={styleFiltrosContainer}>
      <div>
        <h4>Filtros:</h4>
      </div>
      <div style={styleInputContainer}>
        <Dropdown
          value={selectedPrograma}
          options={programaOptions}
          onChange={(e) => {
            setSelectedPrograma(e.value);
            setSelectedDocente(null); // Limpar o docente selecionado ao trocar de programa
            onFiltrosChange(e.value, inputAnoIni, inputAnoFim);
          }}
          placeholder="Selecionar Programa"
          className="w-full md:w-14rem"
        />
      </div>
      <div style={styleInputContainer}>
        <Dropdown
          value={selectedDocente}
          options={docenteOptions}
          onChange={handleDocenteChange}
          placeholder="Selecionar Docente"
          className="w-full md:w-14rem"
          disabled={!selectedPrograma} // Dropdown desabilitado até que um programa seja selecionado
        />
      </div>
      <div style={styleInputContainer}>
        <InputText
          keyfilter="int"
          placeholder="Ano Inicial"
          value={inputAnoIni}
          onChange={(e) => {
            setInputAnoIni(e.target.value);
            onFiltrosChange(
              selectedPrograma,
              selectedDocente,
              e.target.value,
              inputAnoFim
            );
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
            onFiltrosChange(
              selectedPrograma,
              selectedDocente,
              inputAnoIni,
              e.target.value
            );
          }}
        />
      </div>
    </div>
  );
}
