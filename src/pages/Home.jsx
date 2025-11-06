import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=9");
        const data = await Promise.all(
          res.data.results.map(async (p) => {
            const details = await axios.get(p.url);
            return {
              name: details.data.name,
              image: details.data.sprites.other["official-artwork"].front_default,
              type: details.data.types[0].type.name,
            };
          })
        );
        setPokemons(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

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
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "3rem" }}>
      <div className="container py-5">
        {/* HERO */}
        <div className="text-center mb-5 p-5 bg-white rounded shadow-sm">
          <h1 className="display-3 fw-bold" style={{ color: "#dc3545" }}>Pokédex React</h1>
          <p className="lead text-muted mt-3">
            Explora y descubre a tus Pokémon favoritos con React y la PokéAPI.
          </p>
        </div>

        {/* LISTADO */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
          {pokemons.map((p) => (
            <div className="col" key={p.name}>
              <div
                className="card border-0 shadow-sm text-center h-100"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  backgroundColor: "white"
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
                    src={p.image}
                    className="img-fluid"
                    style={{ 
                      width: "100%", 
                      height: "100px", 
                      objectFit: "contain" 
                    }}
                    alt={p.name}
                  />
                </div>
                <div className="card-body pt-0">
                  <h6 className="card-title text-capitalize fw-bold mb-2">{p.name}</h6>
                  <span className="badge text-capitalize" style={{
                    backgroundColor: getTypeColor(p.type),
                    color: "white",
                    fontSize: "0.7rem",
                    padding: "0.35em 0.65em"
                  }}>{p.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getTypeColor = (type) => {
  const colors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC"
  };
  return colors[type] || "#A8A878";
};

export default Home;