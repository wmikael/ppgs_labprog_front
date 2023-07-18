import { useState, useEffect } from "react";
import axios from "axios";
import "./Programa.css";
import FiltrosPrograma from "../../components/FiltrosPrograma";
import DocenteTable from "../../components/DocenteTable";

export function Programa() {
  const [programas, setProgramas] = useState([]);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");
  const [dadosTabela, setDadosTabela] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/programa/all-programas")
      .then((response) => {
        setProgramas([...response.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFiltrosChange = (programaSelecionado, anoIni, anoFim) => {
    setAnoIni(anoIni);
    setAnoFim(anoFim);
  };

  const handlePesquisar = (anoIni, anoFim) => {
    console.log("Ano Inicial:", anoIni);
    console.log("Ano Final:", anoFim);
  
    if (!anoIni || !anoFim || anoIni.trim() === '' || anoFim.trim() === '') {
      console.error("Ano inicial e ano final devem ser informados");
      return;
    }
  
    axios
      .get(`http://localhost:8080/api/Docente/obterProducoesQualis/${anoIni}/${anoFim}`)
      .then((response) => {
        setDadosTabela(response.data);
      })
      .catch((error) => console.error(error));
  };
  

  return (
    <div>
      <div className="card flex justify-content-center">
        <FiltrosPrograma
          programas={programas}
          anoIni={anoIni}
          anoFim={anoFim}
          onFiltrosChange={handleFiltrosChange}
        />
        <button onClick={() => handlePesquisar(anoIni, anoFim)}>Pesquisar</button>
      </div>

      <div>
        <h4>Table:</h4>
        <DocenteTable data={dadosTabela} />
      </div>
    </div>
  );
}
