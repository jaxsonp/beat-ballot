/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const settings = ["Profile", "Logout"];
const backendURL = "http://127.0.0.1:5000";

export default function Playlist(playlistID, sessionToken, username) {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        // checking if data is loaded
        if (playlistID.playlistID === -1 || sessionToken === "") {
            navigate("/home");
        }
        setSessionToken(`${sessionToken}`);
        console.log("token");
        console.log(sessionToken);
        fetch(backendURL + "/get-playlist-info/?id=" + playlistID.playlistID)
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
        fetch(backendURL + "/get-pending-songs/?playlist_id=" + playlistID.playlistID)
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
    }, [playlistID, sessionToken, navigate]);

    return (

    );
}
*/
