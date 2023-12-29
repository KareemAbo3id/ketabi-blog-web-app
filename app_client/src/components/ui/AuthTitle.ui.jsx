import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

function AuthTitle(props) {
    const { title, description, titleColor = "" } = props;
    return (
        <Box component="div" textAlign="start" width="100%" pb={1}>
            <Typography
                component="h1"
                variant="h4"
                className="fw-b"
                color={titleColor}
            >
                {title}
            </Typography>
            {description ? (
                <Typography
                    component="p"
                    variant="body2"
                    color="GrayText"
                    mt={1}
                >
                    {description}
                </Typography>
            ) : null}
        </Box>
    );
}

AuthTitle.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    titleColor: PropTypes.string,
};

export default AuthTitle;
