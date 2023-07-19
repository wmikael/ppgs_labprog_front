import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

export default function FiltrosProducoes({
  programas,
  fetchDocentesPrograma,
  onFiltrosChange,
  onDocenteChange, // Renomeie a propriedade para onDocenteChange
}) {
  const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [selectedDocente, setSelectedDocente] = useState(null);

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
    onFiltrosChange(selectedPrograma, e.value); // Adicione esta linha
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
            onFiltrosChange(e.value);
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
    </div>
  );
}
