import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Play, Pause, Heart, ShoppingCart, Music, Check, Download, ChevronLeft, ChevronRight, Star, Mic2, Video, Copy, Signal, Users, RadioTower } from "lucide-react";
import { BsBagPlus } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";
import BeatModal from "../components/BeatModal";
import CartModal from "../components/CartModal";
import { useAuth } from "../context/AuthContext";

// --- Interfaces ---
interface License {
  name: string;
  price: number;
  files: string;
  recommended?: boolean;
  features: string[];
}
interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
  bpm: number;
  tags: string[];
  description: string;
  isFree?: boolean;
  licenses: License[];
}

interface CartItem { beat: Beat; licenseIndex: number; quantity: number; }
interface Creator { id: number; name: string; image: string; }
interface Category { name: string; cover: string; }
interface Collection { id: number; name: string; creator: string; cover: string; }

// --- Component ---
export default function Home() {
  // --- State ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openAuthModal } = useAuth();
  const [isLicenseModalOpen, setLicenseModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [beats, setBeats] = useState<Beat[]>([]);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<number | null>(0);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cartContents, setCartContents] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // --- Refs for Carousels ---
  const categoriesRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  // --- Dummy Data ---
  const categories: Category[] = [
    { name: "Chillwave", cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
    { name: "Trap", cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80" },
    { name: "Lofi", cover: "https://images.unsplash.com/photo-1542360291-a888d36a5b7c?w=400&q=80" },
    { name: "R&B", cover: "https://images.unsplash.com/photo-1588247866372-de3a1c8b353a?w=400&q=80" },
    { name: "Drill", cover: "https://images.unsplash.com/photo-1627192233909-51c4aaa4a6a5?w=400&q=80" },
    { name: "Boom Bap", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80" },
  ];

  const collections: Collection[] = [
      { id: 1, name: "Artist Essentials", creator: "ONDBeat Curated", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80" },
      { id: 2, name: "Summer Vibes", creator: "LuckyBoy", cover: "https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=400&q=80" },
      { id: 3, name: "Late Night Drive", creator: "PremiumBeats", cover: "https://images.unsplash.com/photo-1531338700946-76e4c7ba1200?w=400&q=80" },
      { id: 4, name: "Workout Fuel", creator: "BeatStars", cover: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&q=80" },
      { id: 5, name: "Focus Flow", creator: "ONDBeat Curated", cover: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80" },
      { id: 6, name: "Drill UK Hits", creator: "Syndrome", cover: "https://images.unsplash.com/photo-1593113646773-4627116a537d?w=400&q=80" },
  ];

  const featuredCreators: Creator[] = [
      { id: 1, name: "Davido", image: "https://i.scdn.co/image/ab67616100005174799f3b0aa263a21763176f7a" },
      { id: 2, name: "Shallipopi", image: "https://i.scdn.co/image/ab67616100005174d9e1f422c59a34a26c483f2d" },
      { id: 3, name: "Asake", image: "https://i.scdn.co/image/ab676161000051743e49c7c25c35d79a5c4323c2" },
      { id: 4, name: "Seyi Vibez", image: "https://i.scdn.co/image/ab67616100005174d3203279c09445d50692994f" },
      { id: 5, name: "Burna Boy", image: "https://i.scdn.co/image/ab67616100005174b19af0ea736c6228d6eb539c" },
      { id: 6, name: "ODUMODUBLVCK", image: "https://i.scdn.co/image/ab6761610000517472481b593678546f6161e1b5" },
  ];

  const sampleLicenses: License[] = [
    { 
      name: "Basic License", 
      price: 29.95,
      files: "MP3",
      features: [
        "Used for Music Recording",
        "1 Music Video",
        "Distribute up to 2,000 copies",
        "100,000 Online Audio Streams"
      ]
    },
    { 
      name: "Premium License", 
      price: 49.95,
      files: "WAV, MP3",
      features: [
        "Used for Music Recording",
        "1 Music Video",
        "Distribute up to 5,000 copies",
        "250,000 Online Audio Streams",
        "For Profit Live Performances"
      ]
    },
    { 
      name: "Premium Plus License", 
      price: 99.95,
      files: "STEMS, WAV, MP3",
      recommended: true,
      features: [
        "Used for Music Recording",
        "1 Music Video",
        "Distribute up to 10,000 copies",
        "500,000 Online Audio Streams",
        "For Profit Live Performances",
        "Radio Broadcasting Rights (2 Stations)"
      ]
    },
     { 
      name: "Unlimited License", 
      price: 149.95,
      files: "STEMS, WAV, MP3",
      features: [
        "Used for Music Recording",
        "Unlimited Music Videos",
        "Unlimited Distribution",
        "Unlimited Online Audio Streams",
        "For Profit Live Performances",
        "Radio Broadcasting Rights (Unlimited)"
      ]
    },
    { 
      name: "Exclusive License", 
      price: 0, // Negotiate
      files: "STEMS, WAV, MP3",
      features: [
        "Used for Music Recording",
        "Unlimited Music Videos",
        "Unlimited Distribution",
        "Unlimited Online Audio Streams",
        "For Profit Live Performances",
        "Radio Broadcasting Rights (Unlimited)",
        "Exclusive Rights to the Beat"
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setBeats([
        { id: 1, title: "Spaceship", producer: "LuckyBoy", price: 29.95, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", bpm: 140, tags: ["trap", "hip-hop", "drake"], description: "...", licenses: sampleLicenses },
        { id: 2, title: "Attitude", producer: "BeatStars", price: 0, isFree: true, cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80", bpm: 95, tags: ["pop", "chill", "upbeat"], description: "...", licenses: sampleLicenses.slice(0,1) },
        { id: 3, title: "Hold On", producer: "PremiumBeats", price: 49.95, cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", bpm: 120, tags: ["r&b", "soul", "smooth"], description: "...", licenses: sampleLicenses },
        { id: 4, title: "Kentro", producer: "Fireboy DML", price: 29.95, cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80", bpm: 140, tags: ["afrobeat", "dancehall", "summer"], description: "...", licenses: sampleLicenses },
        { id: 5, title: "Skido", producer: "Victony", price: 29.95, cover: "https://images.unsplash.com/photo-1458560871784-56d23406c791?w=400&q=80", bpm: 95, tags: ["lofi", "chillhop", "relax"], description: "...", licenses: sampleLicenses },
        { id: 6, title: "Jungle", producer: "Syndrome", price: 0, isFree: true, cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&q=80", bpm: 110, tags: ["drill", "uk", "grime"], description: "...", licenses: sampleLicenses.slice(0,1) },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---
  const openLicenseModal = (beat: Beat) => { 
    setSelectedBeat(beat); 
    setLicenseModalOpen(true); 
    const recommendedIndex = beat.licenses.findIndex(l => l.recommended);
    setSelectedLicense(recommendedIndex !== -1 ? recommendedIndex : 0);
  };
  const closeLicenseModal = () => { setLicenseModalOpen(false); setSelectedBeat(null); setSelectedLicense(null); };
  const addToCart = () => {
    if (!selectedBeat || selectedLicense === null) return;
    
    const itemExists = cartContents.find(item => item.beat.id === selectedBeat.id && item.licenseIndex === selectedLicense);
    if(itemExists) {
       closeLicenseModal();
       setCartModalOpen(true);
      return;
    }

    const cartItem: CartItem = {
      beat: selectedBeat,
      licenseIndex: selectedLicense,
      quantity: 1
    };
    setCartContents(prev => [...prev, cartItem]);
    closeLicenseModal();
    setCartModalOpen(true);
  };

  const handleBuyNow = () => {
      if (!selectedBeat || selectedLicense === null) return;
      
      const itemExists = cartContents.find(item => item.beat.id === selectedBeat.id && item.licenseIndex === selectedLicense);
      if(!itemExists) {
        const cartItem: CartItem = {
          beat: selectedBeat,
          licenseIndex: selectedLicense,
          quantity: 1
        };
        setCartContents(prev => [...prev, cartItem]);
      }

      closeLicenseModal();
      router.push("/checkout");
  }

  const handleCheckout = () => {
      setCartModalOpen(false);
      router.push("/checkout");
  }

  const togglePlay = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (currentTrack === id) setIsPlaying(!isPlaying);
    else { setCurrentTrack(id); setIsPlaying(true); }
  };

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    ref.current?.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  // --- Components ---
  const Carousel = ({ title, children, scrollRef }: { title: string, children: React.ReactNode, scrollRef: React.RefObject<HTMLDivElement> }) => (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-400 hover:underline cursor-pointer">Show all</span>
          <button onClick={() => scroll(scrollRef, 'left')} className="bg-black/50 rounded-full p-1 hover:bg-white/20"><ChevronLeft size={20} /></button>
          <button onClick={() => scroll(scrollRef, 'right')} className="bg-black/50 rounded-full p-1 hover:bg-white/20"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex overflow-x-auto gap-6 scrollbar-hide">
        {children}
      </div>
    </section>
  );

  const BeatCard = ({ beat }: { beat: Beat }) => (
    <Link href={`/beats/${beat.id}`} legacyBehavior>
        <a className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group w-48 flex-shrink-0 block">
            <div className="relative mb-4">
                <img src={beat.cover} alt={beat.title} className="w-full h-40 object-cover rounded-md" />
                <button onClick={(e) => togglePlay(e, beat.id)} className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-105 shadow-lg">
                {currentTrack === beat.id && isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                </button>
            </div>
            <h3 className="text-white font-bold truncate">{beat.title}</h3>
            <p className="text-gray-400 text-sm truncate mb-4">{beat.producer}</p>
            <div className="flex items-center justify-between">
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); openLicenseModal(beat); }} className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-full flex items-center gap-2 text-sm">
                <BsBagPlus />
                <span>${beat.price}</span>
                </button>
                {beat.isFree && <Download size={20} className="text-gray-400 hover:text-white" />}
            </div>
        </a>
    </Link>
  );

  return (
    <>
      <Head>
        <title>ONDBeat - Discover Beats</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-64"> {/* Adjusted for wider sidebar */}
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cartContents.length}
          />

          <main className="p-4 md:p-8 bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
            <div className="max-w-full mx-auto">

              <Carousel title="Trending Categories" scrollRef={categoriesRef}>
                {categories.map((category) => (
                    <div key={category.name} className="bg-neutral-800 rounded-lg w-60 h-24 flex-shrink-0 relative overflow-hidden cursor-pointer hover:bg-neutral-700 transition-colors">
                        <img src={category.cover} className="w-24 h-24 object-cover absolute -right-4 -bottom-4 transform rotate-12"/>
                        <h3 className="text-white font-bold text-xl p-4">{category.name}</h3>
                    </div>
                ))}
              </Carousel>

              <Carousel title="Top Collections" scrollRef={collectionsRef}>
                  {collections.map((item) => (
                    <Link href={`/collections/${item.id}`} key={item.id} legacyBehavior>
                      <a className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group w-48 flex-shrink-0 block">
                          <img src={item.cover} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                          <h3 className="text-white font-bold truncate">{item.name}</h3>
                          <p className="text-gray-400 text-sm truncate">By {item.creator}</p>
                      </a>
                    </Link>
                  ))}
              </Carousel>

              <Carousel title="Featured Beats" scrollRef={featuredRef}>
                {beats.map((beat) => <BeatCard key={beat.id} beat={beat} />)}
              </Carousel>

               <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">Popular Artists</h2>
                     <span className="text-sm font-bold text-gray-400 hover:underline cursor-pointer">Show all</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {featuredCreators.map((creator) => (
                        <Link href={`/profile/${creator.id}`} key={creator.id} legacyBehavior>
                            <a className="bg-transparent p-2 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer text-center group block">
                                <img src={creator.image} alt={creator.name} className="w-full rounded-full mb-4 shadow-lg" />
                                <h3 className="text-white font-bold truncate">{creator.name}</h3>
                                <p className="text-gray-400 text-sm">Artist</p>
                            </a>
                        </Link>
                    ))}
                </div>
              </section>

            </div>
          </main>

          <PlayerBar isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} currentTrack={beats.find(b => b.id === currentTrack)} progress={0} />
        </div>
      </div>

      <BeatModal isOpen={isLicenseModalOpen} onClose={closeLicenseModal} beat={selectedBeat} selectedLicense={selectedLicense} onLicenseSelect={setSelectedLicense} onAddToCart={addToCart} onBuyNow={handleBuyNow} />
      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={handleCheckout} />
    </>
  );
}
