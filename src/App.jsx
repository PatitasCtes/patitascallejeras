import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./screens/Home"; // Inicio
import Boards from "./screens/Boards"; // Tableros
import Team from "./screens/Team"; // Equipo
import Profile from "./screens/Profile"; // Perfil
import Map from "./screens/Map";
import Board from "./screens/Board";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} /> {/* Tableros */}
        <Route path="/team" element={<Team />} /> {/* Equipo */}
        <Route path="/profile" element={<Profile />} /> {/* Perfil */}
        <Route path="/board/:id" element={<Board />} />{" "}
        {/* Parámetro dinámico :id */}
        <Route path="/map" element={<Map />} /> {/* Mapa */}
      </Routes>
    </Layout>
  );
}

export default App;
