import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Adoptions from "./screens/Adoptions";
import AddPet from "./screens/AddPet";

function App() {
  const isLoggedIn = localStorage.getItem("uid"); // Verificar si el UID está en localStorage

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
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
        path="/add-pet"
        element={
          <Layout>{isLoggedIn ? <AddPet /> : <Navigate to="/login" />}</Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/adoptions"
        element={
          <Layout showHeaderFooter={true}>
            <Adoptions />
          </Layout>
        }
      />
      <Route
        path="/add-pet"
        element={
          <Layout showHeaderFooter={true}>
            <AddPet />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
