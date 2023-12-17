
import AppHero from "../../layouts/hero-layout/Hero.layout";
import { Container } from "@mui/material";

function HomePage() {
    return (
        <Container maxWidth="lg">
            <AppHero userAuth={false} />
        </Container>
    );
}

export default HomePage;
