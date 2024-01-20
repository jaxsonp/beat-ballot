import { React, useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
    const [sessionToken, setSessionToken] = useState("");
    const [username, setUsername] = useState("");

    function handleSetUsername(str) {
        console.log("Changing username to " + str);
        setUsername(str);
    }

    function handleSetSessionToken(str) {
        console.log("Changing session token to " + str);
        setSessionToken(str);
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
                <Route path="/home" element={<Home username={username} sessionToken={sessionToken} />} />
            </Routes>
        </Router>
    );
}
