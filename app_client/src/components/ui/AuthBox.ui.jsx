
import PropTypes from "prop-types";
import { Box } from "@mui/material";

function AuthBox(props) {
    const { children } = props;
    return (
        <Box
            sx={{
                backgroundColor: "white.main",
                marginTop: 2,
                px: 2,
                pt: 5,
                pb: 2.5,
                borderRadius: 1,
                boxShadow:
                    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
        >
            {children}
        </Box>
    );
}

AuthBox.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthBox;
