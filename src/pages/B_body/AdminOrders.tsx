import React, {useState} from "react";
import Pages from "../../components/layout/Pages.tsx";
import type {Order} from "../../types/order.type.ts";
import {getAllOrders, getOrdersByEmail} from "../../api/ordersApi.ts";
import {
    TextField,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography, Alert
} from "@mui/material";

const AdminOrders: React.FC = () => {

    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null)

    const getAll = async () => {
        try {
            setError(null);
            const orders = await getAllOrders();
            setOrders(orders);
        } catch (error: any) {
            const message = error?.response?.data?.message ?? "Erreur de chargement";
            setError(message);
        }
    };

    const handleSearch = async () => {
        try {
            setError(null);
            const orders = await getOrdersByEmail(email);
            setOrders(orders);
        } catch (error: unknown) {
            const message =
                (error as any)?.response?.data?.message ?? "Erreur de chargement";
            setError(message);
        }
    };

    return (
        <Pages title="Historique des Commandes - Spin Records">
            <h1>Historique des Commandes - Admin</h1>

            <Typography variant="h4" gutterBottom>Recherche des commandes par e-mail</Typography>

            <Button variant="outlined" onClick={getAll}>Chargement de toutes les commandes</Button>
            <TextField
                label="Entrez l'e-mail du client"
                value={email}
                variant="outlined"
                sx={{marginRight: 2}}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>Recherche</Button>


            {error && <Alert severity="error">{error}</Alert>}
            <Table sx={{marginTop: 4}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Commande ID</TableCell>
                        <TableCell>Total (€)</TableCell>
                        <TableCell>Articles</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.total.toFixed(2)} €</TableCell>
                            <TableCell>
                                {order.items.map(i => `x${i.quantity} ${i.title ?? 'Produit'}`).join(', ')}
                            </TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Pages>
    );
};

export default AdminOrders;