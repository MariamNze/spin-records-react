import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const ProductItem = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://freesvg.org/img/1536281106.png"
                title="vinyl"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Vinyl
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Artist
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Price
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Ajouter au panier</Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;