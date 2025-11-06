import { useEffect, useState } from "react";
import axios from "axios";

export default function Items() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favs") || "[]");
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        const results = res.data.results.map((c) => ({
          id: c.id,
          name: c.name,
          image: c.image,
          status: c.status,
          species: c.species,
          gender: c.gender,
          origin: c.origin.name,
        }));
        setCharacters(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const toggleFav = (name) => {
    let updated;
    if (favorites.includes(name)) {
      updated = favorites.filter((f) => f !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem("favs", JSON.stringify(updated));
  };

  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



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
    <div className="container mt-4 mb-5">
      {/* Header con búsqueda */}
      <div className="text-center mb-4">
        <h1 className="mb-3" style={{ color: "#198754" }}>
          Lista de Personajes
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Buscar personaje..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: "#198754" }}
            />
          </div>
        </div>
        <p className="text-muted mt-2">
          Encontrados: {filteredCharacters.length} | Favoritos: {favorites.length}
        </p>
      </div>

      {/* Grid de personajes */}
      <div className="row g-4">
        {filteredCharacters.map((char) => {
          const isFav = favorites.includes(char.name);
          return (
            <div key={char.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card shadow-sm h-100 border-0 position-relative"
                style={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
                }}
              >
                {/* ID del personaje */}
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge bg-secondary" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                    #{String(char.id).padStart(3, "0")}
                  </span>
                </div>

                <div className="text-center pt-4 mt-2">
                  <img
                    src={char.image}
                    className="img-fluid rounded"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    alt={char.name}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-3">{char.name}</h5>
                  <div className="mb-3">
                    <small className="d-block">
                      <strong>Estado:</strong>{" "}
                      <span
                        className="badge"
                        style={{
                          backgroundColor: getStatusColor(char.status),
                          color: "white",
                        }}
                      >
                        {char.status}
                      </span>
                    </small>
                    <small className="text-muted d-block">
                      <strong>Especie:</strong> {char.species}
                    </small>
                    <small className="text-muted d-block">
                      <strong>Género:</strong> {char.gender}
                    </small>
                    <small className="text-muted d-block">
                      <strong>Origen:</strong> {char.origin}
                    </small>
                  </div>
                  <button
                    onClick={() => toggleFav(char.name)}
                    className={`btn btn-sm w-100 ${isFav ? "btn-success" : "btn-outline-success"}`}
                    style={{
                      transition: "all 0.2s",
                    }}
                  >
                    {isFav ? "★ Favorito" : "☆ Favorito"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center mt-5">
          <h3 className="text-muted">No se encontraron personajes</h3>
          <p className="text-muted">Intenta con otro nombre</p>
        </div>
      )}
    </div>
  );
}

// Colores según el estado
const getStatusColor = (status) => {
  const colors = {
    Alive: "#28a745",
    Dead: "#dc3545",
    unknown: "#6c757d",
  };
  return colors[status] || "#6c757d";
};
