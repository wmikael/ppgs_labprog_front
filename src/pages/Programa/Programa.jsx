import { useState, useEffect } from "react";
import axios from "axios";
import "./Programa.css";
import FiltrosPrograma from "../../components/FiltrosPrograma";
import StackedBar from "../../components/StackedBar";
import { DataTableComponent } from "../../components/DataTableComponent";

export function Programa() {
  const data = [
    {
      name: "Rupert",
      age: 48,
      city: "Austin",
      country: "USA",
      occupation: "Writer",
      salary: 6200,
      experience: 13,
    },
    {
      name: "Sybil",
      age: 29,
      city: "Jacksonville",
      country: "USA",
      occupation: "Painter",
      salary: 3900,
      experience: 3,
    },
  ];

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

    // Chamada do Axios para buscar os dados da tabela com base nos filtros
    axios
      .get("http://localhost:8080/api/programa/obterDadosTabela", {
        params: {
          programa: programaSelecionado,
          anoIni,
          anoFim,
        },
      })
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
      </div>

      <div>
        <h4>Chart:</h4>
        <StackedBar />
      </div>

      <div>
        <h4>Table:</h4>
        <DataTableComponent data={data} header={header} />
      </div>
    </div>
  );
}
