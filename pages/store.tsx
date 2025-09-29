import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PlayerBar from '../components/PlayerBar';
import CartModal from '../components/CartModal';
import { Search, ChevronDown, List, Grid, ShoppingCart, Play, SlidersHorizontal, Star } from 'lucide-react';
import { BsBagPlus } from 'react-icons/bs';


// --- Data ---
const initialItems = [
  { id: 1, type: 'beat', title: "Sunset Drive", producer: "Metro Boomin", price: 35, cover: "https://images.unsplash.com/photo-1516999654410-482a4c2fee14?w=400&q=80", tags: ['trap', 'chill'] },
  { id: 2, type: 'beat', title: "Ocean Eyes", producer: "Billie Eilish", price: 45, cover: "https://images.unsplash.com/photo-1577741313423-3975395d865b?w=400&q=80", tags: ['pop', 'sad'] },
  { id: 101, type: 'pack', name: "Essential Trap Drums", price: 29, creator: "ProSounds", image: "https://images.unsplash.com/photo-1588623229388-a2923f500640?w=400&q=80", rating: 4.8 },
  { id: 3, type: 'beat', title: "City Lights", producer: "The Weeknd", price: 55, cover: "https://images.unsplash.com/photo-1519892338195-e1b93931f681?w=400&q=80", tags: ['rnb', 'smooth'] },
  { id: 4, type: 'beat', title: "Desert Rose", producer: "Sting", price: 25, cover: "https://images.unsplash.com/photo-1470104432727-99338f45a277?w=400&q=80", tags: ['world', 'classic'] },
  { id: 102, type: 'course', name: "Music Theory for Producers", price: 99, creator: "SoundAcademy", image: "https://images.unsplash.com/photo-1456428199391-a3b1cb8e35a3?w=400&q=80", rating: 4.9 },
  { id: 5, type: 'beat', title: "Forest Gump", producer: "Frank Ocean", price: 65, cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80", tags: ['alternative', 'soul'] },
  { id: 6, type: 'beat', title: "Night Owl", producer: "Drake", price: 75, cover: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&q=80", tags: ['hiphop', 'dark'] },
];

const beatOfTheWeek = initialItems[0];

// --- Page ---
export default function Store() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const ProductCard = ({ item }) => {
    const isBeat = item.type === 'beat';
    const imageUrl = isBeat ? item.cover : item.image;
    const title = isBeat ? item.title : item.name;
    const creator = isBeat ? item.producer : item.creator;

    return (
      <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group">
        <div className="relative mb-4">
          <img src={imageUrl} alt={title} className="w-full h-auto aspect-square object-cover rounded-md shadow-lg" />
          <button className={`absolute bottom-2 right-2 w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-105 shadow-lg`}>
            {isBeat ? <Play size={24} className="ml-1" /> : <ShoppingCart size={22} />}
          </button>
        </div>
        <h3 className="text-white font-bold truncate">{title}</h3>
        <p className="text-gray-400 text-sm truncate mb-3">{creator}</p>
        <div className="flex justify-between items-center">
           <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-full flex items-center gap-2 text-sm">
              <BsBagPlus />
              <span>${item.price}</span>
            </button>
            {item.rating && (
                <div className="flex items-center gap-1 text-sm text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{item.rating}</span>
                </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Store - ONDBeat Marketplace</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={0}
          />

          <main className="bg-gradient-to-b from-neutral-900/60 to-[#121212]">
             <div 
                className="relative h-[40vh] md:h-[50vh] bg-cover bg-center flex items-end p-4 md:p-8"
                style={{backgroundImage: `linear-gradient(to top, rgba(18,18,18,1) 0%, rgba(18,18,18,0.6) 50%, transparent 100%), url(${beatOfTheWeek.cover})`}}>
                <div className="relative z-10">
                    <p className="text-sm font-bold text-green-400 mb-2">BEAT OF THE WEEK</p>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tighter">{beatOfTheWeek.title}</h1>
                    <p className="text-lg text-gray-300 max-w-lg mb-6">Experience the sound of {beatOfTheWeek.producer}. A perfect blend of chill vibes and trap soul.</p>
                    <div className="flex flex-wrap gap-4">
                         <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2 text-lg">
                            <Play size={22} className="ml-[-4px]" fill="black"/>
                            Play
                        </button>
                         <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2 text-lg">
                           <BsBagPlus size={20}/>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8">
                 <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-3xl font-bold text-white">Marketplace</h2>
                      <div className="flex gap-1 bg-neutral-800 rounded-full p-1">
                        <button className="px-4 py-1.5 rounded-full text-sm font-semibold bg-neutral-700 text-white">All</button>
                        <button className="px-4 py-1.5 rounded-full text-sm font-semibold text-neutral-300 hover:bg-neutral-700">Beats</button>
                        <button className="px-4 py-1.5 rounded-full text-sm font-semibold text-neutral-300 hover:bg-neutral-700">Sound Kits</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="text" placeholder="Search everything..." className="bg-neutral-800 border-2 border-transparent rounded-full pl-11 pr-4 py-2.5 text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                        </div>
                        <button className="bg-neutral-800 p-3 rounded-full hover:bg-neutral-700"><SlidersHorizontal size={20}/></button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {initialItems.map(item => <ProductCard key={item.id} item={item} />)}
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
