import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Programa } from "../pages/Programa/Programa";
import { Docente } from "../pages/Docente/Docente";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { Producoes } from "../pages/Producoes/Producoes"
import { Tecnicas } from "../pages/Tecnicas/Tecnicas"

export function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/programa" element={<Programa />} />
        <Route path="/producoes" element={<Producoes />} />
        <Route path="/tecnicas" element={<Tecnicas />} />

        <Route path="/docente" element={<Docente />} />
      </Route>
    </Routes>
  );
}
