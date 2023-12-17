
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import getRouterPath from "../../hooks/getRouterPath.hook";

function NonAuthBtns() {
    const { auth } = getRouterPath();
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
        >
            <Link to={auth.signin_path} tabIndex={-1}>
                <Button disableElevation variant="text">
                    Sign in
                </Button>
            </Link>
            <Link to={auth.signup_path} tabIndex={-1}>
                <Button disableElevation variant="contained">
                    register now
                </Button>
            </Link>
        </Box>
    );
}

export default NonAuthBtns;
