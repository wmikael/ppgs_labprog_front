import { Routes, Route } from "react-router-dom";
import { Exemplo } from "../pages/Exemplo";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Programa } from "../pages/Programa/Programa";
import { TesteDataTable } from "../pages/TesteDataTable";
import { Docente } from "../pages/Docente/Docente";
import { LoginPage } from "../pages/LoginPage/LoginPage";

export function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/programa" element={<Programa />} />
        <Route path="/teste-data-table" element={<TesteDataTable />} />
        <Route path="/docente" element={<Docente />} />
        <Route path="/exemplo" element={<Exemplo />} />
      </Route>
    </Routes>
  );
}
