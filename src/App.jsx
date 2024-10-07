import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./screens/Home";
import Boards from "./screens/Boards";
import Team from "./screens/Team";
import Profile from "./screens/Profile";
import Map from "./screens/Map";
import Board from "./screens/Board";
import Login from "./screens/Login";
import Register from "./screens/Register";


function App() {
  const isLoggedIn = localStorage.getItem("uid"); // Verificar si el UID está en localStorage

  return (
      <Routes>
          <Route
            path="/"
            element={
              <Layout>{isLoggedIn ? <Home /> : <Navigate to="/login" />}</Layout>
            }
          />
          <Route
            path="/boards"
            element={
              <Layout>{isLoggedIn ? <Boards /> : <Navigate to="/login" />}</Layout>
            }
          />
          <Route
            path="/team"
            element={
              <Layout>{isLoggedIn ? <Team /> : <Navigate to="/login" />}</Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                {isLoggedIn ? (
                  <Profile profileId={isLoggedIn} isEditable={true} />
                ) : (
                  <Navigate to="/login" />
                )}
              </Layout>
            }
          />
          <Route
            path="/board/:id"
            element={
              <Layout>{isLoggedIn ? <Board /> : <Navigate to="/login" />}</Layout>
            }
          />
          <Route
            path="/map"
            element={
              <Layout>{isLoggedIn ? <Map /> : <Navigate to="/login" />}</Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout showHeaderFooter={false}>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout showHeaderFooter={false}>
                <Register />
              </Layout>
            }
          />
    </Routes>
  );
}

export default App;
