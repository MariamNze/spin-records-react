import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import type {Product} from "../types/product.type.ts";

const ProductItem = ({product}: { product: Product }) => {

    const navigate = useNavigate();

    return (
        <Card sx={{
            maxWidth: 370,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.05)',
            }
        }}>
            <CardMedia
                component="img"
                height="370"
                image={product.coverUrl || "https://freesvg.org/img/1536281106.png"}
                alt={product.title}
                onClick={() => navigate("/products/" + product.id)}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {product.artist}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {product.price} €
                </Typography>
                <Typography variant="caption" color={product.stock > 0 ? 'success.main' : 'error.main'}>
                    Stock: {product.stock}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small">
                    Ajouter au panier
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;