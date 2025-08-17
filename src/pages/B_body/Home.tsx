import Pages from "../components/layout/Pages.tsx";
import ProductList from "./ProductList.tsx";

const Home = () => {
    return (
        <>
            <Pages title="Home - Spin Records">
                <h1>Bienvenue à Spin Records</h1>
                <ProductList/>
            </Pages>

        </>
    );
};

export default Home;