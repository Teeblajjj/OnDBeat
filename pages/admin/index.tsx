import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import PlayerBar from '../../components/PlayerBar'
import CartModal from '../../components/CartModal'
import { Users, Music, DollarSign, Shield, BarChart, ExternalLink, UserPlus } from 'lucide-react'


// --- Dummy Data ---
const summaryStats = [
  { name: "Total Revenue", value: "$142,842", change: "+5.2%", icon: DollarSign, color: "text-green-400" },
  { name: "Total Users", value: "8,621", change: "+120 this month", icon: Users, color: "text-blue-400" },
  { name: "Total Beats", value: "15,302", change: "+300 this week", icon: Music, color: "text-purple-400" },
  { name: "Pending Approvals", value: "14", change: "2 new", icon: Shield, color: "text-red-400" },
];

const revenueData = [ 4, 3, 5, 6, 8, 7, 9, 10, 8, 9, 11, 12]; // Representing monthly revenue

const recentActivity = [
  { icon: Music, text: "ProducerMike uploaded a new beat: 'Sunset Vibes'", time: "15m ago" },
  { icon: UserPlus, text: "A new user, VocalistVibes, has registered.", time: "1h ago" },
  { icon: DollarSign, text: "'City Lights' by The Weeknd was sold (Unlimited License).", time: "3h ago" },
  { icon: Shield, text: "A beat was flagged for review by a user.", time: "5h ago" },
];

// --- Page Component ---
export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Admin Dashboard - ONDBeat</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={0} // No cart in admin
          />

          <main className="p-4 md:p-8 bg-gradient-to-b from-neutral-900 to-[#121212]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-gray-400">Welcome back, Admin. Here's your platform overview.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* --- Main Column --- */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Revenue Chart */}
                        <div className="bg-[#181818] p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">Platform Revenue</h3>
                                <p className="text-sm text-gray-400">Last 12 Months</p>
                            </div>
                            <div className="h-64 flex items-end gap-2">
                                {revenueData.map((height, i) => (
                                    <div key={i} className="flex-1 bg-green-500/20 hover:bg-green-500/40 rounded-t-md transition-colors" style={{ height: `${(height/15)*100}%` }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-[#181818] p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivity.map((activity, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="bg-neutral-800 p-2 rounded-full">
                                            <activity.icon size={20} className="text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white">{activity.text}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Side Column --- */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {summaryStats.map(stat => (
                                <div key={stat.name} className="bg-[#181818] p-4 rounded-lg">
                                    <stat.icon size={24} className={`${stat.color} mb-3`} />
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-sm text-gray-400">{stat.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Management Links */}
                        <div className="bg-[#181818] p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Management</h3>
                            <ul className="space-y-3">
                                {['User Management', 'Content Moderation', 'Platform Analytics', 'System Settings'].map(link => (
                                    <li key={link} className="flex items-center justify-between text-white hover:bg-neutral-700/50 p-2 rounded-md cursor-pointer">
                                        <span className="font-semibold">{link}</span>
                                        <ChevronRight size={20} className="text-gray-500" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={[]} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        </div>
      </div>
    </>
  )
}
