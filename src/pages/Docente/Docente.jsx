import { useState, useEffect } from "react";
import axios from "axios";
import "./Programa.css";
import FiltrosPrograma from "../../components/FiltrosPrograma";
import { DataTableComponent } from "../../components/DataTableComponent";

export function Programa() {
  const [programas, setProgramas] = useState([]);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");
  const [dadosTabela, setDadosTabela] = useState([]);

  useEffect(() => {
    // Buscar os programas quando o componente for montado
    axios
      .get("http://localhost:8080/api/programa/all-programas")
      .then((response) => {
        setProgramas([...response.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFiltrosChange = (programaSelecionado, anoIni, anoFim) => {
    // Atualizar os valores dos filtros
    setAnoIni(anoIni);
    setAnoFim(anoFim);
  };

  const handlePesquisar = () => {
    // Chamada do Axios para buscar os dados da tabela com base nos filtros
    axios
      .get(`http://localhost:8080/api/obterProducoesQualis/${anoIni}/${anoFim}`)
      .then((response) => {
        // Atualizar os dados da tabela com a resposta da API
        setDadosTabela(response.data);
      })
      .catch((error) => console.error(error));
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Products</span>
    </div>
  );

  return (
    <div>
      <div className="card flex justify-content-center">
        <FiltrosPrograma
          programas={programas}
          anoIni={anoIni}
          anoFim={anoFim}
          onFiltrosChange={handleFiltrosChange}
        />
        <button onClick={handlePesquisar}>Pesquisar</button>
      </div>

      {/* <div>
        <h4>Chart:</h4>
        <StackedBar />
      </div> */}

      <div>
        <h4>Table:</h4>
        <DataTableComponent data={dadosTabela} header={header} />
      </div>
    </div>
  );
}
