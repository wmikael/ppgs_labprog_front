import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Exemplo } from "../pages/Exemplo";
import { DefaultLayout } from "../layouts/DefaultLayout";

export function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Exemplo" element={<Exemplo />} />
      </Route>
    </Routes>
  );
}
