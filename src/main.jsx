import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./context/AppContext.jsx"; // Importar el Provider

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8E6FAB",
    },
    secondary: {
      main: "#26212E",
    },
    success: {
      main: "#4CAF50",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#26212E",
    },
    GrayText: {
      main: "rgb(79, 77, 81)",
    },
  },
});
// #FFFFFF
// #26212E
// #8E6FAB
//rgb(79, 77, 81)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
