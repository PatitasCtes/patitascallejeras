import { Container } from "@mui/material";
import Footer from "../Footer/Footer";
import Navigationbar from "../Navbar/Navigationbar";

const Layout = (props) => {
  return (
    <>
      <Navigationbar />
      <Container sx={{ padding: 5 }}>{props.children}</Container>

      <Footer />
    </>
  );
};

export default Layout;
