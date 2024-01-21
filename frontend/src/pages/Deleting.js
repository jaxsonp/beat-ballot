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
import AdbIcon from "@mui/icons-material/Adb";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";

const settings = ["Profile", "Logout"];
const backendURL = "http://127.0.0.1:5000";

export default function Deleting(playlistID, sessionToken, username) {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [playlistName, setPlaylistName] = useState("");

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const setPlaylistInfo = (name) => {
        setPlaylistName(name);
    };

    useEffect(() => {
        // checking if data is loaded
        if (playlistID.playlistID == -1 || sessionToken == "") {
            navigate("/home");
        }
        fetch(backendURL + "/get-playlist-info/?id=" + playlistID.playlistID)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                var message = data.message;
                // if invalid user, banish to sign in
                if (message === "success") {
                    console.log(data.info.name);
                    setPlaylistInfo(data.info.name);
                    // TODO: get songs in playlist and pending changes
                } else {
                    console.log(message);
                    navigate("/home");
                }
            });
    }, [playlistID, sessionToken]);

    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: "flex", mr: 1 }} />
                        <Typography
                            variant="h5"
                            component="a"
                            sx={{
                                display: "flex",
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            BEATBALLOT
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className="subheader" style={{ display: "flex", flexDirection: "row" }}>
                <Button
                    style={{ color: "white", margin: "1rem" }}
                    variant="contained"
                    onClick={() => {
                        navigate("/playlist");
                    }}
                >
                    ← Back to current playlists
                </Button>
            </div>
            <Box>
                <Typography variant="h2">
                    {playlistName}
                </Typography>
                <Box border={1} padding={2} margin={3} bgcolor={grey}>
                    <Typography variant="h4">
                        Users voting to deleting song:
                    </Typography>
                </Box>
                <Box border={1} padding={2} margin={3} bgcolor={grey}>
                    <Typography variant="h4">
                        Users voting against deleting song:
                    </Typography>
                </Box>
                <Button
                    style={{ color: "white", margin: "1rem" }}
                    variant="contained"
                    onClick={() => { /*Todo : function to vote for */}}
                > Vote For
                </Button>
                <Button
                    style={{ color: "white", margin: "1rem" }}
                    variant="contained"
                    onClick={() => { /* Todo: function to vote against */}}
                > Vote Against
                </Button>
            </Box>
        </Box>
    );
}
