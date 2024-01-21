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
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const backendURL = "http://127.0.0.1:5000";
const settings = ["Profile", "Logout"];

function Home({ username, sessionToken }) {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(-1);
    const [playlistInfo, setPlaylistInfo_] = useState(null);
    const [users, setUsers] = useState([]);
    const [songs, setSongs] = useState([]);
    const [songSearchOpen, setSongSearchOpen] = React.useState(false);
    const [songSearchResults, setSongSearchResults] = React.useState([]);
    const [pendingSongs, setPendingSongs] = React.useState([]);

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

    function selectPlaylist(id) {
        setSelectedPlaylist(id);
        console.log("getting playlist info");
        fetch(backendURL + "/get-playlist-info/?id=" + id)
            .then((response) => response.json())
            .then((data) => {
                var message = data.message;
                if (message === "success") {
                    //console.log(data.info);
                    setPlaylistInfo(data.info);
                    setSongs(data.info.tracks.items);
                } else {
                    console.log(message);
                    navigate("/home");
                }
            });
        console.log("getting playlist users");
        fetch(backendURL + "/get-playlist-users/?id=" + id)
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
        console.log("getting pending songs");
        fetch(backendURL + "/get-pending-songs/?playlist_id=" + id)
            .then((response) => response.json())
            .then((data) => {
                var message = data.message;
                if (message === "success") {
                    console.log(data.data);
                    setPendingSongs(data.data);
                } else {
                    console.log(message);
                    navigate("/home");
                }
            });
    }

    const handleSongSearchOpen = () => setSongSearchOpen(true);
    const handleSongSearchClose = () => setSongSearchOpen(false);
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };

    const handleSearch = (query) => {
        fetch(backendURL + "/search-song/?track_name=" + query)
            .then((response) => response.json())
            .then((data) => {
                var message = data.message;
                if (message === "success") {
                    setSongSearchResults(data.data.items);
                } else {
                    console.log(message);
                    navigate("/home");
                }
            });
    };

    const setPlaylistInfo = (ob) => {
        setPlaylistInfo_(ob);
    };

    const handleSubmitVote = (track_uri, yesno) => {
        console.log("submitting vote");
        fetch(
            backendURL +
                "/vote/?session=" +
                sessionToken +
                "&playlist_id=" +
                selectedPlaylist +
                "&track_uri=" +
                track_uri +
                "&yesno=" +
                yesno
        )
            .then((response) => response.json())
            .then((data) => {
                var message = data.message;
                if (message === "success") {
                    console.log(data);
                } else {
                    console.log(message);
                    navigate("/home");
                }
            });
    };

    useEffect(() => {
        if (sessionToken === "") {
            navigate("/");
        } else {
            console.log("getting playlists");
            fetch(backendURL + "/get-playlists/?session=" + sessionToken)
                .then((response) => response.json())
                .then((data) => {
                    setPlaylists(data.playlists);
                });
        }
    }, [sessionToken, navigate]);

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
            <div
                className="subheader"
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    margin: "0",
                    padding: "1rem",
                }}
            >
                <Paper elevation={1} style={{ flexGrow: 1, maxWidth: "900px", margin: "1rem" }}>
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
                                onClick={() => selectPlaylist(playlist.id)}
                                style={{
                                    display: "flex",
                                    alignContent: "flex-start",
                                    padding: "1rem",
                                    border: playlist.id === selectedPlaylist ? "4px solid #2090A0" : "",
                                }}
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
                {selectedPlaylist === -1 ? (
                    <></>
                ) : (
                    <div style={{ flexGrow: "4", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {playlistInfo ? (
                            <div style={{ width: "100%", maxWidth: "900px" }}>
                                <Paper elevation={1} style={{ display: "flex", margin: "1rem", padding: "1rem" }}>
                                    <div style={{ flexGrow: 1 }}>
                                        <Button
                                            onClick={() =>
                                                window.open("https://open.spotify.com/playlist/" + playlistInfo.id)
                                            }
                                            variant="text"
                                            style={{ padding: "0.5rem", paddingBottom: "0" }}
                                        >
                                            <Tooltip
                                                title="Link to Spotify"
                                                arrow
                                                onClick={() =>
                                                    window.open("https://open.spotify.com/playlist/" + playlistInfo.id)
                                                }
                                            >
                                                <Typography
                                                    variant="h3"
                                                    style={{ fontWeight: "bold", color: "#e0e0e0" }}
                                                >
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
                                <Paper elevation={1} style={{ margin: "1rem", padding: "1rem" }}>
                                    <div style={{ display: "flex" }}>
                                        <Typography variant="h4" style={{ fontWeight: "bold", flexGrow: 1 }}>
                                            Pending changes:
                                        </Typography>
                                        <Button
                                            style={{ borderColor: "gray", color: "whitesmoke" }}
                                            variant="outlined"
                                            onClick={() => {
                                                handleSongSearchOpen();
                                            }}
                                        >
                                            Start new vote
                                        </Button>
                                    </div>
                                    {pendingSongs.map((song) => (
                                        <Card
                                            key={song.info.id}
                                            variant="outlined"
                                            style={{
                                                padding: "0.5rem",
                                                marginTop: "1rem",
                                                borderColor: "#404040",
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div styles={{ flexGrow: 1 }}>
                                                <Typography variant="h6">{song.info.name}</Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="gray"
                                                    style={{ paddingLeft: "1rem", fontStyle: "italic" }}
                                                >
                                                    {song.info.artists.map((artist) => artist.name).join(", ")}
                                                </Typography>
                                            </div>
                                            <div>Test</div>
                                        </Card>
                                    ))}
                                </Paper>
                                <Paper elevation={1} style={{ margin: "1rem", padding: "1rem" }}>
                                    <Typography variant="h4" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                                        Current songs in playlist:
                                    </Typography>
                                    {songs.map((song) => (
                                        <Card
                                            variant="outlined"
                                            key={song.track.id}
                                            style={{
                                                padding: "0.5rem",
                                                marginBottom: "1rem",
                                                borderColor: "#404040",
                                            }}
                                        >
                                            <Typography variant="h6">{song.track.name}</Typography>
                                            <Typography
                                                variant="body2"
                                                color="gray"
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
                )}
            </div>
            <Modal
                open={songSearchOpen}
                onClose={handleSongSearchClose}
                aria-labelledby="Search for a song"
                aria-describedby="Search for a song by title"
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        style={{ fontWeight: "bold", color: "whitesmoke", marginBottom: "1rem" }}
                    >
                        Search for a song to vote on
                    </Typography>
                    <div style={{ display: "flex" }}>
                        <div style={{ flexGrow: 1, border: "1px solid gray", borderRadius: "4px" }}>
                            <TextField
                                id="standard-search"
                                label="Search field"
                                type="search"
                                variant="standard"
                                style={{
                                    width: "95%",
                                    color: "whitesmoke",
                                    marginLeft: "0.5rem",
                                    padding: "0",
                                }}
                            />
                        </div>
                        <Button
                            variant="outlined"
                            style={{
                                borderColor: "gray",
                                color: "whitesmoke",
                                padding: "8px",
                                margin: "0.5rem",
                            }}
                            onClick={() => handleSearch(document.getElementById("standard-search").value)}
                        >
                            Submit
                        </Button>
                    </div>
                    <br />
                    <div>
                        {songSearchResults.map((song) => (
                            <Card
                                variant="outlined"
                                key={song.id}
                                style={{ padding: "0.25rem", margin: "0.5rem", borderColor: "#404040" }}
                                onClick={() => {
                                    handleSubmitVote(song.uri, 1);
                                }}
                            >
                                <Typography variant="body1">{song.name}</Typography>
                                <Typography variant="body2" style={{ color: "gray", fontStyle: "italic" }}>
                                    {song.artists.map((artist) => artist.name).join(", ")}
                                </Typography>
                            </Card>
                        ))}
                    </div>
                </Box>
            </Modal>
        </Box>
    );
}

export default Home;
