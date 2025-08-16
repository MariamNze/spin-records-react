import ProductItem from "../components/ProductItem.tsx";
import Pages from "../components/layout/Pages.tsx";
import {Box} from "@mui/material";

const Home = () => {
    return (
        <>
            <Pages title="Home - Spin Records">
                <h1>Coucou, je suis dans le (Home)</h1>
                <Box>
                    <ProductItem/>
                </Box>
            </Pages>

        </>
    );
};

export default Home;