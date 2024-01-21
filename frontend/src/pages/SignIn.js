import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";

const backendURL = "http://127.0.0.1:5000";

export default function SignIn({ setUsername, setSessionToken }) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        // check for empty fields

        if (!username || !password) {
            setError(true);
            setErrorMessage("Please fill out all the necessary inputs!");
            return;
        }

        // print username/password to console
        console.log({
            username: username,
            password: password,
        });
        // check for valid inputs
        // send username/password to server
        fetch(backendURL + "/sign-in?username=" + username + "&password=" + password)
            .then((response) => response.json())
            // get response from server, if valid login, save session token and move to home
            .then((data) => {
                console.log(data);
                var message = data.message;
                if (message === "success") {
                    // note: session token is shared from app.js
                    setError(false);
                    setErrorMessage("");
                    setUsername(data.username);
                    setSessionToken(data["session-token"]);
                    console.log("token at sign in is:");
                    console.log(data["session-token"]);
                    navigate("/home");
                } else {
                    setError(true);
                    setErrorMessage(message);
                }
            });
    }

    return (
        <Paper component="main" maxWidth="800px">
            <CssBaseline />
            {error ? <Alert severity="error">{errorMessage}</Alert> : <></>}
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "light-gray", marginTop: "1rem" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="showPassword"
                                color="primary"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                        }
                        label="Show Password"
                    />
                    <Button
                        style={{ backgroundColor: "#29B77E" }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h5" style={{ margin: "1rem" }}>
                            Or
                        </Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            style={{ backgroundColor: "#29B77E", margin: "1rem", marginTop: "0px" }}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigate("/sign-up")}
                        >
                            Sign Up
                        </Button>
                    </div>
                </Box>
            </Box>
        </Paper>
    );
}
