import { useState, useEffect } from "react";
import axios from "axios";
import "./Programa.css";

export function Programa() {
  const [programas, setProgramas] = useState([]);
  const [anoIni, setAnoIni] = useState("");
  const [anoFim, setAnoFim] = useState("");
  const [dadosTabela, setDadosTabela] = useState([]);
  const [programaSelecionado, setProgramaSelecionado] = useState();
  useEffect(() => {
    // Buscar os programas quando o componente for montado
    axios
      .get("http://localhost:8080/api/programa/all-programas")
      .then((response) => {
        setProgramas([...response.data])
      })
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   console.log(programaSelecionado)
  // }, [programaSelecionado]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Enviar o filtro para o endpoint e obter os dados da tabela
    axios
      .get(`http://localhost:8080/api/programa/obterDocentesPrograma`, {
        params: {
          idPrograma: programaSelecionado
        }
      })
      .then((response) => setDadosTabela([...response.data]))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="title">
        <h2>Filtros</h2>
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="programa">Selecione o programa:</label>
        <select id="programa" onChange={(e) => setProgramaSelecionado(e.target.value)}>
          <option value="">--Selecione o programa--</option>
          {programas.length > 0 && programas.map((programa) => (
            <option key={programa.id} value={programa.id}>
              {programa.nome}
            </option>
          ))}
        </select>

        <label htmlFor="anoIni">Ano de início:</label>
        <input
          type="text"
          id="anoIni"
          value={anoIni}
          onChange={(e) => setAnoIni(e.target.value)}
        />

        <label htmlFor="anoFim">Ano de fim:</label>
        <input
          type="text"
          id="anoFim"
          value={anoFim}
          onChange={(e) => setAnoFim(e.target.value)}
        />

        <button type="submit">Filtrar</button>
      </form>

      <div>
        <h2 className="title">Tabela de Dados</h2>
      </div>
    </div>
  );
}
