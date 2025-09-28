import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import { BarChart, LineChart, PieChart, Users, DollarSign, Music } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import CartModal from '../components/CartModal'

export default function Analytics() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { openAuthModal } = useAuth();
  const [cartItems, setCartItems] = useState(0);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents, setCartContents] = useState<any[]>([]);

  return (
    <>
      <Head>
        <title>Analytics - ONDBeat</title>
        <meta name="description" content="View your creator analytics on ONDBeat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CartModal 
        isOpen={cartModalOpen} 
        onClose={() => setCartModalOpen(false)}
        cartItems={cartContents}
        onRemoveItem={() => {}}
        onUpdateQuantity={() => {}}
        onCheckout={() => {}}
      />

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cartItems}
          />

          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Creator Analytics</h1>
                <p className="text-gray-400">Track your performance and earnings</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold">$4,823</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Plays</p>
                      <p className="text-2xl font-bold">1.2M</p>
                    </div>
                    <Music className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Followers</p>
                      <p className="text-2xl font-bold">12.k</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Engagement</p>
                      <p className="text-2xl font-bold">4.8%</p>
                    </div>
                    <BarChart className="w-8 h-8 text-red-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Revenue Over Time</h2>
                  <LineChart className="w-full h-64 text-green-400" />
                </div>

                {/* Plays Chart */}
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Plays by Location</h2>
                  <BarChart className="w-full h-64 text-blue-400" />
                </div>

                {/* Top Beats */}
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Top Beats</h2>
                  <ul>
                    <li className="flex justify-between py-2 border-b border-neutral-800">
                      <span>Midnight Trap</span>
                      <span>120k plays</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-neutral-800">
                      <span>Urban Dreams</span>
                      <span>98k plays</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span>Street Vibes</span>
                      <span>76k plays</span>
                    </li>
                  </ul>
                </div>

                {/* Traffic Sources */}
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Traffic Sources</h2>
                  <PieChart className="w-full h-64 text-purple-400" />
                </div>
              </div>
            </div>
          </main>

          <PlayerBar />
        </div>
      </div>
    </>
  )
}
