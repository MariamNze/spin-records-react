import Pages from "../components/layout/Pages";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Alert, Box, Button, Chip, Container, Grid, IconButton, Snackbar, TextField, Typography} from "@mui/material";
import {Add, ArrowBack, Remove, ShoppingCart} from "@mui/icons-material";
import {getProductById} from "../api/productsApi.ts";
import {useCart} from "../context/CartContext.tsx";


const ProductDetails = () => {

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null); // Initialiser avec null pour attendre la réponse
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState(1);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success",
    });


    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const result = await getProductById(parseInt(id));
                setProduct(result);
            } catch (e) {
                setError("Produit non trouvé ou erreur serveur");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <Typography variant="h4" color="primary">Chargement...</Typography>;
    }

    if (error || !product) {
        return (
            <Container maxWidth="lg" sx={{py: 4}}>
                <Typography variant="h4" color="error">
                    Produit n'a pas été trouvé
                </Typography>
                <Button
                    startIcon={<ArrowBack/>}
                    onClick={() => navigate("/")}
                    sx={{mt: 2}}
                >
                    Retour aux Produits
                </Button>
            </Container>
        );
    }

    const isOutOfStock = product.stock === 0;
    const maxQuantity = Math.min(product.stock, 10);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= maxQuantity) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        try {
            addToCart(product, quantity);
            setSnackbar({
                open: true,
                message: `${quantity} x ${product.title} ajouté au panier !`,
                severity: "success",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : "Echec, le produit n'a pas été ajouté au panier",
                severity: "error",
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({...snackbar, open: false});
    };

    return (
        <Pages title="Détails du Produit - Spin Records">

            <Container maxWidth="lg" sx={{py: 4}}>
                <Button
                    startIcon={<ArrowBack/>}
                    onClick={() => navigate("/")}
                    sx={{mb: 3}}
                >
                    Retour
                </Button>

                <Grid container spacing={4}>
                    <Grid size={{xs: 12, md: 6}}>
                        <img
                            src={product.coverUrl || "https://freesvg.org/img/1536281106.png"}
                            alt={product.title}
                            style={{
                                width: "100%",
                                height: "550px",
                                objectFit: "cover",
                            }}
                        />
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="h3" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
                                {product.title}
                            </Typography>
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                Artiste : {product.artist}
                            </Typography>

                            <Box sx={{display: 'flex', gap: 1, mb: 2}}>
                                <Chip label={product.genre} color="primary"/>
                                <Chip label={product.releaseYear.toString()} variant="outlined"/>
                            </Box>

                            <Typography variant="h4" color="primary" sx={{fontWeight: 'bold', mb: 2}}>
                                {product.price.toFixed(2)} €
                            </Typography>
                            <Typography variant="body1" sx={{mb: 3}}>
                                {product.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                                Stock: {product.stock} available
                            </Typography>
                            {!isOutOfStock && (
                                <Box sx={{mb: 3}}>
                                    <Typography variant="body1" sx={{mb: 1}}>
                                        Quantité :
                                    </Typography>
                                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                        <IconButton
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            disabled={quantity <= 1}
                                        >
                                            <Remove/>
                                        </IconButton>
                                        <TextField
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                            inputRef={(ref) => {
                                                if (ref) {
                                                    ref.min = 1;
                                                    ref.max = maxQuantity;
                                                }
                                            }}
                                            sx={{width: "80px"}}
                                            size="small"
                                        />
                                        <IconButton
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            disabled={quantity >= maxQuantity}
                                        >
                                            <Add/>
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}
                            <Box sx={{mt: "auto"}}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<ShoppingCart/>}
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    fullWidth
                                    sx={{
                                        py: 1.5,
                                        fontSize: "1.1rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {isOutOfStock ? "Rupture de Stock" : "Ajouter au Panier"}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{width: "100%"}}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Pages>
    );
};

export default ProductDetails;