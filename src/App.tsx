import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Router from "./routers/Router";
import {CartProvider} from "./context/CartContext.tsx";

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
            <CartProvider>
            <Router />
            </CartProvider>
        </ThemeProvider>
    </>
  )
}

export default App
