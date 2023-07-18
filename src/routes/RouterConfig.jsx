import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Programa } from "../pages/Programa/Programa";
import { Docente } from "../pages/Docente/Docente";
import { LoginPage } from "../pages/LoginPage/LoginPage";

export function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/programa" element={<Programa />} />
        <Route path="/docente" element={<Docente />} />
      </Route>
    </Routes>
  );
}
