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
            <Paper
                style={{
                    padding: "2rem",
                    margin: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
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
                </div>
                <Link to="/sign-in" style={{ margin: "0.5rem" }}>
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
                <Link to="/sign-up" style={{ margin: "0.5rem" }}>
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
                <hr width="500" />
                <Typography
                    variant="body1"
                    style={{
                        width: "600px",
                        margin: "1rem",
                        textAlign: "left",
                        color: "#C0C0C0",
                        textAlign: "justify",
                    }}
                >
                    Welcome to BeatBallot, the world's first democratic music playlist creator. With BeatBallot, you can
                    join your friends in creating collaborative playlists, voting on which songs should stay and which
                    should go. Click the 'Sign Up' button above to join in the fun!
                </Typography>
            </Paper>
        </div>
    );
}
