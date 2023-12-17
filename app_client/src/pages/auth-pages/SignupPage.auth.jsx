import { useState } from "react";
import getRouterPath from "../../hooks/getRouterPath.hook";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import AuthTitle from "../../components/ui/AuthTitle.ui";
import AuthBox from "../../components/ui/AuthBox.ui";

function SignupPage() {
    const { auth } = getRouterPath();

    // user view: password, confirm password:
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConPassword, setViewConPassword] = useState(false);
    const handleViewPassword = () => setViewPassword((view) => !view);
    const handleViewConPassword = () => setViewConPassword((view) => !view);

    // user agreement Check:
    const [agreementChecked, setAgreementChecked] = useState(false);
    const handleAgreementChange = (event) => {
        setAgreementChecked(event.target.checked);
    };

    //TODO: add user candidates: userFullname, userEmail, userPassword, userAgreementCheck states
    const [userFullname, setUserFullname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConPassword, setUserConPassword] = useState("");
    const [userAgreementCheck, setUserAgreementCheck] = useState(false);

    // handle signup user:
    const handleSignupUser = (event) => {
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
                    title="Create New Account"
                    description="Please fill out the following fields"
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
                    onSubmit={handleSignupUser}
                    noValidate
                >
                    {/* FULLNAME INPUT ============================================== */}
                    <FormControl
                        size="small"
                        fullWidth
                        required
                        variant="outlined"
                        error={false}
                    >
                        <InputLabel htmlFor="fullname">Fullname</InputLabel>
                        <OutlinedInput
                            placeholder="John Doe"
                            type="text"
                            id="fullname"
                            label="Fullname"
                            name="fullname"
                            autoFocus
                        />
                    </FormControl>
                    {/* EMAIL INPUT ============================================== */}
                    <FormControl
                        fullWidth
                        size="small"
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
                        />
                    </FormControl>
                    {/* PASSWORD INPUT ============================================== */}
                    <FormControl
                        fullWidth
                        size="small"
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
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        tabIndex={-1}
                                        aria-label="toggle password visibility"
                                        onClick={handleViewPassword}
                                        edge="end"
                                    >
                                        {viewPassword ? (
                                            <VisibilityOffIcon fontSize="small" />
                                        ) : (
                                            <VisibilityIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {/* CONFIRM PASSWORD INPUT ============================================== */}
                    <FormControl
                        fullWidth
                        size="small"
                        required
                        variant="outlined"
                        error={false}
                    >
                        <InputLabel htmlFor="confirmPassword">
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput
                            type={viewConPassword ? "text" : "password"}
                            placeholder="xxxxxxxx"
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        tabIndex={-1}
                                        aria-label="toggle confirmPassword visibility"
                                        onClick={handleViewConPassword}
                                        edge="end"
                                    >
                                        {viewConPassword ? (
                                            <VisibilityOffIcon fontSize="small" />
                                        ) : (
                                            <VisibilityIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {/* AGREEMENT ============================================== */}
                    <FormControlLabel
                        checked={agreementChecked}
                        onChange={handleAgreementChange}
                        required
                        control={<Checkbox size="small" />}
                        label={
                            <Typography variant="caption" color="GrayText">
                                Confirm that you are agree to the Ketabi{" "}
                                <Link> User Agreement</Link>,{" "}
                                <Link> Privacy Policy</Link>, and{" "}
                                <Link> Cookie Policy</Link>.
                            </Typography>
                        }
                    />
                    {/* SUBMIT BUTTON ============================================== */}
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        className="fw-b"
                        variant="contained"
                        disableElevation
                        disabled={false}
                        sx={{ py: 1.5 }}
                    >
                        Agree & create my account
                    </Button>
                </Box>
            </AuthBox>
            {/* SIGNUP BUTTON ============================================== */}
            <Link to={auth.signin_path}>
                <Button
                    disableElevation
                    fullWidth
                    className="fw-b"
                    sx={{ mt: 3, py: 1.5, textTransform: "capitalize" }}
                    variant="text"
                >
                    Already on Ketabi? Sign in
                </Button>
            </Link>
        </Container>
    );
}

export default SignupPage;
