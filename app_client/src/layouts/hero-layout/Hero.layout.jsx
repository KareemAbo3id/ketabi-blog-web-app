import { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import heroImage from "../../assets/images/hero_image.jpg";
import { Box, Stack } from "@mui/material";
import UserAppHero from "./(logged-in)/UserHero.layout";
import NonAuthBtns from "../../components/ui/NonAuthBtns.ui";
import AppHeroImage from "../../components/ui/AppHeroImage.ui";

function Hero(props) {
    const { userAuth } = props;

    return (
        <Fragment>
            {userAuth ? (
                <UserAppHero />
            ) : (
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    spacing={3}
                >
                    <Box width="100%">
                        <AppHeroImage heroImageTitle={heroImage} />
                    </Box>
                    <Box textAlign="center">
                        <Typography
                            component="h1"
                            variant="h2"
                            className="fw-b"
                        >
                            Your Space for Creative Expression!
                        </Typography>
                        <Typography variant="h6" component="p" paragraph>
                            Welcome to Ketabi, where every thought finds its
                            brushstroke and every idea becomes a masterpiece.
                        </Typography>
                    </Box>
                    <NonAuthBtns />
                </Stack>
            )}
        </Fragment>
    );
}

Hero.propTypes = {
    userAuth: PropTypes.bool.isRequired,
};

export default Hero;
