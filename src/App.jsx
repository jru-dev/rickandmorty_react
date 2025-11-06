import { Link } from "react-router-dom";

function App() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#00b5cc" }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: "1.5rem" }}>
          Rick & Morty Wiki
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/items">Personajes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default App;