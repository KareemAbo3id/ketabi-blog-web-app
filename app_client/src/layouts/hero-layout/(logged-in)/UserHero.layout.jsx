
import { Box, Stack, Typography } from "@mui/material";
import UserHeroBlogTitleInput from "../../../components/ui/UserHeroBlogTitleInput.ui";
import createBlogHeroImage from "../../../assets/images/create_blog_hero_image.jpg";
import AppHeroImage from "../../../components/ui/AppHeroImage.ui";

function UserHero() {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={3}
        >
            <Box width="100%">
                <AppHeroImage heroImageTitle={createBlogHeroImage} />
            </Box>
            <Box textAlign="center">
                <Typography component="h1" variant="h2" className="fw-b">
                    Write about something awesome
                </Typography>
                <UserHeroBlogTitleInput />
            </Box>
        </Stack>
    );
}

export default UserHero;
