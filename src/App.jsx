import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./routes/RouterConfig";

export function App() {
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  );
}
