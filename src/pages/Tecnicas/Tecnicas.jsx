import { useState, useEffect } from "react";
import axios from "axios";
import "./Tecnicas.css";
import FiltrosTecnicas from "../../components/Filtros/FiltrosTecnicas";
import DataTableComponent from "../../components/DataTableComponent";
import TableTecnicas from "../../components/Tables/TableTecnicas";

export function Tecnicas() {
  const [programas, setProgramas] = useState([]);
  const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");
  const [dataTabela, setDataTabela] = useState([]);
  const [tecnicas, setTecnicas] = useState([]);


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

  const handleFiltrosChange = (Programa, Docente) => {
    setSelectedPrograma(Programa);
    setSelectedDocente(Docente);
    // Atualiza estados temporários
    console.log(selectedPrograma, selectedDocente);
  };

  const handlePesquisar = async () => {
    if (selectedDocente) {
      try {
        // Faça aqui a chamada para buscar os dados da tabela com base nos filtros selecionados
        const response = await axios.get(
          `http://localhost:8080/api/tecnica/obterTecnicasPorDocente/${selectedDocente}`
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
        <FiltrosTecnicas
          programas={programas}
          docentes={selectedDocente}
          onFiltrosChange={handleFiltrosChange}
          handleDocenteChange={setSelectedDocente}
          fetchDocentesPrograma={fetchDocentesPrograma}
        />
        <button onClick={handlePesquisar}>Pesquisar</button>
      </div>

      <div style={styleTable}>
        {dataTabela.length > 0 && <TableTecnicas data={dataTabela} />}
      </div>
    </div>
  );
}
