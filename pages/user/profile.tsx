
import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';
import { Users, BarChart2, Wallet, DollarSign, Heart, ShoppingBag, Clock } from 'lucide-react';

const StatCard = ({ icon, label, value, color }) => (
    <div className={`bg-neutral-800/60 p-6 rounded-lg flex items-center space-x-4`}>
        <div className={`p-3 rounded-full bg-${color}-600/20 text-${color}-400`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-neutral-400 font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export default function ProfileDashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in a real app, this would come from an API
  const walletBalance = "$128.50";
  const stats = {
      beatsPurchased: 12,
      favorites: 48,
      totalSpent: "$450.00",
  };
  const recentlyPlayed = [
      { id: 1, name: 'Lo-Fi Dreams', producer: 'Chillhop Cafe', playedAt: '2 hours ago' },
      { id: 2, name: '80s Synthwave', producer: 'Neon Nights', playedAt: 'Yesterday' },
      { id: 3, name: 'Trap Essentials Vol. 3', producer: 'Metro Boomin', playedAt: '3 days ago' },
  ];

  return (
    <>
      <Head>
        <title>My Dashboard - ONDBeat Marketplace</title>
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
            {/* Header section with User and Wallet */}
            <div className="flex justify-between items-start mb-10">
                <div className="flex items-center space-x-4">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="User Avatar" className="w-20 h-20 rounded-full object-cover" />
                    <div>
                        <p className='text-sm text-neutral-400'>Welcome back,</p>
                        <h1 className="text-3xl font-bold">Demo User</h1>
                    </div>
                </div>
                <div className="bg-neutral-800/60 p-4 rounded-lg text-right">
                    <div className='flex items-center space-x-4'>
                        <div>
                           <p className="text-sm text-neutral-400">Wallet Balance</p>
                           <p className="text-2xl font-bold">{walletBalance}</p>
                        </div>
                        <button className="bg-green-600 text-white font-bold p-3 rounded-full hover:bg-green-700 transition-colors">
                           <Wallet size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Analytics Blocks */}
            <h2 className="text-2xl font-bold mb-4">Your Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={<ShoppingBag size={24}/>} label="Beats Purchased" value={stats.beatsPurchased} color="blue" />
                <StatCard icon={<Heart size={24}/>} label="Favorites" value={stats.favorites} color="pink" />
                <StatCard icon={<DollarSign size={24}/>} label="Total Spent" value={stats.totalSpent} color="yellow" />
            </div>

            {/* History Section */}
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <ul className="space-y-3">
                {recentlyPlayed.map(item => (
                    <li key={item.id} className="bg-neutral-800/50 p-4 rounded-lg flex justify-between items-center hover:bg-neutral-800 transition-colors">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-neutral-400">by {item.producer}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-neutral-500">
                           <Clock size={16}/>
                           <span>{item.playedAt}</span>
                        </div>
                    </li>
                ))}
            </ul>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  )
}
