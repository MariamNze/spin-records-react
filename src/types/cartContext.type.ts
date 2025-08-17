import type {OrderItem} from "./orderItem.type.ts";
import type {Product} from "./product.type.ts";

export type CartContextType = {
    cart: OrderItem[]
    addToCart: (product: Product, quantity: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    removeFromCart: (productId: number) => void
    emptyCart: () => void
    totalItems: number
    totalPrice: number
}

{/*
export type CartContextType = {
    items: OrderItem[];
    addToCart: (product: Product, quantity: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}
*/}