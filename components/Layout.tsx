import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex">
                <Sidebar />
                <main className="flex-1">
                    <Header />
                    <div className="p-4 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
