import React, { useState } from 'react';
import Pages from "../../components/layout/Pages.tsx";
import { createOrder } from "../../api/ordersApi.ts";
import {useCart} from "../../context/CartContext.tsx";
import {Button, TextField, Typography} from "@mui/material";

const CartDetails = () => {

    const {cart, clearCart} = useCart();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleValidateOrder = async () => {
        if (!email) {
            setError('Veuillez entrer votre email');
            return;
        }

        try {
            const orderItems = cart.map(item => ({productId: item.id, quantity: item.quantity}));
            await createOrder(email, orderItems);
            clearCart();
            setSuccess("Commande validée !");
            setError("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur lors de la validation de la commande");
        }
    };

    return (
        <Pages title="Panier - Spin Records">
            <Typography variant="h4" sx={{mb: 2}}>Panier</Typography>

            {cart.length === 0 ? (
                <Typography>Votre panier est vide</Typography>
            ) : (
                <>
                    <List>
                        {cart.map(item => (
                            <ListItem key={item.id}>
                                <ListItemText primary={`${item.name} x ${item.quantity}`}
                                              secondary={`${item.price * item.quantity} €`}/>
                            </ListItem>
                        ))}
                    </List>

                    <TextField
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{marginTop: '1rem', marginBottom: '1rem'}}
                    />

                    <Button variant="contained" onClick={handleValidateOrder}>Valider la commande</Button>

                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success.main">{success}</Typography>}
                </>
            )}

        </Pages>
    )
        ;
};

export default CartDetails;