import {api} from "./api.ts";
import type {Order} from "../types/order.type.ts";
import type {CartCheckout} from "../types/cartCheckout.type.ts";

export const getAllOrders = async (): Promise<Order[]> => {
    const response = await api.get("/api/admin/orders");
    return response.data;
};

export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
    const response = await api.get("/api/orders", {
        params: {email}
    });
    return response.data;
};

export const createOrder = async (createOrder: CartCheckout): Promise<Order> => {
    const response = await api.post("/api/cart", createOrder);
    return response.data;
};