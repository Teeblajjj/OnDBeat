import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import CartModal from './CartModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity } = useCart();

    const handleCheckout = () => {
        closeCart();
        // router.push("/checkout");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 md:ml-60">
                    <Header />
                    <main className="pb-24">
                        <div className="p-4 md:p-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            <PlayerBar />
            <CartModal 
                isOpen={isCartOpen} 
                onClose={closeCart} 
                cartItems={cartItems} 
                onRemoveItem={removeFromCart} 
                onUpdateQuantity={updateQuantity} 
                onCheckout={handleCheckout} 
            />
        </div>
    );
};

export default Layout;
