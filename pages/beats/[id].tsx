import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { Play, Pause, Heart, Share2, Download, MessageSquare, ChevronLeft, ChevronRight, Home, Star } from "lucide-react";
import PlayerBar from "../../components/PlayerBar";
import BeatModal from "../../components/BeatModal";
import CartModal from "../../components/CartModal";


// NOTE: This is a temporary data structure.
const sampleBeat = {
  id: 1,
  title: "Renfe",
  producer: "Al Safir Type Beat",
  price: 9.99,
  bpm: 102,
  key: "F min",
  tags: ["#afro", "#chill"],
  published: "Aug 12, 2025",
  cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
  likes: 12,
  comments: 1,
  shares: 8,
  licenses: [
    { name: "Basic", price: 9.99, description: "MP3" },
    { name: "Premium", price: 29.99, description: "MP3, WAV" },
    { name: "Exclusive", price: 0, description: "Negotiate price" },
  ],
  usageTerms: [
    "USE FOR MUSIC RECORDING",
    "DISTRIBUTE UP TO 2,000 COPIES",
    "100,000 ONLINE AUDIO STREAMS",
    "1 MUSIC VIDEO",
    "FOR PROFIT LIVE PERFORMANCES",
    "RADIO BROADCASTING RIGHTS (2 STATIONS)",
  ],
};

