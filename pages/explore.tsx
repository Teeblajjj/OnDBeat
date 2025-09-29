import Head from 'next/head'
import { useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import CartModal from '../components/CartModal'
import { ChevronLeft, ChevronRight, Play, ShoppingCart } from 'lucide-react'

// --- Dummy Data ---
const genres = [
    { name: "Hip Hop", color: "bg-red-500", image: "https://images.unsplash.com/photo-1593699891482-b7512a153297?w=200&q=80" },
    { name: "R&B", color: "bg-blue-500", image: "https://images.unsplash.com/photo-1588247866372-de3a1c8b353a?w=200&q=80" },
    { name: "Pop", color: "bg-pink-500", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80" },
    { name: "Electronic", color: "bg-purple-500", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&q=80" },
    { name: "Drill", color: "bg-yellow-500", image: "https://images.unsplash.com/photo-1627192233909-51c4aaa4a6a5?w=200&q=80" },
    { name: "Afrobeats", color: "bg-green-500", image: "https://images.unsplash.com/photo-1604313520624-91896887372d?w=200&q=80" },
];

const moods = [
    { name: "Chill", image: "https://images.unsplash.com/photo-1499415479124-73d324974242?w=400&q=80" },
    { name: "Energetic", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80" },
    { name: "Focused", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80" },
    { name: "Melancholic", image: "https://images.unsplash.com/photo-1456428199391-a3b1cb8e35a3?w=400&q=80" },
    { name: "Uplifting", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&q=80" },
    { name: "Introspective", image: "https://images.unsplash.com/photo-1531338700946-76e4c7ba1200?w=400&q=80" },
];

const featuredPlaylists = [
    { name: "Top 100 Nigeria", description: "The biggest tracks in Nigeria right now.", cover: "https://i.scdn.co/image/ab67706f00000002183c7343e06a3821096b05b3" },
    { name: "Afrobeats Hits", description: "The best in afrobeats, updated weekly.", cover: "https://i.scdn.co/image/ab67706f00000002b55b65f24c0c802b3765b21c" },
];

const newReleases = [
  { id: 1, title: "Sunset Drive", producer: "Metro Boomin", price: 35, cover: "https://images.unsplash.com/photo-1516999654410-482a4c2fee14?w=400&q=80" },
  { id: 2, title: "Ocean Eyes", producer: "Billie Eilish", price: 45, cover: "https://images.unsplash.com/photo-1577741313423-3975395d865b?w=400&q=80" },
  { id: 3, title: "City Lights", producer: "The Weeknd", price: 55, cover: "https://images.unsplash.com/photo-1519892338195-e1b93931f681?w=400&q=80" },
  { id: 4, title: "Desert Rose", producer: "Sting", price: 25, cover: "https://images.unsplash.com/photo-1470104432727-99338f45a277?w=400&q=80" },
  { id: 5, title: "Forest Gump", producer: "Frank Ocean", price: 65, cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80" },
  { id: 6, title: "Night Owl", producer: "Drake", price: 75, cover: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&q=80" },
];

// --- Page Component ---
export default function Explore() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents] = useState<any[]>([]);

  return (
    <>
      <Head>
        <title>Explore - ONDBeat</title>
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
              <h1 className="text-4xl font-extrabold text-white mb-8">Explore</h1>

              {/* Featured Playlists */}
              <section className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {featuredPlaylists.map(playlist => (
                          <div key={playlist.name} className="bg-neutral-800/50 hover:bg-neutral-700/70 transition-colors rounded-lg flex items-center gap-4 cursor-pointer group">
                              <img src={playlist.cover} alt={playlist.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-l-lg" />
                              <div className="flex-grow pr-4">
                                <h3 className="text-white font-bold text-base md:text-lg truncate">{playlist.name}</h3>
                                <p className="text-gray-400 text-xs md:text-sm truncate">{playlist.description}</p>
                              </div>
                               <button className="mr-4 w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 shadow-lg flex-shrink-0">
                                  <Play size={24} className="ml-1" />
                              </button>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Genres */}
              <section className="mb-12">
                 <h2 className="text-2xl font-bold text-white mb-4 hover:underline cursor-pointer">Browse all</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {genres.map(genre => (
                        <div key={genre.name} className={`${genre.color} aspect-square rounded-lg p-4 relative overflow-hidden cursor-pointer transition-transform hover:scale-105`}>
                            <h3 className="text-white font-bold text-2xl">{genre.name}</h3>
                            <img src={genre.image} alt={genre.name} className="w-24 h-24 object-cover absolute -right-4 -bottom-4 transform rotate-25"/>
                        </div>
                    ))}
                 </div>
              </section>

              {/* New Releases */}
               <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">New Releases</h2>
                    <span className="text-sm font-bold text-gray-400 hover:underline cursor-pointer">Show all</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {newReleases.map(beat => (
                        <div key={beat.id} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group">
                            <div className="relative mb-4">
                                <img src={beat.cover} alt={beat.title} className="w-full h-auto aspect-square object-cover rounded-md" />
                                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105">
                                    <Play size={24} className="ml-1" />
                                </button>
                            </div>
                            <h3 className="text-white font-bold truncate">{beat.title}</h3>
                            <p className="text-gray-400 text-sm truncate mb-2">{beat.producer}</p>
                            <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-full flex items-center justify-center gap-2 text-sm">
                              <ShoppingCart size={16} />
                              <span>${beat.price}</span>
                            </button>
                        </div>
                    ))}
                </div>
              </section>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        </div>
      </div>
    </>
  )
}
