import { React, useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Adding from "./pages/Adding";
import Deleting from "./pages/Deleting";

export default function App() {
    const [sessionToken, setSessionToken] = useState("");
    const [username, setUsername] = useState("");
    const [playlistID, setPlaylistID] = useState(-1);

    function handleSetUsername(str) {
        console.log("Changing username to " + str);
        setUsername(str);
    }

    function handleSetSessionToken(str) {
        console.log("Changing session token to " + str);
        setSessionToken(str);
    }

    function handleSetPlaylistID(id) {
        console.log("Changing playlist ID to " + id);
        setPlaylistID(id);
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <header>
                            <h1>Beat Ballot</h1>
                            <a href="/sign-in">sign in</a>
                            <br />
                            <a href="/sign-up">sign up</a>
                        </header>
                    }
                />
                <Route
                    path="/sign-in"
                    element={<SignIn setUsername={handleSetUsername} setSessionToken={handleSetSessionToken} />}
                />
                <Route
                    path="/sign-up"
                    element={<SignUp setUsername={handleSetUsername} setSessionToken={handleSetSessionToken} />}
                />
                <Route
                    path="/playlist"
                    element={<Playlist playlistID={playlistID} username={username} sessionToken={sessionToken} />}
                />
                <Route
                    path="/home"
                    element={<Home username={username} sessionToken={sessionToken} setPlaylist={handleSetPlaylistID} />}
                />
                <Route
                    path="/adding"
                    element={<Adding username={username} sessionToken={sessionToken} setPlaylist={handleSetPlaylistID} />}
                />
                <Route
                    path="/deleting"
                    element={<Deleting username={username} sessionToken={sessionToken} setPlaylist={handleSetPlaylistID} />}
                />
            </Routes>
        </Router>
    );
}
