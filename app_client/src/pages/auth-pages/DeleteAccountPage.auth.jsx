import { useState } from "react";
import { Link } from "react-router-dom";
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
    Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AuthTitle from "../../components/ui/AuthTitle.ui";
import AuthBox from "../../components/ui/AuthBox.ui";
import getRouterPath from "../../hooks/getRouterPath.hook";

function DeleteAccountPage() {
    const { auth } = getRouterPath();

    // user view: password:
    const [viewPassword, setViewPassword] = useState(false);
    const handleViewPassword = () => setViewPassword((view) => !view);

    //TODO: add userPassword state

    // handle reset password:
    const handleDeleteAccount = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get("email") || !data.get("password")) {
            console.log("error");
        } else {
            console.log({
                email: data.get("email"),
                password: data.get("password"),
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Alert variant="standard" severity="error">
                This is an error alert — check it out!
            </Alert>
            <AuthBox>
                <AuthTitle
                    title="Delete your account"
                    titleColor="error"
                    description="Warning! this action is permanent, your account will be permanently deleted with all of your data and posts."
                />
                <Box
                    mt={2.5}
                    gap={2}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="stretch"
                    alignItems="start"
                    component="form"
                    onSubmit={handleDeleteAccount}
                    noValidate
                >
                    <Typography component="p" variant="body1" className="fw-b">
                        Type your password to confirm deletion
                    </Typography>
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

                    {/* SUBMIT BUTTON ============================================== */}
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        color="error"
                        className="fw-b"
                        variant="contained"
                        disabled
                        disableElevation
                        sx={{ py: 1.5 }}
                    >
                        I understand, Delete my account
                    </Button>
                    <Link
                        to={auth.signin_path}
                        tabIndex={-1}
                        style={{ width: "100%" }}
                    >
                        <Button
                            disableElevation
                            fullWidth
                            color="secondary"
                            sx={{ textTransform: "capitalize" }}
                            variant="text"
                        >
                            Back
                        </Button>
                    </Link>
                </Box>
            </AuthBox>

            {/* SIGNUP BUTTON ============================================== */}
        </Container>
    );
}

export default DeleteAccountPage;
