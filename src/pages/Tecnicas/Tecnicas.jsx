import { useState, useEffect } from "react";
import axios from "axios";
import "./Tecnicas.css";
import FiltrosPrograma from "../../components/FiltrosPrograma";
import TableDocente from "../../components/TableDocente";
import ChartProducaoVsQualis from "../../components/ChartProducaoVsQualis";
import IndicadoresCapes from "../../components/IndicadoresCapes";

export function Tecnicas() {
  const [isIndicadoresCapesLoaded, setIsIndicadoresCapesLoaded] = useState(false);
  const [indicadores, setIndicadores] = useState({});
  // Estados "reais" - atualizados apenas no clique de Pesquisar
  const [programas, setProgramas] = useState([]);
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
    setTempSelectedPrograma(selectedPrograma);
    setTempAnoIni(anoIni);
    setTempAnoFim(anoFim);
  };

  const handlePesquisar = () => {
    setAnoIni(tempAnoIni);
    setAnoFim(tempAnoFim);

    // Agora essas requisições usarão os estados atualizados.
    makeRequestsWith(tempSelectedPrograma, tempAnoIni, tempAnoFim);
  };

  const makeRequestsWith = (programa, anoIni, anoFim) => {

    //Indicadores
    axios
      .get(
        `http://localhost:8080/api/v1/qualis/indicesPrograma/${programa}/${anoIni}/${anoFim}`
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
        setIsIndicadoresCapesLoaded(true);
      })
      .catch((error) => {
        setIsIndicadoresCapesLoaded(false);
        console.error("Erro na requisição:", error);
      });


    setTableLoaded(false);
    setChartLoaded(false);
    axios
      .get(`http://localhost:8080/api/docente/obterProducoesQualis/${anoIni}/${anoFim}`)
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

      
      {isIndicadoresCapesLoaded  && (
        <div>
          <IndicadoresCapes {...indicadores} />
        </div>
      )}

      {chartLoaded && (
        <div>
          <h4>ChartProducaoVsQualis:</h4>
          <ChartProducaoVsQualis
            data={dadosGrafico}
            anoIni={anoIni}
            anoFim={anoFim}
          />
        </div>
      )}

      {tableLoaded && (
        <div>
          <h4>Table:</h4>
          <TableDocente data={dadosTabela} />
        </div>
      )}
    </div>
  );
}
