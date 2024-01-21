import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
    palette: {
        loudgreen: "#52E354",
    },
});

export default function Landing() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper style={{ padding: "2rem", margin: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", marginBottom: "2rem" }}>
                        <img src="/icon512.png" style={{ width: "10rem", marginRight: "3rem" }} alt="large icon" />
                        <Typography
                            variant="h1"
                            style={{ flexGrow: 1, fontFamily: "monospace", letterSpacing: ".3rem", marginTop: "3rem" }}
                        >
                            BeatBallot
                        </Typography>
                    </div>
                    <Typography variant="body1" style={{ marginBottom: "1rem", textAlign: "left", color: "white" }}>
                        hello
                    </Typography>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "1rem",
                    }}
                >
                    <Link to="/sign-in">
                        <Button
                            style={{
                                backgroundColor: "#29B77E",
                                color: "white",
                                fontFamily: "monospace",
                                width: "120px",
                                height: "40px",
                            }}
                            variant="contained"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link to="/sign-up">
                        <Button
                            style={{
                                backgroundColor: "#29B77E",
                                color: "white",
                                fontFamily: "monospace",
                                width: "120px",
                                height: "40px",
                            }}
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
                <hr></hr>
            </Paper>
        </div>
    );
}
