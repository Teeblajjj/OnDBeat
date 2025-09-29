import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import CartModal from '../components/CartModal'
import { AudioWaveform, Mic, Album, SlidersHorizontal, Music, ChevronRight, Play } from 'lucide-react'


// --- Dummy Data ---
const tools = [
  { name: "Beat Sequencer", description: "Craft rhythms with an intuitive drum machine.", icon: AudioWaveform, color: "text-blue-400" },
  { name: "Vocal Recorder", description: "Capture high-quality audio for your tracks.", icon: Mic, color: "text-red-400" },
  { name: "Sample Library", description: "Explore millions of royalty-free sounds.", icon: Album, color: "text-yellow-400" },
  { name: "Mixing & Mastering AI", description: "Get professional polish with our smart audio engineer.", icon: SlidersHorizontal, color: "text-purple-400" },
];

const recentProjects = [
  { name: "Midnight Drive", type: "Beat", lastEdited: "3 hours ago", cover: "https://images.unsplash.com/photo-1516999654410-482a4c2fee14?w=100&q=80" },
  { name: "Vocal Idea #3", type: "Recording", lastEdited: "1 day ago", cover: "https://images.unsplash.com/photo-1588623229388-a2923f500640?w=100&q=80" },
  { name: "Lofi Jam Session", type: "Beat", lastEdited: "4 days ago", cover: "https://images.unsplash.com/photo-1456428199391-a3b1cb8e35a3?w=100&q=80" },
];

// --- Page Component ---
export default function Tools() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents] = useState<any[]>([]);

  return (
    <>
      <Head>
        <title>Creator Tools - ONDBeat</title>
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
            <div className="max-w-6xl mx-auto">
                 {/* --- Hero Section --- */}
                 <div className="text-center py-12 md:py-16">
                    <Music size={48} className="mx-auto text-green-400 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Create Your Next Hit</h1>
                    <p className="text-gray-400 text-lg mb-8">All the tools you need to produce, record, and perfect your sound.</p>
                    <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full transition-colors">
                        Start New Project
                    </button>
                </div>

                {/* --- Tools Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {tools.map(tool => (
                        <div key={tool.name} className="bg-[#181818] p-6 rounded-lg flex items-center gap-6 hover:bg-[#282828] transition-colors cursor-pointer">
                            <div className="bg-neutral-800 p-4 rounded-full">
                                <tool.icon size={28} className={tool.color} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1">{tool.name}</h3>
                                <p className="text-gray-400">{tool.description}</p>
                            </div>
                             <button className="bg-white/10 text-white font-semibold py-2 px-4 rounded-full hover:bg-white/20 transition-colors">
                                Launch
                            </button>
                        </div>
                    ))}
                </div>

                {/* --- Recent Projects --- */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Recent Projects</h2>
                    <div className="space-y-4">
                        {recentProjects.map(project => (
                            <div key={project.name} className="bg-[#181818] p-4 rounded-lg flex items-center justify-between hover:bg-[#282828] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <img src={project.cover} alt={project.name} className="w-14 h-14 object-cover rounded-md"/>
                                    <div>
                                        <p className="font-bold text-white">{project.name}</p>
                                        <p className="text-sm text-gray-400">{project.type} ・ Edited {project.lastEdited}</p>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-4">
                                    <button className="w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 shadow-lg">
                                        <Play size={24} className="ml-1" />
                                    </button>
                                    <ChevronRight size={24} className="text-gray-500" />
                                </div>
                            </div>
                        ))}
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
