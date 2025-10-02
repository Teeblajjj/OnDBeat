import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import CartModal from './CartModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        closeCart();
        // router.push("/checkout");
    };

    const settingsPages = [
        '/user/edit-profile',
        '/user/password',
        '/user/socials',
        '/user/notifications',
    ];

    const isSettingsPage = settingsPages.includes(router.pathname);

    const backgroundClass = isSettingsPage
        ? 'bg-[#121212]'
        : 'bg-gradient-to-b from-[#1a1a1a] to-[#121212]';


    return (
        <div className={`min-h-screen ${backgroundClass} text-white`}>
            <Toaster 
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 md:ml-60">
                    <Header />
                    <main className="pb-24">
                        <div className={!isSettingsPage ? "p-4 md:p-8" : ""}>
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
