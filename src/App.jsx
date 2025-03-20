import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Adoption from "./screens/Adoption";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Adoptions from "./screens/Adoptions";
import AddPet from "./screens/AddPet";
import EditPet from "./screens/EditPet";
import ResumeAdoption from "./screens/ResumeAdoption";
import Forms from "./screens/Forms";
import Form from "./screens/Form";
function App() {
  const isLoggedIn = localStorage.getItem("uid");

  
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
          isLoggedIn ? (
            <Layout>
              <Profile profileId={isLoggedIn} isEditable />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/add-pet"
        element={
          isLoggedIn ? (
            <Layout>
              <AddPet />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/edit-pet"
        element={
          isLoggedIn ? (
            <Layout>
              <EditPet />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/forms"
        element={
          isLoggedIn ? (
            <Layout>
              <Forms />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/form/:formId"
        element={
          isLoggedIn ? (
            <Layout>
              <Form />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
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
          <Layout>
            <Adoptions />
          </Layout>
        }
      />
      <Route
        path="/adoption"
        element={
          <Layout>
            <Adoption />
          </Layout>
        }
      />
      <Route
        path="/resume-adoption"
        element={
          <Layout>
            <ResumeAdoption />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
