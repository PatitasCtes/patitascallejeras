import { Container } from "@mui/material";
import Footer from "../Footer/Footer";
import Navigationbar from "../Navbar/Navigationbar";

const Layout = ({ children, showHeaderFooter = true }) => {
  return (
    <>
      {showHeaderFooter && <Navigationbar />}
      <Container sx={{ padding: 5 }}>{children}</Container>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
