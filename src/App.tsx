import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Router from "./routers/Router";

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: light)').matches;

const  theme = createTheme({
    palette: {
        mode: prefersDarkMode ? "dark" : "light",
    }
})

function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Router />
        </ThemeProvider>
    </>
  )
}

export default App
