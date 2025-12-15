
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
    productId: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage and sync across tabs
    useEffect(() => {
        const loadCart = () => {
            const saved = localStorage.getItem("cart");
            if (saved) {
                try {
                    setItems(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse cart", e);
                }
            }
        };

        loadCart();
        setIsLoaded(true);

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "cart") {
                loadCart();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (newItem: CartItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.productId === newItem.productId);
            if (existing) {
                return prev.map((i) =>
                    i.productId === newItem.productId
                        ? { ...i, quantity: i.quantity + newItem.quantity }
                        : i
                );
            }
            return [...prev, newItem];
        });
        setIsCartOpen(true); // Open cart when adding
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => setItems([]);
    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            isCartOpen,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
