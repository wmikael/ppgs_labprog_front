import { Routes, Route } from "react-router-dom";
import { Exemplo } from "../pages/Exemplo";
import { DefaultLayout } from "../layouts/DefaultLayout";
import Programa from "../pages/Programa";

export function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Programa />} />
        <Route path="/Exemplo" element={<Exemplo />} />
      </Route>
    </Routes>
  );
}
