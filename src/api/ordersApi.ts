import {api} from "./api.ts";
import type {Order} from "../types/order.type.ts";

export const getAllOrders = async (): Promise<Order[]> => {
    const response = await api.get("/orders");
    return response.data;
};

export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
    const response = await api.get("/admin/orders", {
        params: {email}
    });
    return response.data;
};