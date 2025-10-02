
import Head from 'next/head';
import { useState } from 'react';
import { Search, ChevronDown, ThumbsUp, BarChart, FileText, DollarSign, Music, Zap, Sliders, RefreshCw, LayoutGrid, List, PlayIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PlayerBar from '../components/PlayerBar';
import CartModal from '../components/CartModal';

// --- Dummy Data ---
const mainCategories = [
    { name: 'New & Notable', icon: ThumbsUp },
    { name: 'Top Charts', icon: BarChart },
    { name: 'Exclusive', icon: FileText },
    { name: 'Under $50', icon: DollarSign },
    { name: 'Hip-Hop', icon: Music },
    { name: 'Trap', icon: Music },
    { name: 'R&B', icon: Music },
    { name: 'Pop', icon: Music },
    { name: 'Drill', icon: Music },
];

const popularTags = ['808', 'trap', 'beats', 'hip hop', 'rnb', 'drake', 'rap', 'boom bap', 'drill', 'lil baby', 'type beat', 'future', 'pop'];

const beats = [
  { id: 1, title: "Sunset Drive", producer: "Metro Boomin", price: 35.00 },
  { id: 2, title: "Ocean Eyes", producer: "Billie Eilish", price: 45.00 },
  { id: 3, title: "City Lights", producer: "The Weeknd", price: 55.00 },
  { id: 4, title: "Desert Rose", producer: "Sting", price: 25.00 },
  { id: 5, title: "Forest Gump", producer: "Frank Ocean", price: 65.00 },
  { id: 6, title: "Night Owl", producer: "Drake", price: 75.00 },
];


// --- Page Component ---
export default function Explore() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [cartContents] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState('New & Notable');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    return (
        <>
            <Head>
                <title>Explore Beats - ONDBEAT</title>
            </Head>

            <div className="min-h-screen bg-black text-white flex">
                <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
                
                <div className="flex-grow md:ml-60">
                    <Header 
                        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                        onCartClick={() => setCartModalOpen(true)}
                        cartItems={cartContents.length}
                    />

                    <main className="p-4 md:p-6 lg:p-8">
                        <div className="max-w-full mx-auto">
                            
                            {/* --- Main Categories Bar --- */}
                            <section className="mb-6">
                                <h2 className="text-2xl font-bold text-white mb-4">New & Notable</h2>
                                <div className="flex items-center space-x-2 overflow-x-auto pb-4 -mx-4 px-4">
                                    {mainCategories.map((cat, index) => (
                                        <CategoryButton 
                                            key={index} 
                                            category={cat} 
                                            isActive={activeCategory === cat.name}
                                            onClick={() => setActiveCategory(cat.name)}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* --- Advanced Filters --- */}
                            <section className="mb-8 p-4 bg-[#121212] rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    <div className="md:col-span-4 lg:col-span-3">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                            <input 
                                                type="text"
                                                placeholder="Search for tags"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-8 lg:col-span-9 overflow-x-hidden">
                                        <div className="flex items-center gap-2 -mx-4 px-4 overflow-x-auto pb-2">
                                            {popularTags.map(tag => (
                                                <button key={tag} className="flex-shrink-0 text-sm bg-neutral-700/50 hover:bg-neutral-600/70 text-neutral-300 px-3 py-1 rounded-full transition">{tag}</button>
                                            ))}
                                            <button className="flex-shrink-0 flex items-center gap-2 text-sm text-neutral-300 hover:text-white"><RefreshCw size={14} /> Refresh</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-4">
                                    <FilterDropdown text="Genre" />
                                    <FilterDropdown text="Category" />
                                    <FilterDropdown text="Price" />
                                    <FilterDropdown text="Mood" />
                                    <FilterDropdown text="Instruments" />
                                    <div className="flex-grow"></div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-500 text-black' : 'bg-neutral-800 hover:bg-neutral-700'}`}><List size={20}/></button>
                                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-500 text-black' : 'bg-neutral-800 hover:bg-neutral-700'}`}><LayoutGrid size={20}/></button>
                                    </div>
                                </div>
                            </section>

                            {/* --- Beats Grid / List --- */}
                            <section>
                                {viewMode === 'grid' ? (
                                    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                        {beats.map(beat => (
                                            <BeatCard key={beat.id} beat={beat} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {beats.map(beat => (
                                            <ListViewItem key={beat.id} beat={beat} />
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    </main>

                    <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
                    <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
                </div>
            </div>
        </>
    );
}

const CategoryButton = ({ category, isActive, onClick }) => {
    const Icon = category.icon;
    return (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-28 h-28 p-2 rounded-lg transition-colors flex-shrink-0 ${isActive ? 'bg-green-500/80 text-white' : 'bg-[#181818] hover:bg-[#282828]'}`}
        >
            <Icon size={32} className="mb-2" />
            <span className="text-sm font-bold text-center">{category.name}</span>
        </button>
    );
};

const FilterDropdown = ({ text }) => (
    <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-full px-4 py-1.5 text-sm font-medium text-white transition">
        <span>{text}</span>
        <ChevronDown size={16} />
    </button>
);

const BeatCard = ({ beat }) => (
    <div className="bg-transparent rounded-lg overflow-hidden group transition-all duration-300">
        <div className="relative">
            <div className="aspect-square bg-neutral-800 rounded-lg flex items-center justify-center">
                 <Music size={64} className="text-neutral-600" />
            </div>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <button className="w-10 h-10 bg-green-500/80 backdrop-blur-sm text-black rounded-full flex items-center justify-center transform transition-transform hover:scale-110">
                    {/* Play icon here */}
                    <PlayIcon size={26} className="text-neutral-100" />
                </button>
            </div>
        </div>
        <div className="mt-2">
            <h3 className="font-semibold text-white text-sm truncate">{beat.title}</h3>
            <p className="text-xs text-neutral-400 truncate">{beat.producer}</p>
            <p className="text-sm font-bold text-green-400 mt-1">${beat.price.toFixed(2)}</p>
        </div>
    </div>
);

const ListViewItem = ({ beat }) => (
    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#181818] transition-colors">
        <div className="w-12 h-12 bg-neutral-800 rounded-md flex-shrink-0 flex items-center justify-center">
            <Music size={24} className="text-neutral-600" />
        </div>
        <div className="flex-grow grid grid-cols-3 items-center gap-4">
            <h3 className="font-semibold text-white truncate">{beat.title}</h3>
            <p className="text-sm text-neutral-400 truncate">{beat.producer}</p>
            <p className="text-sm font-bold text-green-400 justify-self-end">${beat.price.toFixed(2)}</p>
        </div>
    </div>
);
