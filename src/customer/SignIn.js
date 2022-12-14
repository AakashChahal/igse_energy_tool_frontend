import * as React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    Alert,
    IconButton,
    Collapse,
} from "@mui/material";
import { LockPerson } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            Copyright &copy;{" "}
            <Link
                color="inherit"
                href="https://www.github.com/AakashChahal/"
                target="_blank"
            >
                Aakash Chahal
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function SignIn() {
    // eslint-disable-next-line
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = useState(false);
    const [error, setError] = useState(null);
    const [successLogin, setSuccessLogin] = useState(false);

    const { user, dispatch } = React.useContext(AuthContext);

    const [open, setOpen] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const password = data.get("password");
        const customer_id = data.get("email");

        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("/api/auth/login", {
                customer_id,
                password,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            setOpen(true);
            setSuccessLogin(true);
            setErrorLogin(false);
            navigate("/dashboard");
        } catch (error) {
            if (error.response.status === 300) setError(error);
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
            setOpen(true);
            setErrorLogin(true);
            setSuccessLogin(false);
        }
    };

    return user ? (
        <Navigate to="/dashboard" />
    ) : (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1529704193007-e8c78f0f46f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                            <LockPerson />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 5 }}
                        >
                            {errorLogin && (
                                <Collapse in={open}>
                                    <Alert
                                        severity="error"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpen(false);
                                                    setErrorLogin(false);
                                                    setSuccessLogin(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        {error?.response?.status
                                            ? "You're trying to login with an admin account go to /admin/login"
                                            : "Login failed, please try again"}
                                    </Alert>
                                </Collapse>
                            )}
                            {successLogin && (
                                <Collapse in={open}>
                                    <Alert
                                        severity="success"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpen(false);
                                                    setErrorLogin(false);
                                                    setSuccessLogin(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        Login successful
                                    </Alert>
                                </Collapse>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid
                                container
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "49%",
                                }}
                            >
                                <Grid item>
                                    <Link href="/forgot" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        Don't have an account? Register
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
