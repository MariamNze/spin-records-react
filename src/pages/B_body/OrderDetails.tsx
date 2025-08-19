import {useState} from 'react';
import {getOrdersByEmail} from "../../api/ordersApi.ts";
import type {Order} from "../../types/order.type.ts";
import Pages from "../../components/layout/Pages.tsx";
import {
    Alert,
    Button,
    Paper,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

const OrderDetails = () => {

    const [email, setEmail] = useState('')
    const [orders, setOrders] = useState<Order[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetch = async () => {
        setError(null)
        try {
            const res = await getOrdersByEmail(email)
            setOrders(res)
        } catch (e:any) {
            setError(e?.response?.data?.message || "Erreur de chargement")
        }
    }

    return (
        <Pages title="Home - Spin Records">
            <Typography variant="h4" sx={{ mb: 2 }}>Mes commandes</Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                <Button variant="contained" onClick={fetch}>Rechercher</Button>
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell>Articles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.createdAt}</TableCell>
                                <TableCell align="right">{order.total.toFixed(2)} €</TableCell>
                                <TableCell>
                                    {order.items.map(i => `x${i.quantity} ${i.title ?? 'Produit'}`).join(', ')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Pages>
    );
};

export default OrderDetails;