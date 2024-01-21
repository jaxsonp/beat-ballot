import { React, useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";

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
        <div className="background">
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/sign-in"
                        element={<SignIn setUsername={handleSetUsername} setSessionToken={handleSetSessionToken} />}
                    />
                    <Route
                        path="/sign-up"
                        element={<SignUp setUsername={handleSetUsername} setSessionToken={handleSetSessionToken} />}
                    />
                    <Route path="/home" element={<Home username={username} sessionToken={sessionToken} />} />
                </Routes>
            </Router>
        </div>
    );
}
