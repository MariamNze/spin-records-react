import React, { useState } from "react";
import Pages from "../components/layout/Pages";
import type { Order } from "../types/order.type.ts";
import { getOrdersByEmail } from "../api/ordersApi.ts";
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Container, Typography } from "@mui/material";

const Orders: React.FC  = () => {

    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);

    const handleSearch = async () => {
        if (!email) return;
        const result = await getOrdersByEmail(email);
        setOrders(result);
    };


    return (
        <Pages title="Commmandes | Admin - Spin Records">
            <h1>Les Commandes</h1>


            <Container>
                <Typography variant="h4" gutterBottom>Recherche des commandes par e-mail</Typography>

                <TextField
                    label="Email du client"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                />
                <Button variant="contained" onClick={handleSearch}>Rechercher</Button>

                {orders.length > 0 && (
                    <Table sx={{ marginTop: 4 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Commande ID</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Total (€)</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.customerId}</TableCell>
                                    <TableCell>{order.total}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Container>
        </Pages>
    );
};

export default Orders;