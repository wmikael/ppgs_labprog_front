// import { useEffect } from "react";
// import { useState } from "react";
import axios from "axios";
import {DocenteQualis} from "../components/DocenteQualis";
// import {Filtro} from "../components/Filtro";
import {GraficoProducao} from "../components/GraficoProducao";
import {Header} from "../components/Header";
// import {Indicadores} from "../components/Indicadores";
import { useAuth } from "../utils/useAuth";

//vai vir de requisição no futuro
// const programas = [
//   { id: 1, nome: "PPGCC" },
//   { id: 2, nome: "DCCMAPI" },
// ];

// const programas = axios.get({
//   baseURL: "http://localhost:8080/api/programa/allProgramas",
// });

export function Programa() {
  // useAuth();
  // const [progSel, setProgSel] = useState(1);
  // const [anoIni, setAnoIni] = useState(2019);
  // const [anoFim, setAnoFim] = useState(2023);

  // const [indicadores, setIndicadores] = useState({});

  // useEffect(() => {
  //   document.body.classList.add("hold-transition", "layout-top-nav");
  //   onSearch();
  // }, []);

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

  // function onSearch() {
  //   client
  //     .get(`indicadores?programa=${progSel}&anoIni=${anoIni}&anoFim=${anoFim}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setIndicadores(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // }

  return (
    <div className="wrapper">
      
    </div>
  );
}
