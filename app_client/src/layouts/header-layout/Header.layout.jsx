
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import UserHeader from "./(logged-in)/UserHeader.layout";
import NonAuthBtns from "../../components/ui/NonAuthBtns.ui";
import ketabiBrand from "../../assets/brand/ketabi-brand.png";
import getRouterPath from "../../hooks/getRouterPath.hook";

function Header(props) {
    const { userAuth } = props;
    const { root } = getRouterPath();

    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Container maxWidth="lg" disableGutters>
                    <Toolbar sx={{ flexWrap: "wrap" }}>
                        <Typography
                            component="div"
                            color="inherit"
                            noWrap
                            sx={{ flex: 1 }}
                        >
                            <Link to={root.root_path}>
                                <img
                                    src={ketabiBrand}
                                    alt="ketabi logo"
                                    width={100}
                                />
                            </Link>
                        </Typography>
                        {userAuth ? <UserHeader /> : <NonAuthBtns />}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

Header.propTypes = {
    userAuth: PropTypes.bool.isRequired,
};

export default Header;
