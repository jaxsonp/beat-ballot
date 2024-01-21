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

const backendURL = "http://127.0.0.1:5000";
const settings = ["Profile", "Logout"];

function Home({ username, sessionToken, setPlaylist }) {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(-1);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function handleNewPlaylistGeneration() {
        console.log(sessionToken);
        // send json request to server to validate user
        fetch(backendURL + "/create-playlist/?session=" + sessionToken + "&name=new-playlist")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                var status = data.status;
                // if invalid user, banish to sign in
                if (status === 400) {
                    navigate("/sign-in");
                } else {
                    console.log(status);
                }
            });
    }

    function openPage(id) {
        setPlaylist(id);
        navigate("/playlist");
    }

    useEffect(() => {
        if (sessionToken === "") {
            navigate("/");
        } else {
            console.log("getting playlists");
            fetch(backendURL + "/get-playlists/?session=" + sessionToken)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.playlists);
                    setPlaylists(data.playlists);
                });
        }
    }, [sessionToken]);

    return (
        <Box>
            <AppBar position="static" enableColorOnDark={false}>
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
            <div className="subheader" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Paper elevation={1} style={{ width: "100%", maxWidth: "900px", margin: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Typography variant="h4" style={{ margin: "1rem", fontWeight: "bold" }}>
                            {username}'s Playlists:
                        </Typography>
                        <Box>
                            <Button
                                variant="outlined"
                                style={{ borderColor: "gray", color: "whitesmoke", margin: "1rem" }}
                                onClick={() => {
                                    handleNewPlaylistGeneration();
                                }}
                            >
                                Create New
                            </Button>
                        </Box>
                    </div>
                    {playlists.map((playlist) => (
                        <Card key={playlist.id} style={{ margin: "1rem", borderColor: "#505050" }} variant="outlined">
                            <CardActionArea
                                onClick={() => openPage(playlist.id)}
                                style={{ display: "flex", alignContent: "flex-start", padding: "1rem" }}
                            >
                                <img
                                    alt="cover image"
                                    src={
                                        playlist.data.images == null
                                            ? "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
                                            : playlist.data.images[0].url
                                    }
                                    width="48"
                                    height="48"
                                ></img>
                                <Typography style={{ marginLeft: "1rem", flexGrow: 1 }} variant="h5" component="div">
                                    {playlist.data.name}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    ))}
                </Paper>
            </div>
        </Box>
    );
}

export default Home;
