import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import ModalOrientacoes from "./ModalOrientacoes";
import ModalEstatisticasTecnicas from "../Modal/ModalEstatisticasTecnicas";
import { useState } from "react";
export default function TableTecnicas({ data }) {
  const getEstatisticas = (tecnica) => {
    const graduacoes = tecnica.qtdGrad ? tecnica.qtdGrad : 0;
    const mestrados = tecnica.qtdMestrado ? tecnica.qtdMestrado : 0;
    const doutorados = tecnica.qtdDoutorado ? tecnica.qtdDoutorado : 0;
    return graduacoes + " G / " + mestrados + " M / " + doutorados + " D ";
  };
  const [selectedTecnica, setSelectedTecnica] = useState({});
  //   const [showModalOrientacao, setShowModalOrientacao] = useState(false);
  const [showModalEstatisticas, setShowModalEstatisticas] = useState(false);

  const toggleModal = (tecnica) => {
    setSelectedTecnica(tecnica);
    setShowModalEstatisticas((prevState) => !prevState);
  };

  const getIcons = (tecnica) => {
    const style = {
      display: "flex",
      justifyContent: "space-around",
    };
    return (
      <div style={style}>
        <button>
          <i className="pi pi-user-plus" style={{ fontSize: "20px" }}></i>
        </button>
        <button onClick={() => toggleModal(tecnica)}>
          <i className="pi pi-cog" style={{ fontSize: "20px" }}></i>
        </button>
      </div>
    );
  };

  return (
    <>
      <h2>Tecnicas:</h2>
      <DataTable value={data} paginator rows={5} sortMode="multiple">
        <Column field="id" header="ID" sortable />
        <Column field="ano" header="Ano" sortable />
        <Column field="tipo" header="Tipo" sortable />
        <Column field="titulo" header="Título" sortable />
        <Column field="financiadora" header="Financiadora" sortable />
        <Column
          header="Estatísticas"
          body={getEstatisticas}
          style={{ width: "150px" }}
        />
        <Column header="Actions" sortable body={getIcons} />
      </DataTable>
      <ModalEstatisticasTecnicas
        show={showModalEstatisticas}
        tecnica={selectedTecnica}
      />
    </>
  );
}
