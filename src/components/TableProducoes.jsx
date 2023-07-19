import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import ModalOrientacoes from "./ModalOrientacoes";
import ModalEstatisticas from "./ModalEstatisticas";
import { useState } from "react";
export default function TableProducoes({ data }) {
  const getEstatisticas = (producao) => {
    const graduacoes = producao.qtdGrad ? producao.qtdGrad : 0;
    const mestrados = producao.qtdMestrado ? producao.qtdMestrado : 0;
    const doutorados = producao.qtdDoutorado ? producao.qtdDoutorado : 0;
    return graduacoes + " G / " + mestrados + " M / " + doutorados + " D ";
  };
  const [selectedProducao, setSelectedProducao] = useState({});
  const [showModalOrientacao, setShowModalOrientacao] = useState(false);
  const [showModalEstatisticas, setShowModalEstatisticas] = useState(false);

  const toggleModal = (producao) => {
    setSelectedProducao(producao);
    setShowModalEstatisticas((prevState) => !prevState);
  };

  
  const getIcons = (producao) => {
    const style = {
      display: "flex",
      justifyContent: "space-around",
    };
    return (
      <div style={style}>
        <button>
          <i className="pi pi-user-plus" style={{ fontSize: "20px" }}></i>
        </button>
        <button onClick={() => toggleModal(producao)}>
          <i className="pi pi-cog" style={{ fontSize: "20px" }}></i>
        </button>
      </div>
    );
  };

  return (
    <>
      <DataTable value={data}>
        <Column field="id" header="ID" sortable />
        <Column field="tipo" header="Tipo" sortable />
        <Column field="issnOuSigla" header="ISSN ou Sigla" sortable />
        <Column field="nomeLocal" header="Nome Local" sortable />
        <Column field="titulo" header="Título" sortable />
        <Column field="autores" header="Autores" sortable />
        <Column field="ano" header="Ano" sortable />
        <Column field="doi" header="DOI" sortable />
        <Column field="natureza" header="Natureza" sortable />
        <Column field="qualis" header="Qualis" sortable />
        <Column field="percentileOuH5" header="Percentil ou H5" sortable />
        <Column header="Estatísticas" sortable body={getEstatisticas} />
        <Column header="Actions" sortable body={getIcons} />
      </DataTable>
      <ModalEstatisticas show={showModalEstatisticas} producao={selectedProducao}/>
    </>
  );
}
