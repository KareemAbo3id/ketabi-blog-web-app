import { useState } from "react";
import getRouterPath from "../../hooks/getRouterPath.hook";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
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
import CustomizedSnackbar from "../../components/ui/CustomizedSnackbar.ui";

function SignupPage() {
    const { auth } = getRouterPath();

    const [userFirstname, setUserFirstname] = useState("");
    const [userLastname, setUserLastname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConPassword, setUserConPassword] = useState("");
    const [userAgreementCheck, setUserAgreementCheck] = useState(false);

    // user view: password, confirm password:
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConPassword, setViewConPassword] = useState(false);
    const handleViewPassword = () => setViewPassword((view) => !view);
    const handleViewConPassword = () => setViewConPassword((view) => !view);

    // handle alert snackbar
    const [isSubmitBtn, setIsSubmitBtn] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // handle signup user:
    const handleSignupUser = (event) => {
        event.preventDefault();

        if (
            userFirstname === "" ||
            userLastname === "" ||
            userEmail === "" ||
            userUsername === "" ||
            userPassword === "" ||
            userConPassword === "" ||
            userAgreementCheck === ""
        ) {
            setIsSnackbarOpen(true);
            setSnackbarMessage("Error, Please fill out the required fields");
        } else {
            setIsSubmitBtn(!isSubmitBtn);
            console.log({
                userFirstname,
                userLastname,
                userEmail,
                userUsername,
                userPassword,
                userConPassword,
                userAgreementCheck,
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <CustomizedSnackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                setIsOpen={setIsSnackbarOpen}
            />
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
                    <Box
                        gap={2}
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        justifyContent="stretch"
                        alignItems="center"
                    >
                        {/* FIRSTNAME INPUT ============================================== */}
                        <FormControl
                            size="small"
                            fullWidth
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="firstname">
                                First name
                            </InputLabel>
                            <OutlinedInput
                                value={userFirstname}
                                onChange={(e) =>
                                    setUserFirstname(e.target.value)
                                }
                                placeholder="John"
                                type="text"
                                id="firstname"
                                label="Firstname"
                                name="firstname"
                                autoFocus
                            />
                        </FormControl>
                        {/* LASTNAME INPUT ============================================== */}
                        <FormControl
                            size="small"
                            fullWidth
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="lastname">
                                Last name
                            </InputLabel>
                            <OutlinedInput
                                value={userLastname}
                                onChange={(e) =>
                                    setUserLastname(e.target.value)
                                }
                                placeholder="Doe"
                                type="text"
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                            />
                        </FormControl>
                    </Box>
                    {/* EMAIL INPUT ============================================== */}
                    <FormControl
                        fullWidth
                        size="small"
                        required
                        variant="outlined"
                    >
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <OutlinedInput
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="example@example.com"
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                    </FormControl>
                    {/* USERNAME INPUT ============================================== */}
                    <FormControl
                        size="small"
                        fullWidth
                        required
                        variant="outlined"
                    >
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            value={userUsername}
                            onChange={(e) => setUserUsername(e.target.value)}
                            placeholder="@johndoe"
                            type="text"
                            id="username"
                            label="Username"
                            name="username"
                        />
                    </FormControl>
                    {/* PASSWORD INPUT ============================================== */}
                    <FormControl
                        fullWidth
                        size="small"
                        required
                        variant="outlined"
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
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
                    >
                        <InputLabel htmlFor="confirmPassword">
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput
                            value={userConPassword}
                            onChange={(e) => setUserConPassword(e.target.value)}
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
                        checked={userAgreementCheck}
                        onChange={() =>
                            setUserAgreementCheck(event.target.checked)
                        }
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
                        disabled={isSubmitBtn}
                        sx={{ py: 1.5 }}
                    >
                        {isSubmitBtn ? (
                            <CircularProgress color="primary" size={25} />
                        ) : (
                            "Agree & create my account"
                        )}
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
