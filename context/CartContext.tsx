import { createContext, useContext, useState, ReactNode } from 'react';

interface License {
    name: string;
    price: number;
}

interface Beat {
    id: number;
    title: string;
    producer: string;
    cover: string;
    licenses: License[];
}

interface CartItem {
    beat: Beat;
    licenseIndex: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.beat.id === item.beat.id && i.licenseIndex === item.licenseIndex);
            if (existingItem) {
                return prevItems.map(i => 
                    i.beat.id === item.beat.id && i.licenseIndex === item.licenseIndex 
                    ? { ...i, quantity: i.quantity + item.quantity } 
                    : i
                );
            } else {
                return [...prevItems, item];
            }
        });
        openCart();
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.beat.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prevItems => 
            prevItems.map(item => item.beat.id === id ? { ...item, quantity } : item)
        );
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, isCartOpen, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
};
