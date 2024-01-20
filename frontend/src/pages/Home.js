import { React } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Button } from "@mui/material";
import PlaylistCard from "../components/PlaylistCard";

const settings = ["Profile", "Logout"];
const backendURL = "http://127.0.0.1:5000";

function Home({ username, sessionToken }) {
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

    const getPlaylists = () => {
        fetch(backendURL + "/get-playlists/?session=" + sessionToken)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                var status = data.status;
                // if invalid user, banish to sign in
                if (status === 200) {
                    console.log("setting playlists");
                    setPlaylists(data.playlists);
                } else {
                    console.log(status);
                }
            });
    };

    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
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
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
                        <Typography
                            variant="subtitle1"
                            textAlign="right"
                            style={{
                                margin: "1rem",
                                verticalAlign: "middle",
                            }}
                        >
                            Logged in as {username}
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
                <Box style={{ flexGrow: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleNewPlaylistGeneration();
                        }}
                    >
                        Create New
                    </Button>
                </Box>
                <div style={{ flexGrow: 4 }}>
                    {playlists.map((card) => (
                        <PlaylistCard key={card.id} name={card.name} />
                    ))}
                </div>
            </div>
        </Box>
    );
}

export default Home;
