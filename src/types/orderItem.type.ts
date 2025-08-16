import type {Product} from "./product.type.ts";

export type OrderItem = {
    product: Product;
    quantity: number;
};
