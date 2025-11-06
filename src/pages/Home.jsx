import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get("https://rickandmortyapi.com/api/character?page=1");
        const data = res.data.results.slice(0, 9).map((c) => ({
          id: c.id,
          name: c.name,
          image: c.image,
          status: c.status,
          species: c.species,
          gender: c.gender,
        }));
        setCharacters(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "3rem" }}>
      <div className="container py-5">
        {/* HERO */}
        <div className="text-center mb-5 p-5 bg-white rounded shadow-sm">
          <h1 className="display-3 fw-bold" style={{ color: "#198754" }}>
            Rick y Morty React
          </h1>
          <p className="lead text-muted mt-3">
            Explora y descubre a tus personajes favoritos del universo de Rick y Morty.
          </p>
        </div>

        {/* LISTADO */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
          {characters.map((c) => (
            <div className="col" key={c.id}>
              <div
                className="card border-0 shadow-sm text-center h-100"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
                }}
              >
                <div className="p-3">
                  <img
                    src={c.image}
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "contain",
                    }}
                    alt={c.name}
                  />
                </div>
                <div className="card-body pt-0">
                  <h6 className="card-title text-capitalize fw-bold mb-2">{c.name}</h6>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: getStatusColor(c.status),
                      color: "white",
                      fontSize: "0.7rem",
                      padding: "0.35em 0.65em",
                    }}
                  >
                    {c.status}
                  </span>
                  <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.8rem" }}>
                    {c.species} - {c.gender}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Colores según el estado del personaje
const getStatusColor = (status) => {
  const colors = {
    Alive: "#28a745", // verde
    Dead: "#dc3545", // rojo
    unknown: "#6c757d", // gris
  };
  return colors[status] || "#6c757d";
};

export default Home;
