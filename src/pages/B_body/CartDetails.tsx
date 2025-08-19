import {Link as RouterLink} from "react-router-dom";
import Pages from "../../components/layout/Pages.tsx";
import {useCart} from "../../context/CartContext.tsx";
import {
    Alert,
    Button, IconButton,
    Paper,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import CartProductQuantity from "../../components/cart/CartProductQuantity.tsx";

const CartDetails = () => {

    const { cart, updateQuantity, removeFromCart, emptyCart, totalPrice } = useCart()

    const isEmpty = cart.length === 0;

    return (
            <Pages title="Panier - Spin Records">
                <Typography variant="h4" sx={{mb: 2}}>Panier</Typography>

                {isEmpty ? (
                <Alert severity="info">Votre panier est vide.</Alert>
            ) : (
                <Stack spacing={2}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produit</TableCell>
                                    <TableCell>Quantité</TableCell>
                                    <TableCell>Prix</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map(({ productId, title, quantity, unitPrice }) => (
                                    <TableRow key={productId}>
                                        <TableCell>{title}</TableCell>
                                        <TableCell>{unitPrice.toFixed(2)} €</TableCell>
                                        <TableCell>
                                            <CartProductQuantity
                                                value={quantity}
                                                onChange={(value) => updateQuantity(productId, value)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {(unitPrice * quantity)} €
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => removeFromCart(productId)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button onClick={emptyCart}>Vider le panier</Button>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6">
                                Total: {totalPrice.toFixed(2)} €
                            </Typography>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/checkout"
                            >
                                Acheter
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            )}
            </Pages>
    );
}

export default CartDetails;