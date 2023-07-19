import { useState, useEffect } from "react";
import axios from "axios";
import "./Docente.css";
import ChartProducaoVsQualis from "../../components/ChartProducaoVsQualis";
import FiltrosDocente from "../../components/FiltrosDocente";
import IndicadoresCapes from "../../components/IndicadoresCapes";
import DataTableComponent from "../../components/DataTableComponent";

export function Docente() {
  const [isIndicadoresCapesLoaded, setIsIndicadoresCapesLoaded] = useState(false);
  const [isProducoesQualisPPQLoaded, setIsProducoesQualisPPQLoaded] = useState(false);
  const [isProducoesQualisPCQLoaded, setIsProducoesQualisPCQLoaded] = useState(false);
  const [isOrientacoesDocenteLoaded, setIsOrientacoesDocenteLoaded] = useState(false);
  const [isProducoesDocenteLoaded, setIsProducoesDocenteLoaded] = useState(false);
  const [isTecnicasDocenteLoaded, setIsTecnicasDocenteLoaded] = useState(false);

  // Estados "reais" - atualizados apenas no clique de Pesquisar
  const [docentes, setDocentes] = useState([]);
  // const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");
  const [indicadores, setIndicadores] = useState({});
  // Estados temporários - atualizados conforme o usuário interage com os campos do filtro
  const [tempSelectedDocente, setTempSelectedDocente] = useState(null);
  const [tempAnoIni, setTempAnoIni] = useState("");
  const [tempAnoFim, setTempAnoFim] = useState("");

  const [selectedDocente, setSelectedDocente] = useState(null);

  const [dadosTabelaOTC, setDadosTabelaOTC] = useState([]);
  const [dadosTabelaATG, setDadosTabelaATG] = useState([]);
  const [dadosTabelaTEC, setDadosTabelaTEC] = useState([]);
  const [dadosGraficoPPQ, setDadosGraficoPPQ] = useState([]);
  const [dadosGraficoPCQ, setDadosGraficoPCQ] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/docente/obterTodosDocentes")
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
    setSelectedDocente(tempSelectedDocente);
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
        setIsIndicadoresCapesLoaded(true);
      })
      .catch((error) => {
        setIsIndicadoresCapesLoaded(false);
        console.error("Erro na requisição:", error);
      });

    // Producao em Periodicos vs Qualis:
    axios
      .get(
        `http://localhost:8080/api/v1/qualis/obterProducoesQualisPorTipo/${docente}/${anoIni}/${anoFim}/ARTIGO-PUBLICADO`
      )
      .then((response) => {
        setDadosGraficoPPQ(response.data);
        setIsProducoesQualisPPQLoaded(true);
      })
      .catch((error) => {
        setIsProducoesQualisPPQLoaded(false);
        console.error(error);
      });

    // Producao em Congressos vs Qualis:
    axios
      .get(
        `http://localhost:8080/api/v1/qualis/obterProducoesQualisPorTipo/${docente}/${anoIni}/${anoFim}/TRABALHO-EM-EVENTOS`
      )
      .then((response) => {
        setDadosGraficoPCQ(response.data);
        setIsProducoesQualisPCQLoaded(true);
      })
      .catch((error) => {
        setIsProducoesQualisPCQLoaded(false);
        console.error(error);
      });

    // Tabela orientacoes
    axios
      .get(
        `http://localhost:8080/api/docente/obterOrientacoesDocente/${docente}/${anoIni}/${anoFim}`
      )
      .then((response) => {
        const dataTable = response.data.map((item) => ({
          discente: item.discente,
          tipo: item.tipo,
          titulo: item.titulo,
          ano: item.ano,
        }));
        setDadosTabelaOTC(dataTable);
        setIsOrientacoesDocenteLoaded(true);
      })
      .catch((error) => {
        setIsOrientacoesDocenteLoaded(false);
        console.error(error);
      });

    // Tabela Artigos
    axios
      .get(
        `http://localhost:8080/api/docente/obterProducoesDocente/${docente}/${anoIni}/${anoFim}`
      )
      .then((response) => {
        const dataTable = response.data.map((item) => ({
          titulo: item.titulo,
          nomeLocal: item.nomeLocal,
          tipo: item.tipo,
          qualis: item.qualis,
          ano: item.ano,
        }));
        setDadosTabelaATG(dataTable);
        // console.log(dadosTabelaATG);
        setIsProducoesDocenteLoaded(true);
      })
      .catch((error) => {
        setIsProducoesDocenteLoaded(false);
        console.error(error);
      });

    // Tabela Tecnicas
    axios
      .get(
        `http://localhost:8080/api/docente/obterTecnicasDocente/${docente}/${anoIni}/${anoFim}`
      )
      .then((response) => {
        const dataTable = response.data.map((item) => ({
          titulo: item.titulo,
          tipo: item.tipo,
          ano: item.ano,
        }));
        setDadosTabelaTEC(dataTable);
        setIsTecnicasDocenteLoaded(true);
      })
      .catch((error) => {
        setIsTecnicasDocenteLoaded(false);
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

      {isIndicadoresCapesLoaded  && (
        <div>
          <IndicadoresCapes {...indicadores} />
        </div>
      )}

      {isProducoesQualisPPQLoaded  && (
        <div>
          <h4>Produção em Periódicos vs Qualis :</h4>
          <ChartProducaoVsQualis
            data={dadosGraficoPPQ}
            anoIni={anoIni}
            anoFim={anoFim}
          />
        </div>
      )}

      {isProducoesQualisPCQLoaded  && (
        <div>
          <h4>Produção em Congressos vs Qualis :</h4>
          <ChartProducaoVsQualis
            data={dadosGraficoPCQ}
            anoIni={anoIni}
            anoFim={anoFim}
          />
        </div>
      )}

      {isOrientacoesDocenteLoaded  && (
        <div>
          <h4>Orientações:</h4>
          <DataTableComponent data={dadosTabelaOTC} />
        </div>
      )}

      {isProducoesDocenteLoaded  && (
        <div>
          <h4>Artigos:</h4>
          <DataTableComponent data={dadosTabelaATG} />
        </div>
      )}

      {isTecnicasDocenteLoaded  && (
        <div>
          <h4>Tecnicas:</h4>
          <DataTableComponent data={dadosTabelaTEC} />
        </div>
      )}
    </div>
  );
}
