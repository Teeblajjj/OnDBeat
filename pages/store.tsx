import Head from "next/head";
import { useState, useEffect } from "react";
import { Play, Pause, Heart, MessageCircle, Share2, ShoppingCart, Search, Menu, X, Volume2, RotateCcw, SkipBack, SkipForward, ChevronDown, BarChart2Icon, AudioWaveform, HelpCircleIcon, ShoppingBagIcon, Rocket, Check, AlertCircle, Eye, EyeOff, Mail, User, Lock, Trash2, Minus, ArrowUpNarrowWide, ChevronRight, RefreshCw, List, Grid, Star, Download, Filter } from "lucide-react";
import { BsBagPlus } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";
import BeatModal from "../components/BeatModal";
import CartModal from "../components/CartModal";
import { useAuth } from "../context/AuthContext";

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  bpm: number;
  description: string;
  licenses: Array<{
    name: string;
    price: number;
    description: string;
    features: string[];
    limitations: string[];
  }>;
}

interface CartItem {
  beat: Beat;
  licenseIndex: number;
  quantity: number;
}

export default function Store() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBeat, setSelectedBeat] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openAuthModal } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number>(0);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents, setCartContents] = useState<any[]>([]);
  const [playerHidden, setPlayerHidden] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Audio simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const beats = [
    {
      id: 1,
      title: "lil mosey x nav type beat – 'spaceship'",
      producer: "LuckyBoy @prodbyluckyboy",
      price: 10,
      cover: "https://main.v2.beatstars.com/fit-in/tracks/200x200/filters:format(.jpeg):quality(80):fill(000000)/prod/track/artwork/TK23778305/-2-jpeg.jpg",
      time: "Dec 22, 2023",
      likes: 12,
      comments: 0,
      shares: 0,
      bpm: 140,
      description: "Melodic trap beat with dreamy synths and hard-hitting 808s, perfect for introspective lyrics.",
      licenses: [
        { name: "Basic", price: 10, description: "For non-profit use only", features: ["MP3 File", "Non-Exclusive", "Non-Profit Use Only"], limitations: ["No Distribution", "No Monetization"] },
        { name: "Premium", price: 25, description: "For commercial use up to 10k streams", features: ["WAV File", "Non-Exclusive", "Up to 10k Streams", "Monetization Allowed"], limitations: ["Max 10k Streams", "No TV/Film Use"] },
        { name: "Unlimited", price: 50, description: "Unlimited commercial use", features: ["WAV + Track Stems", "Non-Exclusive", "Unlimited Streams", "Full Monetization", "TV/Film Rights"], limitations: [] }
      ]
    },
    {
      id: 2,
      title: "Better with time – Neo Soul Type Beat",
      producer: "BeatStars @beatstars",
      price: 15,
      cover: "https://main.v2.beatstars.com/fit-in/tracks/200x200/filters:format(.jpeg):quality(80):fill(000000)/prod/track/artwork/TK23666405/attitude.jpg",
      time: "Apr 20, 2023",
      likes: 45,
      comments: 3,
      shares: 8,
      bpm: 95,
      description: "Smooth neo-soul instrumental with jazzy chords and laid-back groove, ideal for R&B vocals.",
      licenses: [
        { name: "Basic", price: 15, description: "For non-profit use only", features: ["MP3 File", "Non-Exclusive", "Non-Profit Use Only"], limitations: ["No Distribution", "No Monetization"] },
        { name: "Premium", price: 35, description: "For commercial use up to 15k streams", features: ["WAV File", "Non-Exclusive", "Up to 15k Streams", "Monetization Allowed"], limitations: ["Max 15k Streams", "No TV/Film Use"] },
        { name: "Unlimited", price: 75, description: "Unlimited commercial use", features: ["WAV + Track Stems", "Non-Exclusive", "Unlimited Streams", "Full Monetization", "TV/Film Rights"], limitations: [] }
      ]
    },
    {
      id: 3,
      title: "Drake Type Beat 2025 - 'Hold On'",
      producer: "PremiumBeats @premiumbeats",
      price: 25,
      cover: "https://cdn5.beatstars.com/eyJidWNrZXQiOiJwcm9kLWJ0cy10cmFjayIsImtleSI6InByb2QvdHJhY2svYXJ0d29yay9USzIzMjI0OTQ5Ly0xLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJmaWxsIiwid2lkdGgiOjE2MCwiaGVpZ2h0IjoxNjB9LCJ0b0Zvcm1hdCI6IndlYnAifX0=?t=1752585877035",
      time: "Jan 15, 2024",
      likes: 89,
      comments: 12,
      shares: 15,
      bpm: 120,
      description: "Atmospheric Toronto-style beat with emotional piano melodies and crisp trap drums.",
      licenses: [
        { name: "Basic", price: 25, description: "For non-profit use only", features: ["MP3 File", "Non-Exclusive", "Non-Profit Use Only"], limitations: ["No Distribution", "No Monetization"] },
        { name: "Premium", price: 50, description: "For commercial use up to 25k streams", features: ["WAV File", "Non-Exclusive", "Up to 25k Streams", "Monetization Allowed"], limitations: ["Max 25k Streams", "No TV/Film Use"] },
        { name: "Unlimited", price: 100, description: "Unlimited commercial use", features: ["WAV + Track Stems", "Non-Exclusive", "Unlimited Streams", "Full Monetization", "TV/Film Rights"], limitations: [] }
      ]
    },
    {
      id: 4,
      title: "Trap Vibes",
      producer: "DJ Killa",
      price: 20,
      cover: "https://source.unsplash.com/800x600/?music,trap",
      time: "Dec 22, 2023",
      likes: 120,
      comments: 45,
      shares: 12,
      bpm: 140,
      description: "Hard-hitting trap beat with deep 808s and crisp hi-hats.",
      licenses: [
        { name: "Basic", price: 20, description: "For non-profit use only", features: ["MP3 File", "Non-Exclusive", "Non-Profit Use Only"], limitations: ["No Distribution", "No Monetization"] },
        { name: "Premium", price: 30, description: "For commercial use up to 10k streams", features: ["WAV File", "Non-Exclusive", "Up to 10k Streams", "Monetization Allowed"], limitations: ["Max 10k Streams", "No TV/Film Use"] },
        { name: "Unlimited", price: 60, description: "Unlimited commercial use", features: ["WAV + Track Stems", "Non-Exclusive", "Unlimited Streams", "Full Monetization", "TV/Film Rights"], limitations: [] }
      ]
    },
    {
      id: 5,
      title: "Lo-Fi Dreams",
      producer: "ChillMaster",
      price: 15,
      cover: "https://source.unsplash.com/800x600/?music,lofi",
      time: "Apr 20, 2023",
      likes: 98,
      comments: 32,
      shares: 8,
      bpm: 95,
      description: "Relaxing lo-fi instrumental for study and chill vibes.",
      licenses: [
        { name: "Basic", price: 15, description: "For non-profit use only", features: ["MP3 File", "Non-Exclusive", "Non-Profit Use Only"], limitations: ["No Distribution", "No Monetization"] },
        { name: "Premium", price: 25, description: "For commercial use up to 15k streams", features: ["WAV File", "Non-Exclusive", "Up to 15k Streams", "Monetization Allowed"], limitations: ["Max 15k Streams", "No TV/Film Use"] },
        { name: "Unlimited", price: 50, description: "Unlimited commercial use", features: ["WAV + Track Stems", "Non-Exclusive", "Unlimited Streams", "Full Monetization", "TV/Film Rights"], limitations: [] }
      ]
    }
  ];

  // Shop items (samples, courses, plugins)
  const shopItems = [
    {
      id: 101,
      name: "Premium Sample Pack",
      description: "100+ high-quality samples for trap and hip-hop",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "Samples",
      type: "shop"
    },
    {
      id: 102,
      name: "Producer Starter Kit",
      description: "Everything you need to start producing beats",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Bundles",
      type: "shop"
    },
    {
      id: 103,
      name: "Mixing & Mastering Course",
      description: "Learn professional audio production techniques",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      rating: 4.7,
      reviews: 67,
      category: "Courses",
      type: "shop"
    },
    {
      id: 104,
      name: "VST Plugin Bundle",
      description: "Essential plugins for beat production",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop",
      rating: 4.6,
      reviews: 156,
      category: "Plugins",
      type: "shop"
    }
  ];

  const categories = [
    { name: "All", icon: "🎵", value: "all" },
    { name: "Beats", icon: "🎶", value: "beats" },
    { name: "Samples", icon: "🎧", value: "samples" },
    { name: "Courses", icon: "📚", value: "courses" },
    { name: "Plugins", icon: "🔌", value: "plugins" },
    { name: "Bundles", icon: "📦", value: "bundles" },
  ];

  const tags = [
    "808", "trap", "beats", "hip hop", "rnb", "drake", "rap", "Boom bap", "drill", "lil baby",
    "type beat", "future", "pop", "lofi", "chill", "sad", "happy", "angry", "party", "study",
  ];

  const featuredCreators = [
    { name: "Dakota Parker", followers: "99.6k", verified: true },
    { name: "BigBadBeats", followers: "246k", verified: true },
    { name: "BeatStars Pub", followers: "139.4k", verified: true },
    { name: "NukeBoyz", followers: "1.1k", verified: false },
    { name: "NINO", followers: "146", verified: false },
    { name: "Syndrome", followers: "289.8k", verified: true },
    { name: "Xzaviar", followers: "81.3k", verified: true },
  ];

  const togglePlay = (id: number) => {
    if (currentTrack === id) setIsPlaying(!isPlaying);
    else {
      setCurrentTrack(id);
      setIsPlaying(true);
      setAudioProgress(0);
    }
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const openLicenseModal = (beat: any) => {
    setSelectedBeat(beat);
    setIsModalOpen(true);
    setSelectedLicense(null);
  };

  const closeLicenseModal = () => {
    setIsModalOpen(false);
    setSelectedBeat(null);
    setSelectedLicense(null);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth submitted:');
    openAuthModal('signin');
  };

  const toggleLicenseSelection = (index: number) => {
    if (selectedLicense === index) {
      setSelectedLicense(null);
    } else {
      setSelectedLicense(index);
    }
  };

  const addToCart = () => {
    if (selectedLicense !== null && selectedBeat) {
      const newCartItem = {
        id: Date.now(),
        beat: selectedBeat,
        license: selectedBeat.licenses[selectedLicense],
        licenseIndex: selectedLicense,
        quantity: 1,
      };
      setCartContents((prev) => [...prev, newCartItem]);
      setCartItems((prev) => prev + 1);
      closeLicenseModal();
    }
  };

  const buyNow = () => {
    if (selectedLicense !== null && selectedBeat) {
      console.log('Redirecting to checkout with:', {
        beat: selectedBeat,
        license: selectedBeat.licenses[selectedLicense],
      });
      const newCartItem = {
        id: Date.now(),
        beat: selectedBeat,
        license: selectedBeat.licenses[selectedLicense],
        licenseIndex: selectedLicense,
        quantity: 1,
      };
      setCartContents((prev) => [...prev, newCartItem]);
      setCartItems((prev) => prev + 1);
      closeLicenseModal();
      window.location.href = '/checkout';
    }
  };

  const removeFromCart = (beatId: number, licenseIndex: number) => {
    setCartContents((prev) => prev.filter((item) => !(item.beat.id === beatId && item.licenseIndex === licenseIndex)));
    setCartItems((prev) => Math.max(0, prev - 1));
  };

  const updateQuantity = (beatId: number, licenseIndex: number, quantity: number) => {
    setCartContents((prev) =>
      prev.map((item) =>
        item.beat.id === beatId && item.licenseIndex === licenseIndex
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const filteredItems = selectedCategory === "all" 
    ? [...beats, ...shopItems]
    : selectedCategory === "beats" 
    ? beats 
    : shopItems.filter(item => item.category.toLowerCase() === selectedCategory);

  return (
    <>
      <Head>
        <title>Store - ONDBeat</title>
        <meta name="description" content="Discover beats, samples, courses, and production tools on ONDBeat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Store</h1>
                <p className="text-gray-400">Discover beats, samples, courses, and production tools</p>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.value 
                          ? "bg-green-500 text-black" 
                          : "bg-neutral-800 hover:bg-neutral-700 text-white"
                      }`}
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search beats, samples, courses..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-4">
                  <select 
                    className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>

                  <div className="flex gap-1 bg-neutral-800 rounded-lg p-1">
                    <button
                      className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"}`}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag, index) => (
                    <button 
                      key={index} 
                      className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                  <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-sm flex items-center gap-1 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Items Grid/List */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-neutral-900 rounded-lg overflow-hidden hover:bg-neutral-800 transition-colors group">
                      <div className="relative">
                        <img
                          src={item.cover || item.image}
                          alt={item.title || item.name}
                          className="w-full h-48 object-cover"
                        />
                        <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100">
                          <Heart className="w-5 h-5 text-white" />
                        </button>
                        {item.type === "shop" && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">{item.category}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          {item.type === "shop" && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-400">{item.rating}</span>
                              <span className="text-sm text-gray-400">({item.reviews})</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{item.title || item.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-green-400">${item.price}</span>
                          <button onClick={() => openLicenseModal(item)} className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                            <BsBagPlus className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors">
                      <div className="flex gap-6">
                        <img
                          src={item.cover || item.image}
                          alt={item.title || item.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {item.type === "shop" && (
                                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">{item.category}</span>
                                )}
                                {item.type === "shop" && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-400">{item.rating}</span>
                                    <span className="text-sm text-gray-400">({item.reviews})</span>
                                  </div>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold mb-2">{item.title || item.name}</h3>
                              <p className="text-gray-400 mb-4">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-400 mb-4">${item.price}</div>
                              <button onClick={() => openLicenseModal(item)} className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                                <BsBagPlus className="w-4 h-4" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Featured Creators */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">👑 Featured Creators</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {featuredCreators.map((creator, index) => (
                    <div key={index} className="bg-neutral-900 rounded-lg p-4 text-center hover:bg-neutral-800 transition-colors cursor-pointer">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-black font-bold text-lg">
                          {creator.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{creator.name}</h3>
                      <p className="text-xs text-gray-400">{creator.followers} followers</p>
                      {creator.verified && (
                        <Check className="w-4 h-4 text-green-400 mx-auto mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <PlayerBar />
        </div>
      </div>

      {/* Modals */}
      <BeatModal
        isOpen={isModalOpen}
        onClose={closeLicenseModal}
        beat={selectedBeat}
        selectedLicense={selectedLicense}
        onLicenseSelect={toggleLicenseSelection}
        onAddToCart={addToCart}
        onBuyNow={buyNow}
      />

      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cartItems={cartContents}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => window.location.href = '/checkout'}
      />
    </>
  );
}
