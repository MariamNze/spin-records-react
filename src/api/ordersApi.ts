import {api} from "./api.ts";
import type {Order} from "../types/order.type.ts";

export const getAllOrders = async (): Promise<Order[]> => {
    const response = await api.get("/admin/orders");
    return response.data;
};

export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
    const response = await api.get("/orders", {
        params: {email}
    });
    return response.data;
};

export const createOrder = async (email: string, items: { productId: number; quantity: number }): Promise<Order[]> => {
    const response = await api.post("/cart", { email, items });
    return response.data;
};