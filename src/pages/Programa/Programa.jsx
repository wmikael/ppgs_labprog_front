import { useState, useEffect } from "react";
import axios from "axios";
import "./Programa.css";
import FiltrosPrograma from "../../components/FiltrosPrograma";
import DocenteTable from "../../components/DocenteTable";
import ProducaoVsQualis from "../../components/ProducaoVsQualis";

export function Programa() {
  // Estados "reais" - atualizados apenas no clique de Pesquisar
  const [programas, setProgramas] = useState([]);
  // const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");

  // Estados temporários - atualizados conforme o usuário interage com os campos do filtro
  const [tempSelectedPrograma, setTempSelectedPrograma] = useState(null);
  const [tempAnoIni, setTempAnoIni] = useState("");
  const [tempAnoFim, setTempAnoFim] = useState("");

  const [dadosTabela, setDadosTabela] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [tableLoaded, setTableLoaded] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/programa/all-programas")
      .then((response) => {
        setProgramas([...response.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFiltrosChange = (selectedPrograma, anoIni, anoFim) => {
    console.log("Filtros alterados:", selectedPrograma, anoIni, anoFim);
    setTempSelectedPrograma(selectedPrograma);
    setTempAnoIni(anoIni);
    setTempAnoFim(anoFim);
  };

  const handlePesquisar = () => {
    // setSelectedPrograma(tempSelectedPrograma);
    setAnoIni(tempAnoIni);
    setAnoFim(tempAnoFim);

    // Agora essas requisições usarão os estados atualizados.
    makeRequestsWith(tempSelectedPrograma, tempAnoIni, tempAnoFim);
  };
  const makeRequestsWith = (programa, anoIni, anoFim) => {
    axios
      .get(`http://localhost:8080/api/Docente/obterProducoesQualis/${anoIni}/${anoFim}`)
      .then((response) => {
        setDadosTabela(response.data);
        setTableLoaded(true);
      })
      .catch((error) => {
        setTableLoaded(false);
        console.error(error);
      });

    axios
      .get(`http://localhost:8080/api/v1/qualis/producoesQualis/${programa}/${anoIni}/${anoFim}`)
      .then((response) => {
        setDadosGrafico(response.data);
        setChartLoaded(true);
      })
      .catch((error) => {
        setChartLoaded(false);
        console.error(error);
      });
};


  return (
    <div>
      <div className="card flex justify-content-center">
        <FiltrosPrograma
          programas={programas}
          anoIni={tempAnoIni}
          anoFim={tempAnoFim}
          selectedPrograma={tempSelectedPrograma}
          onFiltrosChange={handleFiltrosChange}
        />
        <button onClick={handlePesquisar}>Pesquisar</button>
      </div>

      {tableLoaded && (
        <div>
          <h4>ProducaoVsQualis:</h4>
          <ProducaoVsQualis
            data={dadosGrafico}
            anoIni={anoIni}
            anoFim={anoFim}
          />
        </div>
      )}

      {chartLoaded && (
        <div>
          <h4>Table:</h4>
          <DocenteTable data={dadosTabela} />
        </div>
      )}
    </div>
  );
}
