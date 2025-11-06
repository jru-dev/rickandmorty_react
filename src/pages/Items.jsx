import { useEffect, useState } from "react";
import axios from "axios";

export default function Items() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favs") || "[]");
  });

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(async (res) => {
        const results = res.data.results;
        const detailed = await Promise.all(
          results.map(async (p) => {
            const data = await axios.get(p.url);
            return {
              name: data.data.name,
              image: data.data.sprites.front_default,
              height: data.data.height,
              weight: data.data.weight,
              id: data.data.id
            };
          })
        );
        setPokemons(detailed);
        setLoading(false);
      });
  }, []);

  const toggleFav = (name) => {
    let updated;
    if (favorites.includes(name)) {
      updated = favorites.filter(f => f !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem("favs", JSON.stringify(updated));
  };

  const filteredPokemons = pokemons.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Header con búsqueda */}
      <div className="text-center mb-4">
        <h1 className="mb-3" style={{ color: "#dc3545" }}>
          🔍 Lista de Pokémon
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Buscar Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: "#dc3545" }}
            />
          </div>
        </div>
        <p className="text-muted mt-2">
          Encontrados: {filteredPokemons.length} | Favoritos: {favorites.length}
        </p>
      </div>

      {/* Grid de Pokémon */}
      <div className="row g-4">
        {filteredPokemons.map((poke) => {
          const isFav = favorites.includes(poke.name);
          return (
            <div key={poke.name} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card shadow-sm h-100 border-0 position-relative"
                style={{
                  transition: "transform 0.2s, box-shadow 0.2s"
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
                {/* Número de Pokédex */}
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge bg-secondary" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                    #{String(poke.id).padStart(3, '0')}
                  </span>
                </div>

                <div className="text-center pt-4 mt-2">
                  <img 
                    src={poke.image} 
                    className="img-fluid" 
                    style={{ width: "120px", height: "120px", objectFit: "contain" }}
                    alt={poke.name}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title text-capitalize fw-bold mb-3">
                    {poke.name}
                  </h5>
                  <div className="mb-3">
                    <small className="text-muted d-block">
                      <strong>Altura:</strong> {poke.height}
                    </small>
                    <small className="text-muted d-block">
                      <strong>Peso:</strong> {poke.weight}
                    </small>
                  </div>
                  <button
                    onClick={() => toggleFav(poke.name)}
                    className={`btn btn-sm w-100 ${isFav ? "btn-danger" : "btn-outline-danger"}`}
                    style={{
                      transition: "all 0.2s"
                    }}
                  >
                    {isFav ? " Favorito" : " Favorito"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPokemons.length === 0 && (
        <div className="text-center mt-5">
          <h3 className="text-muted">No se encontraron Pokémon</h3>
          <p className="text-muted">Intenta con otro nombre</p>
        </div>
      )}
    </div>
  );
}