import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Home from "./Home";

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

const defaultTheme = createTheme();
const backendURL = "http://127.0.0.1:5000";

export default function SignIn({ setUsername, setSessionToken }) {
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

<<<<<<< HEAD
        
        // TODO: send to backend to check if valid login
        console.log({
            username: username,
            password: password,
        });
    }
}
=======
        // check for valid inputs
>>>>>>> main

        if (!empty) {
            // print username/password to console
            console.log({
                username: username,
                password: password,
            });

            // send username/password to server
            fetch(backendURL + "/sign-in?username=" + username + "&password=" + password)
                .then((response) => response.json())
                // get response from server, if valid login, save session token and move to home
                .then((data) => {
                    console.log(data);
                    var message = data.message;
                    if (message === "success") {
                        //Home.updateSessionToken(data.sessionToken);
                        //Home.updateUsername(data.username);
                        setUsername(data.username);
                        console.log(data);
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
                        Sign in
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
<<<<<<< HEAD
<<<<<<< HEAD
                    }
                    label="Show Password"
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Sign Up for BeatBallot"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
=======
=======
>>>>>>> backend
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Sign Up to BeatBallot"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> backend
