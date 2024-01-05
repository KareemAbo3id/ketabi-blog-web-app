import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function CustomizedSnackbar(props) {
    const { message, isOpen, setIsOpen } = props;

    const handleCloseSnackbar = (e, r) => {
        if (r === "clickaway") return;
        setIsOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
        >
            <Alert
                elevation={1}
                onClose={handleCloseSnackbar}
                variant="filled"
                severity="error"
                className="fw-b"
                sx={{ width: "100%", fontSize: 16.5 }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

CustomizedSnackbar.propTypes = {
    message: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default CustomizedSnackbar;
