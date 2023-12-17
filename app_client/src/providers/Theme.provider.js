import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#000000" },
        white: { main: "#fff" },
        text: { primary: "#000" },
        secondary: { main: "#575757" },
        background: { default: "#f3f3f3" },
    },
});

export { ThemeProvider, theme };
