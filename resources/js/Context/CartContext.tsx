import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    id: number;
    nombre: string;
    precio: number | string;
    imagen?: string;
    cantidad: number;
    stock: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addToCart: (product: Omit<CartItem, 'cantidad'>, cantidad?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, cantidad: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen((prev) => !prev);

    const addToCart = (product: Omit<CartItem, 'cantidad'>, cantidad = 1) => {
        setItems((prevItems) => {
            const existingIndex = prevItems.findIndex((item) => item.id === product.id);

            if (existingIndex > -1) {
                const updated = [...prevItems];
                const newQuantity = updated[existingIndex].cantidad + cantidad;
                updated[existingIndex].cantidad = Math.min(newQuantity, product.stock);
                return updated;
            } else {
                return [...prevItems, { ...product, cantidad: Math.min(cantidad, product.stock) }];
            }
        });
        openCart(); // Abre el carrito desplegable automáticamente al agregar un producto
    };

    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, cantidad: number) => {
        if (cantidad <= 0) {
            removeFromCart(id);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: Math.min(cantidad, item.stock) } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

    const totalPrice = items.reduce((sum, item) => {
        const p = typeof item.precio === 'string' ? parseFloat(item.precio) : item.precio;
        return sum + p * item.cantidad;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                openCart,
                closeCart,
                toggleCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};