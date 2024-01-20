import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const backendURL = "http://127.0.0.1:5000";

export default function SignUp({ setUsername, setSessionToken }) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;
        let empty = false;

        // check for empty fields

        if (!username) {
            empty = true;
        }
        if (!password) {
            empty = true;
        }

        // check for valid inputs
        if (!empty) {
            // TODO add error messages for password parsing
            if (password.includes(" ") || username.includes(" ")) {
                return;
            }
            if (username.length < 4 || username.length > 15) {
                return;
            }
            if (password.length < 2) {
                return;
            }

            console.log({
                username: username.value,
                password: password.value,
            });

            // send username/password to server
            fetch(backendURL + "/create-account?username=" + username + "&password=" + password)
                .then((response) => response.json())
                // get response from server, if valid login, save session token and move to home
                .then((data) => {
                    console.log(data);
                    var message = data.message;
                    if (message === "success") {
                        setUsername(data.username);
                        setSessionToken(data["session-token"]);
                        navigate("/home");
                    }
                });
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up For BeatBallot
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField margin="normal" required fullWidth id="username" label="Username" name="username" />
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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
