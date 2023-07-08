import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <h2>Header</h2>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/Exemplo">
        <button>Exemplo</button>
      </Link>
    </div>
  );
}
