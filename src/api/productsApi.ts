import {api} from "./api.ts";
import type {Product} from "../types/product.type.ts";

export const getAllProducts = async (keyword: string): Promise<Product[]> => {
    const response = await api.get("/api/products", {
        params: {keyword}
    });
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get("/api/products/" + id);
    return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await api.post("/api/products", product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete("/api/products/" + id);
};