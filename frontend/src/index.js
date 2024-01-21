import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#121212",
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
            secondary: "#2CC789",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
