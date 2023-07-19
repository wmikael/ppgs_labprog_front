import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const TableDocente = ({ data }) => {
  const navigate = useNavigate();

  const redirectToInfoPage = (docenteId) => {
    navigate(`/docente/${docenteId}`);
  };

  const renderQualisColumn = (rowData, column) => {
    const qualisIndex = column.field.replace("qualis[", "").replace("]", "");
    const qualisValue = rowData.qualis[qualisIndex];
    return <span>{qualisValue}</span>;
  };

  const renderLinkColumn = (rowData) => {
    return (
      <Button
        label="Ver Mais"
        className="p-button-secondary"
        onClick={() => redirectToInfoPage(rowData.docente.id)}
      />
    );
  };

  return (
    <DataTable
      value={data}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 20]}
      className="p-datatable-striped"
    >
      <Column
        field="docente.nome"
        header="Docente"
        sortable
        filter
        filterMatchMode="contains"
      ></Column>
      <Column
        field="qualis[0]"
        header="A1"
        body={renderQualisColumn}
        sortable
        sortField="qualis.0"
      ></Column>
      <Column
        field="qualis[1]"
        header="A2"
        body={renderQualisColumn}
        sortable
        sortField="qualis.1"
      ></Column>
      <Column
        field="qualis[2]"
        header="A3"
        body={renderQualisColumn}
        sortable
        sortField="qualis.2"
      ></Column>
      <Column
        field="qualis[3]"
        header="A4"
        body={renderQualisColumn}
        sortable
        sortField="qualis.3"
      ></Column>
      <Column
        field="qualis[4]"
        header="B1"
        body={renderQualisColumn}
        sortable
        sortField="qualis.4"
      ></Column>
      <Column
        field="qualis[5]"
        header="B2"
        body={renderQualisColumn}
        sortable
        sortField="qualis.5"
      ></Column>
      <Column
        field="qualis[6]"
        header="B3"
        body={renderQualisColumn}
        sortable
        sortField="qualis.6"
      ></Column>
      <Column
        field="qualis[7]"
        header="B4"
        body={renderQualisColumn}
        sortable
        sortField="qualis.7"
      ></Column>
      <Column
        field="qualis[8]"
        header="C"
        body={renderQualisColumn}
        sortable
        sortField="qualis.8"
      ></Column>
      <Column header="Detalhes" body={renderLinkColumn}></Column>
    </DataTable>
  );
};

export default TableDocente;
