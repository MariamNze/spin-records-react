import React, {createContext, useContext, useEffect, useMemo, useState, useCallback, type FC} from 'react'
import type {OrderItem} from "../types/orderItem.type.ts";
import type {Product} from "../types/product.type.ts";
import type {CartContextType} from "../types/cartContext.type.ts";

const STORAGE_KEY = "cart";

const CartContext = createContext<CartContextType | undefined>(undefined)

function loadCart(): OrderItem[] {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
}

export const CartProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [cart, setCart] = useState<OrderItem[]>(loadCart);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((product: Product, quantity: number) => {
        if (quantity <= 0) return;
        setCart(prev => {
            const existing = prev.find(oi => oi.productId === product.id);
            if (existing) {
                return prev.map(oi =>
                    oi.productId === product.id
                        ? { ...oi, quantity: oi.quantity + quantity }
                        : oi
                );
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    title: product.title,
                    artist: product.artist,
                    quantity,
                    unitPrice: product.price,
                }
            ];
        });
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        setCart(prev =>
            prev.map(oi =>
                oi.productId === productId
                    ? { ...oi, quantity: Math.max(1, quantity) }
                    : oi
            )
        );
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCart(prev => prev.filter(oi => oi.productId !== productId));
    }, []);

    const emptyCart = useCallback(() => {
        setCart([]);
    }, []);


    const totalItems = useMemo(() => {
        return cart.reduce((sum, oi) => sum + oi.quantity, 0);
    }, [cart]);

    const totalPrice = useMemo(() => {
        return cart.reduce((sum, oi) => sum + oi.unitPrice * oi.quantity, 0);
    }, [cart]);

    const value = useMemo<CartContextType>(() => ({
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        emptyCart,
        totalItems,
        totalPrice
    }), [
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        emptyCart,
        totalItems,
        totalPrice
    ]);


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};