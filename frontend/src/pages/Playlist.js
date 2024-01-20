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

const settings = ["Profile", "Logout"];
const backendURL = "http://127.0.0.1:5000";

export default function Playlist(playlistID, sessionToken, username) {
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
                var status = data.status;
                // if invalid user, banish to sign in
                if (status === 200) {
                    console.log(data.info.name);
                    setPlaylistInfo(data.info.name);
                } else {
                    console.log(status);
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
                        navigate("/home");
                    }}
                >
                    ← Back to playlists
                </Button>
                <Typography>{playlistName}</Typography>
            </div>
        </Box>
    );
}
