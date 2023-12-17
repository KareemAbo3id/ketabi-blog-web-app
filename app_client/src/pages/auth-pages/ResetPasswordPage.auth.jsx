
import { Link } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import AuthTitle from "../../components/ui/AuthTitle.ui";
import AuthBox from "../../components/ui/AuthBox.ui";
import getRouterPath from "../../hooks/getRouterPath.hook";

function ResetPasswordPage() {
    const { auth } = getRouterPath();

    //TODO: add userEmail state

    // handle reset password:
    const handleResetPassword = (event) => {
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
        <Container maxWidth="xs">
            <Alert variant="standard" severity="error">
                This is an error alert — check it out!
            </Alert>
            <AuthBox>
                <AuthTitle
                    title="Reset password"
                    description="We will send a verification code to this email if it matches an existing Ketabi account."
                />
                <Box
                    mt={2.5}
                    gap={3}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="stretch"
                    alignItems="start"
                    component="form"
                    onSubmit={handleResetPassword}
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

                    {/* SUBMIT BUTTON ============================================== */}
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        className="fw-b"
                        variant="contained"
                        disabled
                        disableElevation
                        sx={{ py: 1.5 }}
                    >
                        Next
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

export default ResetPasswordPage;
