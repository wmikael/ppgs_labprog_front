/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export function Navbar({ titulo }) {
  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div className="container">
        <li className="navbar-brand">
          <Link to="/programa" className="brand-text font-weight-light">
            {titulo}
          </Link>
        </li>

        <button
          className="navbar-toggler order-1"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
                Table
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
