import Pages from "../components/layout/Pages.tsx";
import ProductItem from "../components/ProductItem.tsx";

const ProductList = () => {
    return (
        <Pages title="Products">
            <h1>Coucou, je suis dans le (ProductList)</h1>
            <ProductItem/>
        </Pages>
    );
};

export default ProductList;