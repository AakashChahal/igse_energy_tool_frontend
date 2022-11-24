import * as React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
} from "@mui/material";
import { LockPerson, QrCodeScanner } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QrScanner from "./QrScanner";

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

const theme = createTheme();

const handleChange = (event) => {
    console.log(event.target.value);
};

export default function SignIn() {
    const [isQrClicked, setQrClicked] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    const toggleScanner = () => {
        setQrClicked(!isQrClicked);
    };

    const setQrData = (data) => {
        document.getElementById("evc").focus();
        document.getElementById("evc").value = data;
        document.getElementById("evc").blur();
    };

    return (
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
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockPerson />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 5 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Customer ID (Email Address)"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="property-type">
                                            Property Type
                                        </InputLabel>
                                        <Select
                                            labelId="property-type"
                                            id="property"
                                            value={""}
                                            label="Property Type"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"detached"}>
                                                Detached
                                            </MenuItem>
                                            <MenuItem value={"sem-detached"}>
                                                Semi-Detached
                                            </MenuItem>
                                            <MenuItem value={"terraced"}>
                                                Terraced
                                            </MenuItem>
                                            <MenuItem value={"flat"}>
                                                Flat
                                            </MenuItem>
                                            <MenuItem value={"cottage"}>
                                                Cottage
                                            </MenuItem>
                                            <MenuItem value={"bungalow"}>
                                                Bungalow
                                            </MenuItem>
                                            <MenuItem value={"mansion"}>
                                                Mansion
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="numBedrooms"
                                        label="Number of Bedrooms"
                                        name="numBedrooms"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="evc"
                                        label="8 digits EVC"
                                        name="evc"
                                    />{" "}
                                    <QrCodeScanner
                                        sx={{
                                            marginTop: "15px",
                                            marginBottom: "5px",
                                            cursor: "pointer",
                                        }}
                                        onClick={toggleScanner}
                                    />
                                    {isQrClicked && (
                                        <QrScanner
                                            handleClose={toggleScanner}
                                            setQrData={setQrData}
                                        />
                                    )}
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="allowExtraEmails"
                                                color="primary"
                                            />
                                        }
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Already have an account? Sign in
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
