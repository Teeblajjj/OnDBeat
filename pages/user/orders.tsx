import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';

const OrdersTab = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">My Orders</h3>
        <p className="text-neutral-400">A list of your pending and completed orders will be displayed here.</p>
        {/* Example Order Item */}
        <div className="bg-neutral-800/50 p-4 rounded-lg mt-4 flex justify-between items-center">
            <div>
                <p className="font-bold">Order #12345</p>
                <p className="text-sm text-neutral-400">1 Beat - Standard License</p>
            </div>
            <div className="text-right">
                <p className="font-bold">$25.00</p>
                <p className="text-sm text-green-400">Completed</p>
            </div>
        </div>
    </div>
);

const PurchasedTab = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Purchased Beats</h3>
        <p className="text-neutral-400">A list of all the beats you have purchased will be displayed here, ready for download.</p>
         {/* Example Purchased Item */}
        <div className="bg-neutral-800/50 p-4 rounded-lg mt-4 flex justify-between items-center">
            <div>
                <p className="font-bold">Sunset Vibez</p>
                <p className="text-sm text-neutral-400">Standard License</p>
            </div>
            <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                Download
            </button>
        </div>
    </div>
);

export default function OrdersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState('purchased');

  return (
    <>
      <Head>
        <title>My Orders - ONDBeat Marketplace</title>
      </Head>

      <div className="min-h-screen bg-black text-white flex">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="flex-1 md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => {}}
            cartItems={0}
          />

          <main className="bg-gradient-to-b from-neutral-900/60 to-[#121212] p-8">
            <h1 className="text-4xl font-bold mb-6">My Orders</h1>
            
            <div className="flex border-b border-neutral-700 mb-6">
                <button 
                    onClick={() => setActiveTab('purchased')}
                    className={`px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'purchased' ? 'text-white border-b-2 border-blue-500' : 'text-neutral-400 hover:text-white'}`}>
                    Purchased
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'orders' ? 'text-white border-b-2 border-blue-500' : 'text-neutral-400 hover:text-white'}`}>
                    Orders
                </button>
            </div>

            <div>
                {activeTab === 'purchased' ? <PurchasedTab /> : <OrdersTab />}
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  )
}
