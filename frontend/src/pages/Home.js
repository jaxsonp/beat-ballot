import React, { useEffect } from "react";
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

const backendURL = "http://127.0.0.1:5000";
const settings = ["Profile", "Logout"];

function Home({ username, sessionToken, setPlaylist }) {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [playlists, setPlaylists] = React.useState([]);

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
        if (sessionToken == "") {
            navigate("/");
        } else {
            console.log("getting playlists");
            fetch(backendURL + "/get-playlists/?session=" + sessionToken)
                .then((response) => response.json())
                .then((data) => {
                    setPlaylists(data.playlists);
                });
        }
    }, [sessionToken]);

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
                <div style={{ flexGrow: 1 }}>
                    <Box>
                        <Button
                            variant="contained"
                            style={{ color: "white", margin: "1rem" }}
                            onClick={() => {
                                handleNewPlaylistGeneration();
                            }}
                        >
                            Create New
                        </Button>
                    </Box>
                </div>
                <Paper elevation={3} style={{ flexGrow: 4, margin: "1rem" }}>
                    <Typography variant="h4" style={{ margin: "1rem" }}>
                        {username}'s playlists
                    </Typography>
                    {playlists.map((playlist) => (
                        <Card key={playlist.id} style={{ margin: "1rem" }} variant="outlined">
                            <CardActionArea onClick={() => openPage(playlist.id)}>
                                <Typography style={{ margin: "1rem" }} variant="h5" component="div">
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
