import { useState, useEffect } from "react";
import axios from "axios";
import "./Producoes.css";
import FiltrosProducoes from "../../components/FiltrosProducoes";
import DataTableComponent from "../../components/DataTableComponent";

export function Producoes() {
  const [programas, setProgramas] = useState([]);
  const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");
  const [dataTabela, setDataTabela] = useState([]);
  const [producoes, setProducoes] = useState([]);
  // Estados temporários para os inputs de ano
  const [tempAnoIni, setTempAnoIni] = useState("");
  const [tempAnoFim, setTempAnoFim] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/programa/all-programas")
      .then((response) => {
        setProgramas(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchDocentesPrograma = async (programaId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/programa/obterDocentesPrograma/${programaId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleFiltrosChange = (
    selectedPrograma,
    selectedDocente,
    anoIni,
    anoFim
  ) => {
    setSelectedPrograma(selectedPrograma);
    setSelectedDocente(selectedDocente);
    // Atualiza estados temporários
    setTempAnoIni(anoIni);
    setTempAnoFim(anoFim);
  };

  const handlePesquisar = async () => {
    if (selectedDocente && anoIni && anoFim) {
      try {
        // Faça aqui a chamada para buscar os dados da tabela com base nos filtros selecionados
        const response = await axios.get(
          `http://localhost:8080/api/producoes/obterTodasAsProducoes/${selectedDocente.value}/${anoIni}/${anoFim}`
        );
        setDataTabela(response.data);
      } catch (error) {
        console.error(error);
        setDataTabela([]);
      }
    } else {
      alert("Por favor, preencha todos os filtros antes de pesquisar.");
    }
  };

  return (
    <div>
      <FiltrosProducoes
        programas={programas}
        docentes={selectedDocente}
        anoIni={tempAnoIni}
        anoFim={tempAnoFim}
        onFiltrosChange={handleFiltrosChange}
        handleDocenteChange={setSelectedDocente} // Adicione esta linha
        fetchDocentesPrograma={fetchDocentesPrograma}
      />

      <button onClick={handlePesquisar}>Pesquisar</button>
      {dataTabela.length > 0 && <DataTableComponent data={dataTabela} />}
    </div>
  );
}
