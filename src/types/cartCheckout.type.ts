export type CartCheckout = {
    email: string;
    items: { productId: number; quantity: number }[];
}