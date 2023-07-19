import { useState, useEffect } from "react";
import axios from "axios";
import "./Producoes.css";
import FiltrosProducoes from "../../components/FiltrosProducoes";
import DataTableComponent from "../../components/DataTableComponent";
import TableProducoes from "../../components/TableProducoes";

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

  const handleFiltrosChange = (Programa, Docente, anoIniVar, anoFimVar) => {
    setSelectedPrograma(Programa);
    setSelectedDocente(Docente);
    // Atualiza estados temporários
    setAnoIni(anoIniVar);
    setAnoFim(anoFimVar);
    console.log(selectedPrograma, selectedDocente, anoIni, anoFim);
  };

  const handlePesquisar = async () => {
    if (selectedDocente && anoIni && anoFim) {
      try {
        // Faça aqui a chamada para buscar os dados da tabela com base nos filtros selecionados
        const response = await axios.get(
          `http://localhost:8080/api/producao/obterTodasAsProducoes/${selectedDocente}/${anoIni}/${anoFim}`
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

  const styleTable = {
    width: "80vw",
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <FiltrosProducoes
          programas={programas}
          docentes={selectedDocente}
          anoIni={tempAnoIni}
          anoFim={tempAnoFim}
          onFiltrosChange={handleFiltrosChange}
          handleDocenteChange={setSelectedDocente}
          fetchDocentesPrograma={fetchDocentesPrograma}
        />
        <button onClick={handlePesquisar}>Pesquisar</button>
      </div>

      <div style={styleTable}>
        {dataTabela.length > 0 && <TableProducoes data={dataTabela} />}
      </div>
    </div>
  );
}
