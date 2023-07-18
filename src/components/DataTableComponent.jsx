/* eslint-disable react/prop-types */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function DataTableComponent({ data, header }) {
  return (
    <DataTable value={data} header={header} paginator rows={5} sortMode="multiple">
      {Object.keys(data[0]).map((key, index) => (
        <Column key={index} field={key} header={key} sortable />
      ))}
    </DataTable>
  );
}
