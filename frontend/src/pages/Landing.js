import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { CardActionArea } from "@mui/material";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";

export default function Landing() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper style={{ padding: "2rem", margin: "2rem" }}>
                <div style={{ display: "flex", marginBottom: "2rem" }}>
                    <img src="/icon512.png" style={{ width: "10rem", marginRight: "3rem" }} alt="large icon" />
                    <Typography variant="h1" style={{ flexGrow: 1, marginTop: "3rem" }}>
                        BeatBallot
                    </Typography>
                </div>
                <Button>Sign in</Button>
                <hr></hr>
            </Paper>
        </div>
    );
}
