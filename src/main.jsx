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
import StateCompo from "./context/StateCompo.jsx";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5106B7",
    },
    secondary: {
      main: "#AA7DED",
    },
    success: {
      main: "#3f51b5",
    },
  },
});
// #FCC419
// #AA7DED
// #5106B7
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StateCompo>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </StateCompo>
    </ThemeProvider>
  </React.StrictMode>
);
