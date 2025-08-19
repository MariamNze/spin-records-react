import React, {useState} from 'react';
import Pages from "../../components/layout/Pages.tsx";
import {Alert, Box, Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import {useCart} from "../../context/CartContext.tsx";
import {createOrder} from "../../api/ordersApi.ts";


const CheckoutDetails = () => {

    const {cart, emptyCart, totalPrice} = useCart()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null);
        setSuccess(null)
        if (cart.length === 0) {
            setError("Panier vide")
            return
        }
        setLoading(true)
        try {
            const order = await createOrder({
                email,
                items: cart.map(i => ({productId: i.productId, quantity: i.quantity}))
            })
            setSuccess(`Commande #${order.id} confirmée. Total: ${order.total.toFixed(2)} €`)
            emptyCart()
        } catch (e: any) {
            setError(e?.response?.data?.message || "Erreur lors de la commande")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Pages title="Passer commande - Spin Records">
            <Typography variant="h4" sx={{mb: 2}}>Passer commande</Typography>
            <Typography variant="body1" sx={{mb: 2}}>Total: {totalPrice.toFixed(2)} €</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2} maxWidth={400}>
                    <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                               required/>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={30}/> : "Acheter"}
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                </Stack>
            </Box>
        </Pages>
    );
};

export default CheckoutDetails;