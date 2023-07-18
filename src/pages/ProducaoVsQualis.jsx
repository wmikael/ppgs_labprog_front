import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {DocenteQualis} from "../components/DocenteQualis";
import {Filtro} from "../components/Filtro";
import {GraficoProducao} from "../components/GraficoProducao";
import {Header} from "../components/Header";
import {Indicadores} from "../components/Indicadores";
import { useAuth } from "../utils/useAuth";

//vai vir de requisição no futuro
const programas = [
  { id: 1, nome: "PPGCC" },
  { id: 2, nome: "DCCMAPI" },
];

const client = axios.create({
  baseURL: "http://localhost:8080/api/programa/",
});

export function Programa() {
  useAuth();
  const [progSel, setProgSel] = useState(1);
  const [anoIni, setAnoIni] = useState(2019);
  const [anoFim, setAnoFim] = useState(2023);

  const [indicadores, setIndicadores] = useState({});

  useEffect(() => {
    document.body.classList.add("hold-transition", "layout-top-nav");
    onSearch();
  }, []);

  /*
    useEffect( () => {
        document.body.classList.add('hold-transition', 'layout-top-nav');
        client.get(`indicadores?programa=${progSel}&anoIni=${anoIni}&anoFim=${anoFim}`)
            .then(                
                (response) => {
                    console.log(response.data)
                    setIndicadores(response.data)
                }
            ).catch(error => {
                console.log(error.response);
            });
        }, [progSel, anoIni, anoFim]
    )
    */

  function onSearch() {
    client
      .get(`indicadores?programa=${progSel}&anoIni=${anoIni}&anoFim=${anoFim}`)
      .then((response) => {
        console.log(response.data);
        setIndicadores(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <Header titulo="Programa" />

        <div className="content">
          <div className="container">
            <div className="container-fluid">
              <Filtro
                programas={programas}
                filtroProg={progSel}
                onProgChange={setProgSel}
                filtroAnoIni={anoIni}
                onAnoIniChange={setAnoIni}
                filtroAnoFim={anoFim}
                onAnoFimChange={setAnoFim}
                onSearch={onSearch}
              />
              <Indicadores dados={indicadores} />

              <GraficoProducao />
              <DocenteQualis />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
