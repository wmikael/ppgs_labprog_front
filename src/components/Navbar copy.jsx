/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div className="container">
        <div className="collapse navbar-collapse order-3" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/programa" className="nav-link">
                Programas
              </Link>
            </li>
            <li>
              <Link to="/docente" className="nav-link">
                Docentes
              </Link>
            </li>
            <li>
              <Link to="/teste-data-table" className="nav-link">
                Lista de Produções
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
