import { Container } from "@mui/material";
import Footer from "../Footer/Footer";
import Navigationbar from "../Navbar/Navigationbar";

const Layout = ({ children, showHeaderFooter = true }) => {
  return (
    <>
      {showHeaderFooter && <Navigationbar />}
      <Container
        sx={{
          padding: {
            xs: 2, // Menor padding para pantallas pequeñas (móviles)
            sm: 3, // Padding intermedio para tablets
            md: 5, // Padding completo para pantallas grandes (escritorio)
          },
          minHeight:{
            xs: '85vh', // Menor padding para pantallas pequeñas (móviles)
            sm: '75vh', // Padding intermedio para tablets
            md: '75vh', // Padding completo para pantallas grandes (escritorio)
          } 
        }}
      >
        {children}
      </Container>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
