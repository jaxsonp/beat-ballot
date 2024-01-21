import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#191919",
        },
        secondary: {
            main: "#202020",
        },
        background: {
            default: "#202020",
            paper: "#202020",
        },
        text: {
            primary: "rgba(255,255,255,0.85)",
            secondary: "rgba(0,255,95,0.54)",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
