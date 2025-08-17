import Pages from "../../components/layout/Pages.tsx";
import {useCart} from "../../context/CartContext.tsx";
import {
    Alert, Box, Button,
    Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import {Delete as DeleteIcon} from '@mui/icons-material';
import {useNavigate} from "react-router";

const CartDetails = () => {

    const navigate = useNavigate();
    const {cart, updateQuantity, removeFromCart, emptyCart, totalPrice} = useCart();

    const [email, setEmail] = useState("");
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success",
    });

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleEmptyCart = () => {
        emptyCart();
        setEmptyDialogOpen(false);
        setSnackbar({
            open: true,
            message: "Panier vidé avec succès !",
            severity: "success",
        });
    };

    const handleCheckout = () => {
        if (!email.trim()) {
            setSnackbar({
                open: true,
                message: "Entrez votre adresse e-mail",
                severity: "error",
            });
            return;
        }
        // Simulate order processing
        const order = {
            id: Date.now(),
            customer: {email: email.trim()},
            items: [...items],
            totalAmount: totalPrice(),
            orderDate: new Date().toISOString(),
            status: "confirmed" as const,
        };
        // Save order to localStorage (in real app, this would be sent to backend)
        const existingOrders = JSON.parse(localStorage.getItem("spinRecordsOrders") || "[]");
        existingOrders.push(order);
        localStorage.setItem("spinRecordsOrders", JSON.stringify(existingOrders));

        emptyCart();
        setCheckoutDialogOpen(false);
        setEmail("");

        setSnackbar({
            open: true,
            message: "Commande passée avec succès ! ",
            severity: "success",
        });

        // Navigate to orders page after a short delay
        setTimeout(() => {
            navigate(`/orders?email=${encodeURIComponent(email.trim())}`);
        }, 2000);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({...snackbar, open: false});
    };

    if (items.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h4" gutterBottom>
                        Votre panier est vide
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Découvrez notre incroyable collection de vinyles et ajoutez quelques disques à votre panier !
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/')}
                    >
                        Parcourir les vinyles
                    </Button>
                </Box>
            </Container>
        );
    }



    return (
        <Pages title="Panier - Spin Records">
            <h1>Coucou, je suis dans le (CartDetails)</h1>
            <Typography variant="h4" sx={{mb: 2}}>Panier</Typography>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                        Votre Panier
                    </Typography>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteSweep />}
                        onClick={() => setEmptyDialogOpen(true)}
                    >
                        Vider Panier
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                            {items.map((item, index) => (
                                <Box key={item.product.id}>
                                    <Card elevation={0} sx={{ display: 'flex', mb: 2 }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 120, height: 120, objectFit: 'cover' }}
                                            image={item.product.imageUrl}
                                            alt={item.product.title}
                                        />
                                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {item.product.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.product.artist}
                                            </Typography>
                                            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                                {item.product.price.toFixed(2)} €
                                            </Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                                    >
                                                        <Remove />
                                                    </IconButton>
                                                    <TextField
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 0)}
                                                        inputProps={{ min: 0, max: item.product.stock }}
                                                        sx={{ width: '80px', mx: 1 }}
                                                        size="small"
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.product.stock}
                                                    >
                                                        <Add />
                                                    </IconButton>
                                                </Box>

                                                <Typography variant="body2" color="text.secondary">
                                                    Stock: {item.product.stock}
                                                </Typography>

                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    sx={{ ml: "auto" }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                    {index < items.length - 1 && <Divider sx={{ my: 2 }} />}
                                </Box>
                            ))}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 100 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Votre commande
                            </Typography>

                            {items.map((item) => (
                                <Box key={item.product.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">
                                        {item.product.title} x {item.quantity}
                                    </Typography>
                                    <Typography variant="body2">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Total:
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    ${totalPrice().toFixed(2)}
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<Payment />}
                                onClick={() => setCheckoutDialogOpen(true)}
                                sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                            >
                                Passer la commande
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Empty Cart Dialog */}
                <Dialog open={emptyDialogOpen} onClose={() => setEmptyDialogOpen(false)}>
                    <DialogTitle>Vider le panier</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Êtes-vous sûr de vouloir supprimer tous les articles de votre panier ?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEmptyDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleEmptyCart} color="error" variant="contained">
                            Vider le panier
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Checkout Dialog */}
                <Dialog open={checkoutDialogOpen} onClose={() => setCheckoutDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Passer commande</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Veuillez saisir votre adresse e-mail pour finaliser votre commande.
                        </Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Total: {totalPrice().toFixed(2)} €
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {items.reduce((total, item) => total + item.quantity, 0)} items
                            </Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCheckoutDialogOpen(false)}>Annuler</Button>
                        <Button onClick={handleCheckout} variant="contained">
                            Passer la commande
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
            );












            {cart.length === 0 ? (
                <Alert severity="info">Votre panier est vide.</Alert>
            ) : (
                <Stack spacing={2}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produit</TableCell>
                                    <TableCell>Prix</TableCell>
                                    <TableCell>Quantité</TableCell>
                                    <TableCell align="right">Sous-total</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map(item => (
                                    <TableRow key={item.productId}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.unitPrice.toFixed(2)} €</TableCell>
                                        <TableCell>

                                            <Box sx={{display: 'flex', alignItems: 'center', mt: 2, gap: 2}}>
                                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                                    >
                                                        <Remove/>
                                                    </IconButton>
                                                    <TextField
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 0)}
                                                        inputProps={{min: 0, max: item.product.stock}}
                                                        sx={{width: '80px', mx: 1}}
                                                        size="small"
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                        disabled={item.quantity >= item.product.stock}
                                                    >
                                                        <Add/>
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                                {/*
                                            //QualitySelector
                                            const set = (v:number) => onChange(Math.min(max, Math.max(min, v)))
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <IconButton onClick={()=>set(value-1)} aria-label="decrease" size="small"><RemoveIcon /></IconButton>
                                                <TextField size="small" type="number" inputProps={{ min, max }} value={value} onChange={e=>set(parseInt(e.target.value||'0',10))} sx={{ width: 80 }} />
                                                <IconButton onClick={()=>set(value+1)} aria-label="increase" size="small"><AddIcon /></IconButton>
                                            </Stack>
                                            // END

                                            <QuantitySelector value={item.quantity}
                                                              onChange={(v) => updateQuantity(item.productId, v)}/>
                                        */}

                                        </TableCell>
                                        <TableCell
                                            align="right">{(item.unitPrice * item.quantity).toFixed(2)} €</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => removeFromCart(item.productId)}><DeleteIcon/></IconButton>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button onClick={emptyCart}>Vider le panier</Button>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6">Total: {totalPrice.toFixed(2)} €</Typography>
                            <Button variant="contained" onClick={() => navigate("/checkout")}>Acheter</Button>
                        </Stack>
                    </Stack>
                </Stack>
                )}
        </Pages>
    );
};

export default CartDetails;