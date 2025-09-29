import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import CartModal from '../components/CartModal'
import { BarChart, LineChart, Users, DollarSign, Music, ArrowUpRight } from 'lucide-react'

// --- Dummy Data ---
const stats = [
  {
    title: "Total Revenue",
    value: "$4,823.14",
    change: "+2.5%",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    title: "Total Plays",
    value: "1,254,802",
    change: "+8.1%",
    icon: Music,
    color: "text-blue-400",
  },
  {
    title: "Followers",
    value: "12,389",
    change: "+12.3%",
    icon: Users,
    color: "text-purple-400",
  },
  {
    title: "Engagement",
    value: "4.87%",
    change: "-0.2%",
    icon: BarChart,
    color: "text-red-400",
  },
];

const topBeats = [
  {
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&q=80",
    title: "Midnight Trap",
    producer: "LuckyBoy",
    plays: "120,543",
  },
  {
    cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=100&q=80",
    title: "Urban Dreams",
    producer: "PremiumBeats",
    plays: "98,721",
  },
  {
    cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&q=80",
    title: "Street Vibes",
    producer: "Syndrome",
    plays: "76,123",
  },
   {
    cover: "https://images.unsplash.com/photo-1458560871784-56d23406c791?w=100&q=80",
    title: "Lofi Chill",
    producer: "BeatStars",
    plays: "65,987",
  },
];

const trafficSources = [
    { name: 'ONDBeat Discovery', value: '55%', color: 'bg-green-400 h-2 rounded-full' },
    { name: 'Social Media', value: '25%', color: 'bg-blue-400 h-2 rounded-full' },
    { name: 'Direct', value: '15%', color: 'bg-purple-400 h-2 rounded-full' },
    { name: 'Other', value: '5%', color: 'bg-red-400 h-2 rounded-full' },
];

// --- Page Component ---
export default function Analytics() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents] = useState<any[]>([]);

  // --- Sub-components for styling ---
  const StatCard = ({ stat }) => (
    <div className="bg-[#181818] p-4 md:p-6 rounded-lg border border-transparent hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-400 text-sm">{stat.title}</p>
        <stat.icon className={`w-6 h-6 ${stat.color}`} />
      </div>
      <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
      <div className="flex items-center text-sm mt-1">
        <ArrowUpRight size={16} className={stat.change.startsWith('-') ? 'text-red-500' : 'text-green-500'} />
        <span className={stat.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}>{stat.change}</span>
        <span className="text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  );

  const ChartPlaceholder = ({ title, icon: Icon, color }) => (
     <div className="bg-[#181818] p-6 rounded-lg h-full flex flex-col">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="flex-grow flex items-center justify-center bg-black/20 rounded-md relative">
            <Icon className={`w-24 h-24 ${color} opacity-10`} />
            <p className="absolute text-gray-500 text-sm">Chart data currently unavailable</p>
        </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Creator Dashboard - ONDBeat</title>
        <meta name="description" content="View your creator analytics on ONDBeat" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cartContents.length}
          />

          <main className="p-4 md:p-8 bg-gradient-to-b from-neutral-900 to-[#121212]">
            <div className="max-w-full mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-white mb-2">Creator Dashboard</h1>
                <p className="text-gray-400 text-lg">Welcome back, here's how your beats are performing.</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map(stat => <StatCard key={stat.title} stat={stat} />)}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-3">
                   <ChartPlaceholder title="Revenue Over Time" icon={LineChart} color="text-green-400" />
                </div>
                
                {/* Traffic Sources */}
                <div className="lg:col-span-2 bg-[#181818] p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-white mb-4">Traffic Sources</h2>
                  <div className="space-y-4">
                    {trafficSources.map(source => (
                      <div key={source.name}>
                        <div className="flex justify-between text-sm mb-1">
                           <span className="text-gray-300">{source.name}</span>
                           <span className="text-gray-400">{source.value}</span>
                        </div>
                        <div className="w-full bg-neutral-700 rounded-full h-2">
                          <div className={source.color} style={{ width: source.value }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Beats */}
                <div className="lg:col-span-5 bg-[#181818] p-6 rounded-lg mt-6">
                  <h2 className="text-xl font-bold text-white mb-4">Top Performing Beats</h2>
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full divide-y divide-neutral-800">
                             <thead className="bg-transparent">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Track</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plays</th>
                              </tr>
                            </thead>
                            <tbody className="bg-transparent divide-y divide-neutral-800">
                              {topBeats.map((beat) => (
                                <tr key={beat.title} className="hover:bg-neutral-700/50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded" src={beat.cover} alt="" />
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-white">{beat.title}</div>
                                        <div className="text-sm text-gray-400">{beat.producer}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{beat.plays}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        </div>
      </div>
    </>
  )
}
