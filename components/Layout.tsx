import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import CartSidebar from './CartSidebar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-900 text-white">
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
            <CartSidebar />
        </div>
    );
};

export default Layout;