const relatedTracks = [
    { id: 7, title: "Negroni", producer: "Afrobeat x Jorja Smith", price: 24.95, cover: "https://images.unsplash.com/photo-1458560871784-56d23406c791?w=400&q=80" },
    { id: 8, title: "i-guide", producer: "Al Safir Type Beat - Ori...", price: 20.00, cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&q=80" },
    { id: 9, title: "Rolly", producer: "Al Safir Type Beat", price: 9.99, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
    { id: 10, title: "Free", producer: "d r i l l p a c k", price: 0, cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80" },
    { id: 11, title: "Narcos", producer: "Narcos Type Beat", price: 15.50, cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
];

export default function BeatDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const beat = sampleBeat;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBeatModalOpen, setBeatModalOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(0);
  const [cartContents, setCartContents] = useState([]);

  const closeBeatModal = () => {
      setBeatModalOpen(false);
      setSelectedLicense(0);
  }

  const addToCart = () => {
    const item = { beat, licenseIndex: selectedLicense, quantity: 1 };
    setCartContents(prev => [...prev, item]);
    closeBeatModal();
    setCartModalOpen(true);
  };

  const handleBuyNow = () => {
      addToCart();
      router.push("/checkout");
  }
  
    const handleRemoveItem = (beatId) => {
      setCartContents(prev => prev.filter(item => item.beat.id !== beatId));
  }

  const handleUpdateQuantity = (beatId, quantity) => {
      setCartContents(prev => prev.map(item => item.beat.id === beatId ? { ...item, quantity } : item));
  }


  return (
    <>
      <Head>
        <title>{beat.title} - {beat.producer} | ONDBeat</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto pb-24"> {/* Padding bottom for player */}
             <div className="flex items-center gap-4 text-neutral-300 mb-8">
                <Link href="/" legacyBehavior>
                    <a className="flex items-center gap-2 hover:text-white">
                        <Home size={20} />
                    </a>
                </Link>
                /
                <button onClick={() => router.back()} className="flex items-center gap-2 hover:text-white">
                    <ChevronLeft size={20} />
                    Back
                </button>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6 lg:sticky top-8 self-start">
              <div className="relative">
                <img src={beat.cover} alt="Beat cover" className="w-full rounded-xl shadow-lg" />
                <button onClick={() => setIsPlaying(!isPlaying)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    {isPlaying ? <Pause size={40}/> : <Play size={40} className="ml-2"/>}
                </button>
              </div>
              <div className="flex justify-around bg-[#2a2a2a] p-3 rounded-lg">
                  <div className="text-center cursor-pointer"><Heart className="mx-auto"/> <span className="text-xs">{beat.likes}</span></div>
                  <div className="text-center cursor-pointer"><MessageSquare className="mx-auto"/> <span className="text-xs">{beat.comments}</span></div>
                  <div className="text-center cursor-pointer"><Share2 className="mx-auto"/> <span className="text-xs">{beat.shares}</span></div>
                  <div className="text-center cursor-pointer"><Download className="mx-auto"/> <span className="text-xs">Free</span></div>
              </div>
              <div>
                  <h1 className="text-3xl font-bold">{beat.title}</h1>
                  <p className="text-lg text-neutral-400">{beat.producer}</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-neutral-800">
                  <h3 className="font-semibold mb-2">INFORMATION</h3>
                  <div className="text-sm text-neutral-300 space-y-1">
                      <p>Published: {beat.published}</p>
                      <p>BPM: {beat.bpm}</p>
                      <p>Key: {beat.key}</p>
                  </div>
              </div>
               <div className="bg-[#1a1a1a] p-4 rounded-xl border border-neutral-800">
                    <h3 className="font-semibold mb-3">TAGS</h3>
                    <div className="flex flex-wrap gap-2">
                        {beat.tags.map(tag => <span key={tag} className="px-3 py-1 bg-neutral-700 text-sm rounded-full cursor-pointer hover:bg-neutral-600">{tag}</span>)}
                    </div>
                </div>
                 <button className="w-full text-left p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-400">Report Track</button>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Licensing */}
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <h2 className="text-2xl font-bold">Licensing</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-bold">${beat.price}</p>
                        <button onClick={addToCart} className="bg-neutral-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-neutral-600">Add to Cart</button>
                        <button onClick={handleBuyNow} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">Buy now</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {beat.licenses.map((license, index) => (
                          <div key={license.name} onClick={() => setSelectedLicense(index)} className={`p-4 rounded-lg border-2 cursor-pointer ${selectedLicense === index ? 'border-blue-500 bg-neutral-800' : 'border-transparent bg-neutral-700/50 hover:bg-neutral-700'}`}>
                              <h3 className="font-bold text-lg">{license.name}</h3>
                              <p className="text-neutral-400 text-sm">{license.price > 0 ? `$${license.price}`: "Negotiate"}</p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Usage Terms */}
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                <h2 className="text-2xl font-bold mb-4">Usage Terms</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-300">
                    {beat.usageTerms.map(term => (
                        <div key={term} className="flex items-center gap-2">
                            <Star size={16} className="text-blue-400"/>
                            <span>{term}</span>
                        </div>
                    ))}
                </div>
              </div>

              {/* More from Producer */}
              <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">More from {beat.producer}</h2>
                    <a href="#" className="text-sm font-bold text-neutral-400 hover:underline">See all</a>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedTracks.slice(0, 4).map(track => (
                         <Link href={`/beats/${track.id}`} key={track.id} legacyBehavior>
                            <a className="bg-[#2a2a2a] p-3 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                                <img src={track.cover} alt={track.title} className="w-full rounded-md mb-2"/>
                                <p className="font-bold text-sm truncate">{track.title}</p>
                                <p className="text-xs text-neutral-400">${track.price}</p>
                            </a>
                        </Link>
                    ))}
                 </div>
              </div>
              
              {/* Comments */}
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                <div className="flex gap-4">
                    <img src="/path-to-user-avatar.png" alt="Your avatar" className="w-10 h-10 rounded-full bg-neutral-700"/>
                    <input type="text" placeholder="Share your thoughts..." className="w-full bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <div className="mt-6 text-center text-neutral-500">
                    <p>No comments yet.</p>
                    <p className="text-sm">Be the first to share some love!</p>
                </div>
              </div>

              {/* Related Tracks */}
               <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Related Tracks</h2>
                     <div className="flex items-center gap-2">
                        <button className="bg-black/50 rounded-full p-1 hover:bg-white/20"><ChevronLeft size={20} /></button>
                        <button className="bg-black/50 rounded-full p-1 hover:bg-white/20"><ChevronRight size={20} /></button>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {relatedTracks.map(track => (
                        <Link href={`/beats/${track.id}`} key={track.id} legacyBehavior>
                            <a className="bg-[#2a2a2a] p-3 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                                <img src={track.cover} alt={track.title} className="w-full rounded-md mb-2"/>
                                <p className="font-bold text-sm truncate">{track.title}</p>
                                <p className="text-xs text-neutral-400">${track.price > 0 ? track.price : "Free"}</p>
                            </a>
                        </Link>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <PlayerBar isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} currentTrack={beat} progress={30} />
    <BeatModal isOpen={isBeatModalOpen} onClose={closeBeatModal} beat={beat} selectedLicense={selectedLicense} onLicenseSelect={setSelectedLicense} onAddToCart={addToCart} onBuyNow={handleBuyNow} />
    <CartModal isOpen={isCartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} onCheckout={() => router.push("/checkout")} />
    </>
  );
}
