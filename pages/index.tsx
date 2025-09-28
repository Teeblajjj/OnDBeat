import Head from "next/head";
import { useState, useEffect } from "react";
import { HomeIcon, ShoppingBagIcon, Users, BarChart2Icon, HelpCircleIcon, Play, Pause, Heart, MessageCircle, Share2, ShoppingCart, Search, Menu, X, Volume2, RotateCcw, SkipBack, SkipForward, ChevronDown, AudioWaveform, Rocket, Check, AlertCircle, Eye, EyeOff, Mail, User, Lock, Trash2, Minus, ArrowUpNarrowWide, Music } from "lucide-react";
import { BsBagPlus } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BeatCard from "../components/BeatCard";
import PlayerBar from "../components/PlayerBar";
import AuthModal from "../components/AuthModal";
import BeatModal from "../components/BeatModal";
import CartModal from "../components/CartModal";

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

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBeat, setSelectedBeat] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number>(0);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents, setCartContents] = useState<any[]>([]);
  const [playerHidden, setPlayerHidden] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
        setAudioProgress(prev => {
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
      description: "Smooth neo-soul instrumental with jazzy chords and laid-back groove, ideal for R&B vocals Smooth neo-soul instrumental with jazzy chords and laid-back groove, ideal for R&B vocals.",
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
    }
  ];


  const featuredCreators = [
    { name: "Dakota Parker", followers: "99.6k", verified: true },
    { name: "BigBadBeats", followers: "246k", verified: true },
    { name: "BeatStars Pub", followers: "139.4k", verified: true },
    { name: "NukeBoyz", followers: "1.1k", verified: false },
    { name: "NINO", followers: "146", verified: false },
    { name: "Syndrome", followers: "289.8k", verified: true },
    { name: "Xzaviar", followers: "81.3k", verified: true }
  ];

  const trendingSearches = [
    { name: "Teeblajjj", sponsored: true },
    { name: "Mazz Music", sponsored: true },
    { name: "Lil Baby Type Beat", sponsored: false },
    { name: "Travis Scott Beat", sponsored: false }
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

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    // Reset form fields
    setEmail('');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
    setShowPassword(false);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Auth submitted:', { authMode, email, password, username });
    // Close modal after successful submission
    closeAuthModal();
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
        licenseIndex: selectedLicense
      };
      setCartContents(prev => [...prev, newCartItem]);
      setCartItems(prev => prev + 1);
      closeLicenseModal();
    }
  };

  const buyNow = () => {
    if (selectedLicense !== null && selectedBeat) {
      // In a real app, this would redirect to checkout page
      console.log('Redirecting to checkout with:', {
        beat: selectedBeat,
        license: selectedBeat.licenses[selectedLicense]
      });
      // Simulate adding to cart and redirecting
      const newCartItem = {
        id: Date.now(),
        beat: selectedBeat,
        license: selectedBeat.licenses[selectedLicense],
        licenseIndex: selectedLicense
      };
      setCartContents(prev => [...prev, newCartItem]);
      setCartItems(prev => prev + 1);
      closeLicenseModal();
      // Redirect to checkout page
      window.location.href = '/checkout';
    }
  };

  const removeFromCart = (cartItemId: number) => {
    setCartContents(prev => prev.filter(item => item.id !== cartItemId));
    setCartItems(prev => Math.max(0, prev - 1));
  };

  // New handler functions for components
  const handleLike = (id: number) => {
    console.log('Liked beat:', id);
  };

  const handleComment = (id: number) => {
    console.log('Comment on beat:', id);
  };

  const handleShare = (id: number) => {
    console.log('Share beat:', id);
  };

  const handleAddToCart = (beat: Beat, licenseIndex?: number) => {
    if (licenseIndex !== undefined) {
      const existingItem = cartContents.find(
        item => item.beat.id === beat.id && item.licenseIndex === licenseIndex
      );
      
      if (existingItem) {
        setCartContents(prev => 
          prev.map(item => 
            item.beat.id === beat.id && item.licenseIndex === licenseIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartContents(prev => [...prev, { beat, licenseIndex, quantity: 1 }]);
      }
      
      setCartItems(prev => prev + 1);
    } else {
      // Quick add with basic license
      handleAddToCart(beat, 0);
    }
  };

  const handleBeatClick = (beat: Beat) => {
    setSelectedBeat(beat);
    setSelectedLicense(null);
    setIsModalOpen(true);
  };

  const handleRemoveFromCart = (beatId: number, licenseIndex: number) => {
    setCartContents(prev => prev.filter(item => 
      !(item.beat.id === beatId && item.licenseIndex === licenseIndex)
    ));
    setCartItems(prev => Math.max(0, prev - 1));
  };

  const handleUpdateQuantity = (beatId: number, licenseIndex: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(beatId, licenseIndex);
      return;
    }
    
    setCartContents(prev => prev.map(item => 
      item.beat.id === beatId && item.licenseIndex === licenseIndex
        ? { ...item, quantity }
        : item
    ));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartContents);
    setCartModalOpen(false);
    // Navigate to checkout page
  };

  // Shimmer loading component
  const ShimmerCard = () => (
    <div className="bg-[#0d0d0d] border border-[#0d0d0d] rounded-sm p-5 mb-5 animate-pulse">
      <div className="flex gap-4">
        <div className="relative w-32 h-32 flex-shrink-0 bg-[#1c1c1c] rounded-sm">
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-12 h-12 text-[#2e2d2d]" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-[#1c1c1c] rounded w-3/4"></div>
          <div className="h-4 bg-[#1c1c1c] rounded w-1/2"></div>
          <div className="h-4 bg-[#1c1c1c] rounded w-1/3"></div>
          <div className="h-4 bg-[#1c1c1c] rounded w-1/4"></div>
          <div className="flex items-center justify-between mt-3">
            <div className="h-8 bg-[#1c1c1c] rounded w-24"></div>
            <div className="flex items-center space-x-4">
              <div className="h-6 bg-[#1c1c1c] rounded w-12"></div>
              <div className="h-6 bg-[#1c1c1c] rounded w-12"></div>
              <div className="h-6 bg-[#1c1c1c] rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile-only full background - positioned behind everything */}
      <div className="lg:hidden fixed inset-0 bg-[#0a0a0a] z-[-1]"></div>
      
      <div className="bg-[#0a0a0a] text-[#e6e6e6] min-h-screen min-w-screen">
        <Head>
          <title>ONDBeat</title>
          <meta name="description" content="Beat marketplace platform" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Cart Modal */}
        {cartModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border border-[#222] rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#222]">
                <h2 className="text-xl font-bold text-[#e6e6e6]">Your Cart ({cartItems})</h2>
                <button onClick={() => setCartModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {cartContents.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                    <p className="text-sm text-gray-500 mt-2">Add beats to your cart to see them here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartContents.map((item) => (
                      <div key={item.id} className="border border-[#222] rounded-lg p-4">
                        <div className="flex gap-3">
                          <img src={item.beat.cover} alt={item.beat.title} className="w-12 h-12 rounded object-cover" />
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-sm">{item.beat.title}</h4>
                            <p className="text-xs text-gray-400">by {item.beat.producer}</p>
                            <p className="text-sm font-bold text-[#1ed760] mt-1">{item.license.name} - ${item.license.price}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cartContents.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400">Total:</span>
                      <span className="text-xl font-bold text-white">
                        ${cartContents.reduce((sum, item) => sum + item.license.price, 0)}
                      </span>
                    </div>
                    <button 
                      className="w-full bg-[#1ed760] hover:bg-[#53c268] text-black font-bold py-3 rounded-lg"
                      onClick={() => {
                        setCartModalOpen(false);
                        window.location.href = '/checkout';
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Authentication Modal */}
        {authModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border border-[#222] rounded-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#222]">
                <h2 className="text-xl font-bold text-[#e6e6e6]">
                  {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </h2>
                <button onClick={closeAuthModal} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <form onSubmit={handleAuthSubmit}>
                  {authMode === 'signup' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="username">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {authMode === 'signup' && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-lg transition"
                  >
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">
                    {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                      className="ml-1 text-white hover:text-gray-300 font-medium"
                    >
                      {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* License Modal */}
        {isModalOpen && selectedBeat && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2">
            <div className="bg-[#1a1a1a] border border-[#222] rounded-lg max-w-2xl w-full max-h-[72vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#222]">
                <div className="flex items-center gap-4">
                  <img src={selectedBeat.cover} alt={selectedBeat.title} className="w-16 h-13 rounded-lg object-cover" />
                  <div>
                    <h2 className="text-xl font-bold text-[#e6e6e6]">{selectedBeat.title}</h2>
                    <p className="text-sm text-gray-400">by {selectedBeat.producer}</p>
                    <p className="text-xs text-gray-500">{selectedBeat.bpm} BPM • Released {selectedBeat.time}</p>
                  </div>
                </div>
                <button onClick={closeLicenseModal} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 text-white">License Options</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Choose the right license for your project. All licenses are non-exclusive and include instant digital delivery.
                </p>

                <div className="space-y-4">
                  {selectedBeat.licenses.map((license: any, index: number) => (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-4 transition cursor-pointer ${
                        selectedLicense === index 
                          ? 'border-[#1ed760] bg-[#1ed760]/10' 
                          : 'border-[#222] hover:border-gray-500'
                      }`}
                      onClick={() => toggleLicenseSelection(index)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg text-white">{license.name}</h4>
                          <p className="text-sm text-gray-400">{license.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">${license.price}</span>
                          <p className="text-xs text-gray-500">USD</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-3">
                        <h5 className="font-medium text-sm text-gray-300 mb-2">Included:</h5>
                        <div className="flex flex-wrap gap-2">
                          {license.features.map((feature: string, featIndex: number) => (
                            <span key={featIndex} className="inline-flex items-center gap-1 bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                              <Check className="w-3 h-3 text-gray-400" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Limitations */}
                      {license.limitations.length > 0 && (
                        <div className="mb-3">
                          <h5 className="font-medium text-sm text-gray-300 mb-2">Limitations:</h5>
                          <div className="flex flex-wrap gap-2">
                            {license.limitations.map((limitation: string, limitIndex: number) => (
                              <span key={limitIndex} className="inline-flex items-center gap-1 bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                                <AlertCircle className="w-3 h-3 text-gray-400" />
                                {limitation}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="mt-6 p-3 bg-[#222] rounded-lg">
                  <p className="text-xs text-gray-400 text-center">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    All sales are final. Please review license terms before purchasing.
                  </p>
                </div>

                {/* Action Buttons - Only show when license is selected */}
                {selectedLicense !== null && (
                  <div className="flex gap-3 mt-6 pt-4 border-t border-[#222]">
                    <button 
                      className="flex-1 bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-lg transition"
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="flex-1 bg-[#1ed760] hover:bg-[#53c268] text-black font-bold py-3 rounded-lg transition"
                      onClick={buyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 md:hidden" onClick={toggleMobileMenu}>
            <div className="w-64 h-full bg-[#0f0f0f] p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-[#1ed760] text-2xl font-bold">ONDBeat</h1>
                <button onClick={toggleMobileMenu} className="text-white"><X className="w-6 h-6" /></button>
              </div>
              <nav className="space-y-4">
                {sidebarItems.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <a key={i} href="#" className="flex items-center space-x-2 hover:text-[#1ed760] transition-colors">
                      <IconComponent className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Desktop Sidebar */}
  <Sidebar
    mobileMenuOpen={mobileMenuOpen}
    onToggleMobileMenu={toggleMobileMenu}
  />

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:ml-56">
            {/* Header - Native Mobile Style */}
            <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#222]">
              <div className="px-4 py-3">
                {/* Mobile Header */}
                <div className="lg:hidden flex flex-col gap-3">
                  {/* Top Row: Menu only (no logo) */}
                  <div className="flex items-center justify-between">
                    <button onClick={toggleMobileMenu} className="p-2 -ml-2">
                      <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1.5 rounded-md bg-white text-black hover:bg-gray-100 text-sm whitespace-nowrap">
                        Start Selling
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setCartModalOpen(true)}
                          className="relative"
                        >
                          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#1ed760]" />
                          {cartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#1ed760] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {cartItems}
                            </span>
                          )}
                        </button>
                      </div>
                      <button 
                        onClick={() => openAuthModal('signin')}
                        className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500"
                      >
                        <User className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Search beats, producers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1a1a1a] text-sm text-[#e6e6e6] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex-1 mx-6 max-w-xl relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Search beats, producers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-sm bg-[#1a1a1a] text-sm text-[#e6e6e6] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                      <select className="bg-transparent text-sm border-none outline-none appearance-none text-[#e6e6e6]">
                        <option>Tracks</option>
                        <option>Collections</option>
                        <option>Sound Kits</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="px-3 py-1 rounded-lg bg-white text-black hover:bg-gray-100 text-sm whitespace-nowrap">
                      Start Selling
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setCartModalOpen(true)}
                        className="relative"
                      >
                        <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#1ed760]" />
                        {cartItems > 0 && (
                          <span className="absolute -top-2 -right-2 bg-[#1ed760] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems}
                          </span>
                        )}
                      </button>
                    </div>
                    <button 
                      onClick={() => openAuthModal('signin')}
                      className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500"
                    >
                      <User className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 mb-40">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar - Trending + Featured Creators */}
                <aside className="w-full lg:w-80 lg:order-2 space-y-6 hidden lg:flex flex-col">
                  {/* Trending Searches */}
                  <div className="bg-[#1C1C1C] border border-[#1C1C1C] rounded-sm p-4">
                    <h3 className="font-bold text-xl mb-4">Trending searches</h3>
                    <div className="space-y-3">
                      {trendingSearches.map((search, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[#e6e6e6]">{search.name}</p>
                            {search.sponsored && <p className="text-xs text-gray-500">Sponsored</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Creators */}
                  <div className="bg-[#1C1C1C] border border-[#1C1C1C] rounded-sm p-4">
                    <h3 className="font-bold text-xl mb-4">Featured Creators</h3>
                    <div className="space-y-4">
                      {featuredCreators.map((creator, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-black">{creator.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-[#e6e6e6]">{creator.name}</span>
                                {creator.verified && (
                                  <svg className="w-4 h-4 text-[#1ed760]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                                {index < 2 && <span className="text-xs bg-gray-500 px-1 py-0.5 rounded">AD</span>}
                              </div>
                              <span className="text-xs text-gray-400">{creator.followers} followers</span>
                            </div>
                          </div>
                          <button className="bg-[#1ed760] hover:bg-[#53c268] w-8 h-8 rounded-full flex items-center justify-center">
                            <span className="text-black text-lg">+</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* Main Feed */}
                <div className="flex-1 lg:order-1">
                  <h2 className="text-2xl font-bold mb-4 text-[#e6e6e6]">Your Feed</h2>
                  
                  {/* Promoted Campaign - Beautified with left-aligned button */}
                  <div className="bg-gradient-to-r from-[#2e2d2d] to-[#212121] rounded-sm p-4 mb-6 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#1ed760] to-[#53c268] rounded-full flex items-center justify-center flex-shrink-0">
                          <Rocket className="w-5 h-5 text-black" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-[#e6e6e6] text-lg">Boost Your Reach</h3>
                          <p className="text-sm text-gray-300">Promote your beats to thousands of active fans</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-1 bg-[#e6e6e6]/20 text-[#fff] text-xs rounded-full">
                              <span className="w-1.5 h-1.5 bg-[#fff] rounded-lg mr-1"></span>
                              Limited Time Offer
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-[#e6e6e6] hover:bg-gray-100 px-4 py-2 rounded-sm font-bold text-black text-sm whitespace-nowrap transition-all transform hover:scale-105 self-start sm:self-auto">
                        Launch Campaign
                      </button>
                    </div>
                  </div>

                  {/* Beat Posts with Shimmer Loading */}
                  {isLoading ? (
                    <>
                      <ShimmerCard />
                      <ShimmerCard />
                      <ShimmerCard />
                    </>
                  ) : (
                    beats.map((beat) => (
                      <div key={beat.id} className="bg-[#0a0a0a] border border-[#0a0a0a] rounded-sm p-5 mb-5 hover:border-[#222] transition cursor-pointer">
                        <div className="flex gap-4" onClick={(e) => { e.stopPropagation(); openLicenseModal(beat); }} >
                          {/* Cover Image */}
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <img src={beat.cover} alt={beat.title} className="w-32 h-32 object-cover rounded-sm" />
                            <button
                              onClick={(e) => { e.stopPropagation(); togglePlay(beat.id); }}
                              className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-sm opacity-0 hover:opacity-100 transition-opacity"
                            >
                              {currentTrack === beat.id && isPlaying ? <Pause className="w-8 h-8 text-[#1ed760]" /> : <Play className="w-8 h-8 text-[#1ed760] ml-1" />}
                            </button>
                            <button 
                                className="bg-white hover:bg-gray-200 px-2 w-32 py-2 rounded-none font-bold text-black flex items-center gap-2" 
                                onClick={(e) => { e.stopPropagation(); openLicenseModal(beat); }} 
                              > 
                                <BsBagPlus className="w-5 h-5" />
                                <span>${beat.price}.00</span>
                              </button>
                          </div>

                          {/* Beat Info */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg text-[#e6e6e6]">{beat.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">by {beat.producer}</p>
                                <p className="text-xs text-gray-500 mt-1">Released on {beat.time}</p>
                                <p className="text-xs text-gray-400 mt-1">{beat.bpm} BPM</p>
                              </div>
                              {beat.id === 1 && <span className="text-xs bg-gray-600 px-2 py-1 rounded">AD</span>}
                            </div>
                            {/* Beat Description */}
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                              {beat.description}
                            </p>
                            {/* Price and Actions */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
                                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                  <Heart className="w-5 h-5" /><span>{beat.likes}</span>
                                </button>
                                <button className="flex items-center gap-1 hover:text-[#1ed760] transition-colors">
                                  <MessageCircle className="w-5 h-5" /><span>{beat.comments}</span>
                                </button>
                                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                  <Share2 className="w-5 h-5" /><span>{beat.shares}</span>
                                </button>
                                {/* Removed cart icon from beat cards */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </main>

            {/* Condensed Player Bar (Shown when player is hidden) - Web/Desktop Only */}
            {playerHidden && currentTrack !== null && (
              <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-2 flex items-center justify-between z-50 hidden lg:flex">
                <div className="flex items-center space-x-3">
                  {/* Smaller cover or placeholder */}
                  <img
                    src={beats.find(b => b.id === currentTrack)?.cover || "https://placehold.co/40x40/1a1a1a/white?text=BEAT"}
                    alt="Current track"
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate text-white">
                      {beats.find(b => b.id === currentTrack)?.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {beats.find(b => b.id === currentTrack)?.producer}
                    </p>
                  </div>
                  <button
                    onClick={() => setPlayerHidden(false)} // Show full player
                    className="text-gray-400 hover:text-white ml-2"
                    aria-label="Show player"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                   {/* Buy Button in condensed bar */}
                   <button
                     className="bg-[#1ed760] hover:bg-[#1fdf64] w-8 h-8 rounded-full flex items-center justify-center"
                     onClick={() => {
                       const beat = beats.find(b => b.id === currentTrack);
                       if (beat) openLicenseModal(beat);
                     }}
                     aria-label="Buy track"
                   >
                     <ShoppingCart className="w-4 h-4 text-black" />
                   </button>
                   <button
                     onClick={() => setPlayerHidden(false)} // Show full player
                     className="text-gray-400 hover:text-white"
                     aria-label="Show player"
                   >
                     <ArrowUpNarrowWide className="w-5 h-5" />
                   </button>
                </div>
              </div>
            )}

            {/* Main Player - Web/Desktop (Only shown when NOT hidden) */}
            {currentTrack !== null && !playerHidden && (
              <footer className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 flex items-center justify-between z-50 hidden lg:flex">
                {/* Left Side - Track Info */}
                <div className="flex items-center space-x-3 w-full md:w-1/4">
                  <img
                    src={beats.find(b => b.id === currentTrack)?.cover || "https://placehold.co/60x60/1a1a1a/white?text=BEAT"}
                    alt="Current track cover"
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div className="truncate">
                    <p className="text-sm font-semibold truncate text-white">
                      {beats.find(b => b.id === currentTrack)?.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {beats.find(b => b.id === currentTrack)?.producer}
                    </p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-[#1ed760] ml-4"
                    onClick={() => {
                       const beat = beats.find(b => b.id === currentTrack);
                       if (beat) openLicenseModal(beat);
                     }}
                     aria-label="Favorite track"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Center - Playback Controls */}
                <div className="flex flex-col items-center w-full md:w-2/4">
                  {/* Control Buttons */}
                  <div className="flex items-center space-x-6 mb-2">
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        // Logic for previous track
                        const currentIndex = beats.findIndex(b => b.id === currentTrack);
                        if (currentIndex > 0) {
                           setCurrentTrack(beats[currentIndex - 1].id);
                           setIsPlaying(true); // Auto-play previous
                           setAudioProgress(0);
                        }
                      }}
                      aria-label="Previous track"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                      onClick={() => setIsPlaying(!isPlaying)}
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black ml-0.5" />}
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                         // Logic for next track
                         const currentIndex = beats.findIndex(b => b.id === currentTrack);
                         if (currentIndex < beats.length - 1) {
                            setCurrentTrack(beats[currentIndex + 1].id);
                            setIsPlaying(true); // Auto-play next
                            setAudioProgress(0);
                         }
                      }}
                      aria-label="Next track"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                    <RotateCcw className="cursor-pointer hover:text-[#1ed760] w-5 h-5" />
                  </div>

                  {/* Simplified Progress Bar */}
                  <div className="w-full max-w-lg flex items-center space-x-2">
                    {/* Current Time (dummy) */}
                    <span className="text-xs text-gray-400 w-10">
                      {Math.floor((audioProgress / 100) * 180 / 60)}:{String(Math.floor((audioProgress / 100) * 180 % 60)).padStart(2, '0')}
                    </span>
                    {/* Progress Track */}
                    <div
                      className="flex-1 h-1 bg-[#535353] rounded-full cursor-pointer"
                      onClick={(e) => {
                        // Optional: Allow seeking by clicking progress bar
                        // const rect = e.currentTarget.getBoundingClientRect();
                        // const pos = (e.clientX - rect.left) / rect.width;
                        // setAudioProgress(pos * 100);
                      }}
                    >
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${audioProgress}%` }}
                      ></div>
                    </div>
                    {/* Total Time (dummy) */}
                    <span className="text-xs text-gray-400 w-10">3:00</span>
                  </div>
                </div>

                {/* Right Side - Volume, Extra Actions, Buy, Hide */}
                <div className="flex items-center justify-end space-x-4 w-full md:w-1/4">
                  {/* Volume Control */}
                  <Volume2 className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  <div className="w-20 h-1 bg-[#535353] rounded-full">
                    <div className="h-full bg-white rounded-full w-3/4"></div> {/* Dummy volume level */}
                  </div>

                  {/* Spacer/Divider */}
                  <div className="w-px h-6 bg-[#282828] mx-2"></div>

                  {/* Buy Now Button */}
                  <button
                    className="bg-[#1ed760] hover:bg-[#1fdf64] w-8 h-8 rounded-full flex items-center justify-center"
                    onClick={() => {
                      const beat = beats.find(b => b.id === currentTrack);
                      if (beat) openLicenseModal(beat);
                    }}
                    aria-label="Buy track"
                  >
                    <ShoppingCart className="w-4 h-4 text-black" />
                  </button>

                  {/* Hide Player Button */}
                  <button
                    onClick={() => setPlayerHidden(true)}
                    className="text-gray-400 hover:text-white"
                    aria-label="Hide player"
                  >
                    <Minus className="w-5 h-5" /> {/* Minus icon for hiding */}
                  </button>

                  {/* More Options (if needed) */}
                  {/* <EllipsisVertical className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" /> */}
                </div>
              </footer>
            )}

            {/* MOBILE PLAYER - Keep your existing mobile player logic */}
            {/* Assuming it's correctly implemented in your attached code and hidden on desktop */}
            {currentTrack !== null && (
              <footer className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-2 flex items-center justify-between z-50 lg:hidden">
                {/* Track Info */}
                <div className="flex items-center space-x-3 w-1/3 min-w-0">
                  <img 
                    src={beats.find(b => b.id === currentTrack)?.cover || "https://placehold.co/60x60/1a1a1a/white?text=BEAT"} 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate text-white">
                      {beats.find(b => b.id === currentTrack)?.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {beats.find(b => b.id === currentTrack)?.producer}
                    </p>
                  </div>
                </div>

                {/* Center Controls */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="flex items-center space-x-4 mb-1">
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        const currentIndex = beats.findIndex(b => b.id === currentTrack);
                        if (currentIndex > 0) {
                          setCurrentTrack(beats[currentIndex - 1].id);
                          setIsPlaying(true);
                          setAudioProgress(0);
                        }
                      }}
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    <button 
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-3 h-3 text-black" /> : <Play className="w-3 h-3 text-black ml-0.5" />}
                    </button>
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        const currentIndex = beats.findIndex(b => b.id === currentTrack);
                        if (currentIndex < beats.length - 1) {
                          setCurrentTrack(beats[currentIndex + 1].id);
                          setIsPlaying(true);
                          setAudioProgress(0);
                        }
                      }}
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Side - Buy Button */}
                <div className="flex items-center justify-end space-x-2 w-1/3">
                  <button 
                    className="bg-[#1ed760] hover:bg-[#53c268] w-7 h-7 rounded-full flex items-center justify-center px-2 py-2 "
                    onClick={() => {
                      const beat = beats.find(b => b.id === currentTrack);
                      if (beat) openLicenseModal(beat);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 text-black" />
                  </button>
                  
                </div>
              </footer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}