import { useState, useEffect } from "react";
import axios from "axios";
import "./Docente.css";
import DocenteTable from "../../components/DocenteTable";
import ProducaoVsQualis from "../../components/ProducaoVsQualis";
import FiltrosDocente from "../../components/FiltrosDocente";
import IndicadoresCapes from "../../components/IndicadoresCapes";

export function Docente() {
  // Estados "reais" - atualizados apenas no clique de Pesquisar
  const [programas, setProgramas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  // const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");
  const [indicadores, setIndicadores] = useState({});
  // Estados temporários - atualizados conforme o usuário interage com os campos do filtro
  const [tempSelectedDocente, setTempSelectedDocente] = useState(null);
  const [tempAnoIni, setTempAnoIni] = useState("");
  const [tempAnoFim, setTempAnoFim] = useState("");

  const [dadosTabela, setDadosTabela] = useState([]);
  const [dadosGraficoPPQ, setDadosGraficoPPQ] = useState([]);
  const [dadosGraficoPCQ, setDadosGraficoPCQ] = useState([]);
  const [tableLoaded, setTableLoaded] = useState(false);
  const [indicadoresQualisLoaded, setIndicadoresQualisLoaded] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Docente/obterTodosDocentes")
      .then((response) => {
        setDocentes([...response.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFiltrosChange = (selectedDocente, anoIni, anoFim) => {
    // console.log("Filtros alterados:", selectedDocente, anoIni, anoFim);
    setTempSelectedDocente(selectedDocente);
    setTempAnoIni(anoIni);
    setTempAnoFim(anoFim);
  };

  const handlePesquisar = () => {
    // setSelectedPrograma(tempSelectedPrograma);
    setAnoIni(tempAnoIni);
    setAnoFim(tempAnoFim);

    // Agora essas requisições usarão os estados atualizados.
    makeRequestsWith(tempSelectedDocente, tempAnoIni, tempAnoFim);
  };
  const makeRequestsWith = (docente, anoIni, anoFim) => {
    //Indicadores
    axios
      .get(
        `http://localhost:8080/api/v1/qualis/obterIndicadoresCapesDocente/${docente}/${anoIni}/${anoFim}`
      )
      .then((response) => {
        const { indice } = response.data;
        const { indiceRest, indiceNRest, indiceGeral } = indice;

        const quantidadeProducoes = response.data.producoes.length;

        setIndicadores({
          indiceRest,
          indiceNRest,
          indiceGeral,
          quantidadeProducoes,
        });
        // console.log(indicadores);
        setIndicadoresQualisLoaded(true);
      })
      .catch((error) => {
        setIndicadoresQualisLoaded(false);
        console.error("Erro na requisição:", error);
      });

    // Producao em Periodicos vs Qualis:
    axios
      .get(
        `http://localhost:8080/api/v1/qualis/obterProducoesQualisPorTipo/${docente}/${anoIni}/${anoFim}/ARTIGO-PUBLICADO`
      )
      .then((response) => {
        setDadosGraficoPPQ(response.data);
        setChartLoaded(true);
      })
      .catch((error) => {
        setChartLoaded(false);
        console.error(error);
      });

    // Producao em Congressos vs Qualis:
    axios
      .get(
        `http://localhost:8080/api/v1/qualis/obterProducoesQualisPorTipo/${docente}/${anoIni}/${anoFim}/TRABALHO-EM-EVENTOS`
      )
      .then((response) => {
        setDadosGraficoPCQ(response.data);
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
        <FiltrosDocente
          docentes={docentes}
          anoIni={tempAnoIni}
          anoFim={tempAnoFim}
          selectedPrograma={tempSelectedDocente}
          onFiltrosChange={handleFiltrosChange}
        />
        <button onClick={handlePesquisar}>Pesquisar</button>
      </div>

      {indicadoresQualisLoaded && (
        <div>
          <IndicadoresCapes {...indicadores} />
        </div>
      )}

      {chartLoaded && (
        <div>
          <h4>Produção em Periódicos vs Qualis :</h4>
          <ProducaoVsQualis
            data={dadosGraficoPPQ}
            anoIni={anoIni}
            anoFim={anoFim}
          />
        </div>
      )}

      {chartLoaded && (
        <div>
          <h4>Produção em Congressos vs Qualis :</h4>
          <ProducaoVsQualis
            data={dadosGraficoPCQ}
            anoIni={anoIni}
            anoFim={anoFim}
          />
        </div>
      )}

      
      {tableLoaded && (
        <div>
          <h4>Table:</h4>
          <DocenteTable data={dadosTabela} />
        </div>
      )}
    </div>
  );
}
