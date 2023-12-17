import { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import AuthTitle from "../../components/ui/AuthTitle.ui";
import AuthBox from "../../components/ui/AuthBox.ui";
import getRouterPath from "../../hooks/getRouterPath.hook";

function SigninPage() {
    const { auth } = getRouterPath();

    // user view: password:
    const [viewPassword, setViewPassword] = useState(false);
    const handleViewPassword = () => setViewPassword((view) => !view);

    //TODO: add user candidates: userEmail, userPassword states

    // handle login user:
    const handleLoginUser = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.get("email") || !data.get("password")) {
            console.error("error: Please fill up the fields");
        } else {
            console.log({
                email: data.get("email"),
                password: data.get("password"),
            });
        }
    };

    return (
        <Container maxWidth="xs">
            <Alert variant="standard" severity="error">
                This is an error alert — check it out!
            </Alert>
            <AuthBox>
                <AuthTitle
                    title="Sign in"
                    description="Welcome back to your Creative space!"
                />
                <Box
                    component="form"
                    action="http://localhost:5000/test"
                    mt={2.5}
                    gap={2.5}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="stretch"
                    alignItems="start"
                    onSubmit={handleLoginUser}
                    noValidate
                >
                    {/* EMAIL INPUT ============================================== */}
                    <FormControl
                        fullWidth
                        required
                        variant="outlined"
                        error={false}
                    >
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <OutlinedInput
                            placeholder="example@example.com"
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                    </FormControl>
                    {/* PASSWORD INPUT ============================================== */}
                    <FormControl
                        fullWidth
                        required
                        variant="outlined"
                        error={false}
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            type={viewPassword ? "text" : "password"}
                            placeholder="xxxxxxxx"
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        tabIndex={-1}
                                        aria-label="toggle password visibility"
                                        onClick={handleViewPassword}
                                        edge="end"
                                    >
                                        {viewPassword ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {/* RESET PASSWORD ============================================== */}
                    <Link to={auth.resetPassword_path} tabIndex={-1}>
                        <Button
                            variant="text"
                            color="info"
                            sx={{ textTransform: "capitalize", p: 0 }}
                        >
                            Forgot password?
                        </Button>
                    </Link>
                    {/* SUBMIT BUTTON ============================================== */}
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        className="fw-b"
                        variant="contained"
                        // disabled
                        disableElevation
                        sx={{ py: 1.5 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </AuthBox>

            {/* SIGNUP BUTTON ============================================== */}
            <Link to={auth.signup_path} tabIndex={-1}>
                <Button
                    disableElevation
                    fullWidth
                    className="fw-b"
                    sx={{ mt: 3, py: 1.5, textTransform: "capitalize" }}
                    variant="text"
                >
                    New to Ketabi? Join now
                </Button>
            </Link>
        </Container>
    );
}

export default SigninPage;
