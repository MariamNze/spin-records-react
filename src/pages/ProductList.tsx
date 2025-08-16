import Pages from "../components/layout/Pages.tsx";
import ProductItem from "../components/ProductItem.tsx";
import {useEffect, useState} from "react";
import type {Product} from "../types/product.type.ts";
import {getAllProducts} from "../api/productsApi.ts";
import {Grid} from "@mui/material";

const ProductList = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const fetchProducts = async (query: string) => {
            setLoading(true);
            setError(null);

            try {
                const result = await getAllProducts(query);
                setProducts(result);
            } catch (e) {
                setError("Erreur lors de la récupération des produits");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts("");
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Pages title="Spin Records - Produits">
            <h1>Nos Produits</h1>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid size={{xs: 12, md: 3}} key={product.id}>
                        <ProductItem product={product} onAddToCart={() => {}}/>
                    </Grid>
                ))}
            </Grid>
        </Pages>
    );
};

export default ProductList;