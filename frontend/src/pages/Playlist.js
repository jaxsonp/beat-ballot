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
import { grey } from "@mui/material/colors";

const settings = ["Profile", "Logout"];
const backendURL = "http://127.0.0.1:5000";

export default function Playlist(playlistID, sessionToken, username) {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [playlistInfo, setPlaylistInfo_] = useState(null);
    const [users, setUsers] = useState([]);
    const [songs, setSongs] = useState([]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const setPlaylistInfo = (ob) => {
        setPlaylistInfo_(ob);
    };

    useEffect(() => {
        // checking if data is loaded
        if (playlistID.playlistID === -1 || sessionToken === "") {
            navigate("/home");
        }
        fetch(backendURL + "/get-playlist-info/?id=" + playlistID.playlistID)
            .then((response) => response.json())
            .then((data) => {
                var message = data.message;
                if (message === "success") {
                    console.log(data.info);
                    setPlaylistInfo(data.info);
                    setSongs(data.info.tracks.items);
                } else {
                    console.log(message);
                    navigate("/home");
                }
            });
        fetch(backendURL + "/get-playlist-users/?id=" + playlistID.playlistID)
            .then((response) => response.json())
            .then((data) => {
                var message = data.message;
                if (message === "success") {
                    setUsers(data.users);
                } else {
                    console.log(message);
                    navigate("/home");
                }
            });
    }, [playlistID, sessionToken, navigate]);

    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src="/icon192.png" style={{ width: "2.5rem", marginRight: "1.5rem" }} alt="icon" />
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
                    ← Back to all playlists
                </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {playlistInfo ? (
                    <div style={{ width: "100%", maxWidth: "900px" }}>
                        <Paper elevation={3} style={{ display: "flex", margin: "1rem", padding: "1rem" }}>
                            <div style={{ flexGrow: 1 }}>
                                <Button
                                    onClick={() => window.open("https://open.spotify.com/playlist/" + playlistInfo.id)}
                                    variant="text"
                                    style={{ padding: "0.5rem", paddingBottom: "0" }}
                                >
                                    <Tooltip title="Link to Spotify" arrow>
                                        <Typography variant="h3" style={{ fontWeight: "medium" }}>
                                            {playlistInfo.name}
                                        </Typography>
                                    </Tooltip>
                                </Button>
                                <Typography variant="subtitle1">{playlistInfo.description}</Typography>
                                <hr />
                                <Typography variant="h6">Members:</Typography>
                                <ul style={{ margin: "0", paddingLeft: "1.5rem" }}>
                                    {users.map((user) => (
                                        <li key={user}>
                                            <Typography variant="body2">{user}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <img
                                alt="Playlist cover image"
                                src={
                                    playlistInfo.images == null
                                        ? "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
                                        : playlistInfo.images[0].url
                                }
                                width="200px"
                                height="200px"
                                style={{ margin: "1rem" }}
                            ></img>
                        </Paper>
                        <Paper elevation={3} style={{ margin: "1rem", padding: "1rem" }}>
                            <div style={{ display: "flex" }}>
                                <Typography variant="h4" style={{ fontWeight: "bold", flexGrow: 1 }}>
                                    Pending changes:
                                </Typography>
                                <Button
                                    style={{ color: "white" }}
                                    variant="contained"
                                    onClick={() => {
                                        /* Todo: function to delete from playlist */
                                    }}
                                >
                                    Start new vote
                                </Button>
                            </div>
                        </Paper>
                        <Paper elevation={3} style={{ margin: "1rem", padding: "1rem" }}>
                            <Typography variant="h4" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                                Current songs in playlist:
                            </Typography>
                            {songs.map((song) => (
                                <Card key={song.track.id} style={{ padding: "0.5rem", marginBottom: "1rem" }}>
                                    <Typography variant="h6">{song.track.name}</Typography>
                                    <Typography
                                        variant="body2"
                                        color={grey}
                                        style={{ paddingLeft: "1rem", fontStyle: "italic" }}
                                    >
                                        {song.track.artists.map((artist) => artist.name).join(", ")}
                                    </Typography>
                                </Card>
                            ))}
                        </Paper>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </Box>
    );
}
