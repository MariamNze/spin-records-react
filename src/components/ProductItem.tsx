import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import type {Product} from "../types/product.type.ts";

interface ProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({product, onAddToCart}) => {

    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate("/products/" + product.id);
    };
    const isOutOfStock = product.stock === 0;

    return (
        <Card sx={{
            maxWidth: 350,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.05)',
            },

            position: 'relative',
            opacity: isOutOfStock ? 0.7 : 1,

        }}>
            {isOutOfStock && (
                <Chip
                    label="Out of Stock"
                    color="error"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        fontWeight: 'bold',
                    }}
                />
            )}
            <CardMedia
                component="img"
                height="350"
                image={product.coverUrl || "https://freesvg.org/img/1536281106.png"}
                alt={product.title}
                onClick={handleViewDetails}
            />
            <CardContent>
                <Typography
                    gutterBottom variant="h6"
                    component="div"
                    onClick={handleViewDetails}
                >
                    {product.title}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {product.artist}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {product.price.toFixed(2)} €
                </Typography>
                <Typography variant="caption" color={product.stock > 0 ? 'success.main' : 'error.main'}>
                    Stock: {product.stock}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => onAddToCart(product)}
                    disabled={isOutOfStock}
                >
                    Ajouter au panier
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;